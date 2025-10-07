from .. import *
from Main.database_setup.queries import subject_queries

class CheckSubjectExist(HTTPEndpoint):
    
    @session_injection
    async def post(self,request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="this endpoint can only be accessed by HTTP url",
                status_code=403
            )
        session = request.state.session
        try:
            data = await request.json()
            id = data.get("id")
           
            query_response = await subject_queries.check_subject_id(session, id)
            if not query_response:
                raise HTTPException(
                    detail="this subject does not exist",
                    status_code=404
                )
            return JSONResponse(
                content="procced",
                status_code=200
            )
        except Exception as e:
            raise HTTPException(
                detail=f"error due to {e}",
                status_code=500
            )