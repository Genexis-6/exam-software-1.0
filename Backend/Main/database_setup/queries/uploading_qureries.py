from .. import *
import uuid
from sqlalchemy import select
from ..models import question_model, subject_model

async def upload_exam_questions(session, questions):
    for q in questions.get("questions"):
        qa_db = await session.execute(select(question_model.Questions).where(question_model.Questions.quest == q.get("quest")))
        result = qa_db.scalar_one_or_none()
        if not result:
            new_qestion = question_model.Questions(
                    id=str(uuid.uuid4()),
                    title= questions.get("title")[0],
                    author = questions.get("author")[0],
                    subject_id = questions.get("subject_id"),
                    quest= q.get("quest"),
                    a_= q.get("a_"),
                    b_= q.get("b_"),
                    c_= q.get("c_"),
                    d_= q.get("d_"),
                    ans_ =q.get("ans"), 
                    quest_id = q.get("quest_id"),
                )
            session.add(new_qestion)
       
    await session.commit()
    await session.flush()
    return "question_add"
    

