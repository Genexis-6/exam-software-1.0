from starlette.applications import Starlette
from starlette.middleware import cors
import contextlib
from .database_setup import session_manager
from .config import settings
from .routes import all_routes

@contextlib.asynccontextmanager
async def lifespan(app):
    print("app started")
    await session_manager.start()
    yield
    print("app ended")
    await session_manager.close()
    
    

app = Starlette(
    debug=settings.DEBUG,
    lifespan=lifespan,
    routes=all_routes
    
)

app = cors.CORSMiddleware(
    app=app,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    allow_origins=["http://localhost:5173"]
)