from . import *
from Main.endpoints.students import view_subjects, check_subject_exist, get_subject_details, handle_exam_submittion, view_particular_starts
from Main.middlewares import AccessTokenMiddelware
from starlette.middleware import Middleware


all_student_routes = [
    Route(path="/all_subjects", endpoint=view_subjects.ViewAllSubjects, name="all_subject", middleware=[Middleware(AccessTokenMiddelware.AccessTokenMiddleware)]),
    Route(path="/check_id", endpoint=check_subject_exist.CheckSubjectExist, name="check_id", middleware=[Middleware(AccessTokenMiddelware.AccessTokenMiddleware)]),
    Route(path="/subject_questions", endpoint=get_subject_details.GetSubjetDetails, name="subject_info", middleware=[Middleware(AccessTokenMiddelware.AccessTokenMiddleware)]),
    Route(path="/handle_exam_submittion", endpoint=handle_exam_submittion.HandleExamSubmittion, name="submit_exam", middleware=[Middleware(AccessTokenMiddelware.AccessTokenMiddleware)]),
    Route(path="/view_result", endpoint= view_particular_starts.ViewStudentParticularStarts, name="result", middleware=[Middleware(AccessTokenMiddelware.AccessTokenMiddleware)])
]