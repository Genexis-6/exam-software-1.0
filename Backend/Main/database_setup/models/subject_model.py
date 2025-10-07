from ..dependencies import Base
from . import question_model
from sqlalchemy import String, DateTime
import uuid
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from . import time_setup_model
from . import question_restriction


class Subjects(Base):
    __tablename__ ="subjects"
    id:Mapped[str] = mapped_column(String(200), primary_key=True, index=True, default=str(uuid.uuid4()))
    name:Mapped[str] = mapped_column(String(255), nullable=False, index=True, unique=True)
    description:Mapped[str] = mapped_column(String(700), nullable=True, index=True)
    tutor:Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    questions:Mapped[List["question_model.Questions"]] = relationship("question_model.Questions", back_populates="subjects")
    timesetup:Mapped["time_setup_model.TimeSetup"] = relationship("time_setup_model.TimeSetup", back_populates="subjects")
    filterquestions:Mapped["question_restriction.FilterQuestions"] = relationship("question_restriction.FilterQuestions", back_populates="subjects")
    time_added:Mapped[datetime] = mapped_column(DateTime, default=datetime.now())