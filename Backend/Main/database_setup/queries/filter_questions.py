from ..models.question_restriction import FilterQuestions
from sqlalchemy import select
import uuid


async def filter_exam_questions(session, filter_):
    check_filter_exist = await session.execute(select(FilterQuestions).where(FilterQuestions.subject_id == filter_.get("subject_id")))
    result = check_filter_exist.scalar_one_or_none()
    if result:
        result.score_per_qa = filter_.get("score_per_qa")
        result.set_question_ans = filter_.get("set_question_ans")
        await session.commit()
        await session.flush()
        return "updated_filter"
    session.add(
        FilterQuestions(
            id =str(uuid.uuid4()),
            score_per_qa = filter_.get("score_per_qa"),
            set_question_ans = filter_.get("set_question_ans"),
            subject_id = filter_.get("subject_id")
        )
    )
    await session.commit()
    await session.flush()
    return "created_filter"