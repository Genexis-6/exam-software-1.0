from ..dependencies import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, DateTime, ForeignKey
from datetime import datetime
import uuid
from . import students_model

class StudentStarts(Base):
    __tablename__ = "studentstarts"
    id:Mapped[str] = mapped_column(String(200), primary_key=True, index=True, default=str(uuid.uuid4()))
    subject_name:Mapped[str] = mapped_column(String(200), index=True)
    exam_title:Mapped[str] = mapped_column(String(200), index=True, unique=True)
    time_left:Mapped[int] = mapped_column(Integer, index=True)
    score:Mapped[int] = mapped_column(Integer, index=True)
    exam_status:Mapped[str] = mapped_column(String(100), index=True)
    qa_ans_length:Mapped[int] = mapped_column(Integer, index=True)
    qa_to_ans_length:Mapped[int] = mapped_column(Integer, index=True)
    date_added:Mapped[datetime] = mapped_column(DateTime, default=datetime.now())
    student_id:Mapped[str] = mapped_column(String(200), ForeignKey("students.id"))
    students:Mapped["students_model.Students"] = relationship("students_model.Students", back_populates="studentstarts")
    
    