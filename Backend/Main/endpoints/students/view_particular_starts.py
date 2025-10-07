from .. import *
from Main.database_setup.queries import student_starts_queries


class ViewStudentParticularStarts(HTTPEndpoint):
    @session_injection
    async def post(self, request:Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="this endpoint can only be accessed by HTTP url",
                status_code=403
            )
            
        session = request.state.session
        try:
            student = await request.json()
            student_id = student.get("student_id")
            exam_title = student.get("exam_title")
            
            if not student or not student_id or not exam_title:
                raise HTTPException(
                    detail="invalid request body",
                    status_code=400
                )
            
            query_response = await student_starts_queries.get_student_particular_start(session, student)
            
            if query_response == "none":
                raise HTTPException(
                    detail="no record found",
                    status_code= 404
                )
            return JSONResponse(
                content=query_response,
                status_code=200
            )
        
        except BaseException as e:
            raise HTTPException(
                detail=f"error decoding token due to: {e}",
                status_code=500
            )