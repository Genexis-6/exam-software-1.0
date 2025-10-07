from .. import *
from Main.database_setup.queries import filter_questions

class SetExamFilter(HTTPEndpoint):
    
    @session_injection
    async def post(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="this endpoint can only be accessed by HTTP url",
                status_code=403
            )
        session = request.state.session
        try:
            filter_ = await request.json()
            score_per_qa = filter_.get("score_per_qa")
            set_question_ans = filter_.get("set_question_ans")
            subject_id = filter_.get("subject_id")

            if not filter_ or not score_per_qa or not set_question_ans or not subject_id:
                raise HTTPException(
                    detail="request body is empty",
                    status_code=400
                )

            query_response = await filter_questions.filter_exam_questions(session, filter_)
            if query_response == "created_filter":
                return JSONResponse(
                        content="new filter has been set",
                        status_code=201
                    )
            return JSONResponse(
                    content="filter has been updated",
                    status_code=200
                )
        except BaseException as e:
            raise HTTPException(
                detail=f"error decoding json due to {e}",
                status_code=500
            )