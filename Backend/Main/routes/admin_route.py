from . import *
from ..endpoints.admin import setup_questions, register_subject, set_up_timer, filter_exam_question

all_admin_endpoint = [
    Route(path="/upload_question",endpoint=setup_questions.UploadExamQuestion, name="upload"),
    Route(path="/add_subject", endpoint=register_subject.AddNewSubject, name="add"),
    Route(path="/set_timer", endpoint= set_up_timer.SetExamTimer, name="set_timer"),
    Route(path="/filter_questions", endpoint=filter_exam_question.SetExamFilter, name="filter_question")
] 