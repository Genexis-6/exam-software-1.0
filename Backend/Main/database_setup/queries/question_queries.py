from ..models.question_model import Questions
from sqlalchemy import select


async def get_questions_by_title(session, title):
    check = await session.execute(select(Questions).where(Questions.title == title))
    result = check.scalars().all()
    if result:
        return {questions.quest_id : questions.ans_ for  questions in result} 
        
    return "non_found"