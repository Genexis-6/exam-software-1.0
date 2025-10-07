from . import *
import uuid
from sqlalchemy import select
from Main.database_setup.models import time_setup_model

async def set_exam_timer(session, timer):
    check_timer = await session.execute(select(time_setup_model.TimeSetup).where(time_setup_model.TimeSetup.subject_id == timer.get("subject_id")))
    result = check_timer.scalar_one_or_none()
    if result:
        result.hr_ = timer.get("hr")
        result.min_ = timer.get("min")
        result.sec_ = timer.get("sec")
        await session.commit()
        await session.flush()
        return "timer_updated"
    session.add(
        time_setup_model.TimeSetup(
            id = str(uuid.uuid4()),
            hr_ = timer.get("hr"),
            min_ = timer.get("min"),
            sec_ = timer.get("sec"),
            subject_id = timer.get("subject_id")
        )
    )
    await session.commit()
    await session.flush()
    return "new_timer_set"
    