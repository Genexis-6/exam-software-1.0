from sqlalchemy import select
from sqlalchemy.orm import selectinload
from ..models import student_starts_model
import uuid
from Main.utils import convert_timer

async def set_new_student_start(session, submitted, qa_len, score, time_, qa_to_ans_length):
    check = await session.execute(select(student_starts_model.StudentStarts).where(submitted.get("exam_title") == student_starts_model.StudentStarts.exam_title))
    result = check.scalar_one_or_none()
    if result:
        result.score = score
        result.subject_name = submitted.get("subject_name")
        result.exam_status = submitted.get("exam_status")
        result.qa_ans_length = qa_len
        result.time_left = time_
        result.qa_to_ans_length = qa_to_ans_length
        await session.commit()
        await session.flush()
        return "updated"
    session.add(
        student_starts_model.StudentStarts(
            id = str(uuid.uuid4()),
            subject_name = submitted.get("subject_name"),
            exam_title = submitted.get("exam_title"),
            score = score,
            exam_status = submitted.get("exam_status"),
            qa_ans_length = qa_len,
            time_left = time_,
            qa_to_ans_length = qa_to_ans_length,
            student_id = submitted.get("student_id")
        ) 
    )
    await session.commit()
    await session.flush()
    return "recorded"
        
        


async def get_student_particular_start(session, student):
    check = await session.execute(select(student_starts_model.StudentStarts).where(student_starts_model.StudentStarts.student_id == student.get("student_id"), student_starts_model.StudentStarts.exam_title == student.get("exam_title")))
    result = check.scalar_one_or_none()
    if check:
        return {
            "exam_title":  result.exam_title,
            "time_left": await convert_timer(result.time_left),
            "score": result.score,
            "exam_status":result.exam_status,
            "qa_length_ans": result.qa_ans_length,
            "qa_to_ans_length":result.qa_to_ans_length
        }
    return "none"
