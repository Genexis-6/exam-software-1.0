from ..dependencies import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime, Integer, ForeignKey
from datetime import datetime
import uuid 
from . import subject_model


class Questions(Base):
    __tablename__ ="questions"
    id:Mapped[str] = mapped_column(String(200), primary_key=True, index=True, default=str(uuid.uuid4()))
    title:Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    author:Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    quest:Mapped[str] = mapped_column(String(500), index=True)
    a_:Mapped[str] = mapped_column(String(100), index=True)
    b_:Mapped[str] = mapped_column(String(100), index=True)
    c_:Mapped[str] = mapped_column(String(100), index=True)
    d_:Mapped[str] = mapped_column(String(100), index=True)
    ans_:Mapped[str] = mapped_column(String(100), index=True)
    quest_id:Mapped[str] = mapped_column(String(100), index=True)
    subject_id:Mapped[str] = mapped_column(String(100), ForeignKey("subjects.id"))
    time_added:Mapped[datetime] = mapped_column(DateTime, default=datetime.now())
    subjects:Mapped["subject_model.Subjects"] = relationship("subject_model.Subjects", back_populates="questions")
    
    
    
    


    
    
    