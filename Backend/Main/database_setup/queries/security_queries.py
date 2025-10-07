from ..models.students_model import Students
from sqlalchemy import select
import uuid
from Main.utils import verify_hash_password, generate_hash_password
import json



async def register_student(session, student):
    check_student_exist = await session.execute(select(Students).where(Students.email == student.get("email")))
    result = check_student_exist.scalar_one_or_none()
    if not result:
        session.add(
            Students(
                id = str(uuid.uuid4()),
                firstname = student.get("firstname"),
                lastname = student.get("lastname"),
                email = student.get("email"),
                picture = student.get("picture"),
                role = student.get("role"),
                password = generate_hash_password(student.get("password"))
            )
        )        
        await session.commit()
        await session.flush()
        return True
    return False


async def login_user_query(session, user):
    check_student_exist = await session.execute(select(Students).where(Students.email == user.get("email")))
    result = check_student_exist.scalar_one_or_none()
    if result:
        if verify_hash_password(user.get("password"), hash_pass=result.password):
            return result
        return "invalid_password"
    return "not_found"


async def get_user_info(session, user):
    check_student_exist = await session.execute(select(Students).where(Students.email == user.get("user_email")))
    result = check_student_exist.scalar_one_or_none()
    if result:
        return result
    return "none"