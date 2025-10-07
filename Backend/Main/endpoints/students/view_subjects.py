from .. import *
from Main.database_setup.queries import subject_queries
from Main.utils import format_datetime


class ViewAllSubjects(HTTPEndpoint):
    
    @session_injection
    async def get(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="this endpoint can only be accessed by HTTP url",
                status_code=403
            )
        session = request.state.session
        query_response = await subject_queries.request_all_subjects(session)
        formated_data = [
            {
                "subject":item.name,
                "tutor": item.tutor,
                "id": item.id,
                "added_at": format_datetime(item.time_added)
            } for item in query_response
        ]
        return JSONResponse(
            content= formated_data,
            status_code=200
        )
        