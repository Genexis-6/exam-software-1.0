from Main.database_setup.dependencies import Base
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from . import student_starts_model
from typing import List


class Students(Base):
    __tablename__ = "students"
    id:Mapped[str] = mapped_column(String(200), primary_key=True, index=True, default=str(uuid.uuid4()))
    firstname:Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    lastname:Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    email:Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    picture:Mapped[str] = mapped_column(String(100), index=True, nullable=True)
    role:Mapped[str] = mapped_column(String(100), index=True, nullable=False, default="user")
    studentstarts:Mapped[List["student_starts_model.StudentStarts"]] = relationship("student_starts_model.StudentStarts", back_populates="students")
    password:Mapped[str] = mapped_column(String(255))
    
    
    
