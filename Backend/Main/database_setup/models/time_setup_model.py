from sqlalchemy import String, ForeignKey
from ..dependencies import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from . import subject_model

class TimeSetup(Base):
    __tablename__ ="timesetup"
    id:Mapped[str] = mapped_column(String(200), primary_key=True, index=True, default=str(uuid.uuid4()))
    hr_:Mapped[str] = mapped_column(String(100), index=True)
    min_:Mapped[str] = mapped_column(String(100), index=True)
    sec_:Mapped[str] = mapped_column(String(100), index=True)
    subject_id:Mapped[str] = mapped_column(String(100), ForeignKey("subjects.id"))
    subjects:Mapped["subject_model.Subjects"] = relationship("subject_model.Subjects",back_populates="timesetup")
    