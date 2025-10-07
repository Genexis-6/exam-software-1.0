from ..dependencies import *
from . import subject_model
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime, Integer, ForeignKey
import uuid
from datetime import datetime


class FilterQuestions(Base):
    __tablename__ = "filterquestions"
    id:Mapped[str] = mapped_column(String(200), primary_key=True, index=True, default=str(uuid.uuid4()))
    score_per_qa:Mapped[int] = mapped_column(Integer, index=True, default=1)
    set_question_ans:Mapped[int] = mapped_column(Integer, index=True, default=1)
    subject_id:Mapped[str] = mapped_column(String(100), ForeignKey("subjects.id"), index=True)
    subjects:Mapped["subject_model.Subjects"] = relationship("subject_model.Subjects", back_populates="filterquestions")
    time_added:Mapped[datetime] = mapped_column(DateTime, default=datetime.now())