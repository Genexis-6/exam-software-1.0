from .dependencies import session_manager
from functools import wraps
from typing import Callable
from starlette.requests import Request
from .models.students_model import Students
from .models.question_model import Questions
from .models.time_setup_model import TimeSetup
from .models.subject_model import Subjects
from .models.question_restriction import FilterQuestions



def session_injection(func: Callable):
    @wraps(func)
    async def warpper(self, request:Request, *args, **kwargs):
        async with session_manager.session() as session:
            request.state.session = session
            try:
                
                return await func(self, request, *args, **kwargs)
            finally:
                request.state.session = None
    
    return warpper

