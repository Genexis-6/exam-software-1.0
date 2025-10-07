from . import *
import uuid
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from ..models import subject_model, question_restriction
from Main.utils import shuffle_questions


async def register_new_subject(session, subject):
    check_subject_exist = await session.execute(select(subject_model.Subjects).where(subject_model.Subjects.name == subject.get("name")))
    result = check_subject_exist.scalar_one_or_none()
    if not result:
        session.add(
            subject_model.Subjects(
                id = str(uuid.uuid4()),
                name = subject.get("name"),
                tutor = subject.get("tutor"),
                description = subject.get("description") if subject.get("description") else "Good luck :))",
            )
            
        )
        await session.commit()
        await session.flush()
        return "new_subject_registered"
    return "already_exist"


async def check_subject_exist(session, name):
    check = await session.execute(select(subject_model.Subjects).where(subject_model.Subjects.name == name))
    result = check.scalar_one_or_none()
    if result:
        return str(result.id)
    return "non_found"


async def request_all_subjects(session):
    check = await session.execute(select(subject_model.Subjects))
    result = check.scalars().all()
    return result
    
    
async def check_subject_id(session, id):
    check = await session.execute(select(subject_model.Subjects).where(subject_model.Subjects.id == id))
    result = check.scalar_one_or_none()
    if result:
        return True
    return False



async def get_subject_questions_time(session, subject_):
    check_sub_exist  = await session.execute(select(subject_model.Subjects)
                                             .where(subject_model.Subjects.id == subject_.get("id"))
                                             .options(selectinload(subject_model.Subjects.questions), 
                                                selectinload(subject_model.Subjects.timesetup),
                                                selectinload(subject_model.Subjects.filterquestions)
                                                )) 
    
    result = check_sub_exist.scalars().first()
    if result:
        return {
            "subject_name": result.name,
            "description": result.description,
            "tutor":result.tutor,
            "exam_title": result.questions[0].title,
            "questions": shuffle_questions(
                [
                    {
                        "quest": q.quest,
                        "a": q.a_,
                        "b": q.b_,
                        "c": q.c_,
                        "d": q.d_,
                        "quest_id": q.quest_id,

                    } for q in result.questions
                    ], result.filterquestions.set_question_ans if result.filterquestions else None
                ),
            "hr":result.timesetup.hr_ if result.timesetup else None,
            "min":result.timesetup.min_ if result.timesetup else None,
            "sec":result.timesetup.sec_ if result.timesetup else None
        }
    return "not_working"
    



async def get_time_spent(session, time_, subject_name, score):
    check =await session.execute(select(subject_model.Subjects).where(subject_model.Subjects.name == subject_name).options( selectinload(subject_model.Subjects.timesetup), selectinload(subject_model.Subjects.filterquestions)))
    result = check.scalar_one_or_none()
    if not result:
        return "no_timer"
    hr = int(result.timesetup.hr_) if result.timesetup.hr_ else 0
    min = int(result.timesetup.min_) if result.timesetup.min_ else 0
    sec = int(result.timesetup.sec_) if result.timesetup.sec_ else 0
    remaining_time =( (hr * 3600 )+ (min * 60) + sec) - time_
    score = score * int(result.filterquestions.score_per_qa) if result.filterquestions else score * 1
    qa_to_ans_length = result.filterquestions.score_per_qa * result.filterquestions.set_question_ans if result.filterquestions else "all"
    return remaining_time, score, qa_to_ans_length
    
        
    