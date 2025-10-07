from sqlalchemy.ext.asyncio import (
    AsyncConnection, AsyncSession, create_async_engine, async_sessionmaker
)
from typing import AsyncIterable
from sqlalchemy.orm import declarative_base
from Main.config import settings
import contextlib

DATABASE_URL = settings.DATABASE_URL
Base = declarative_base()


class DataBaseSessionManager:
    def __init__(self, host):
        self._engine = create_async_engine(url=host)
        self._sessionmaker = async_sessionmaker(
            bind= self._engine, 
            autoflush=True,
            autocommit=False
        )
    async def start(self):
        if not self._engine:
            raise BaseException("error initializing database session manager due to no engine found")
        
        async with self._engine.begin() as connection:
            await connection.run_sync(Base.metadata.create_all)
            
    async def close(self):
        if not self._engine:
            raise BaseException("error closing database session manager due to no engine found")
        await self._engine.dispose()
        self._engine = None 
        self._sessionmaker = None
        
    @contextlib.asynccontextmanager
    async def session(self) ->AsyncIterable[AsyncSession]:
        if not self._sessionmaker:
            raise BaseException("error performing queries due to no session_maker found")
        
        session = self._sessionmaker()
        async with session as db:
            try:
                yield db
            except Exception as e:
                print(f"error in session due to {e}")
                await db.rollback()
                raise


    @contextlib.asynccontextmanager            
    async def engine(self) -> AsyncIterable[AsyncConnection]:
        if not self._engine:
            raise BaseException("error performing queries due to no engine found")
        
        async with self._engine.begin() as connection:
            try:
                yield connection
            except Exception as e:
                print(f"error in engine due to {e}")
                raise

                
                

session_manager = DataBaseSessionManager(host=DATABASE_URL)