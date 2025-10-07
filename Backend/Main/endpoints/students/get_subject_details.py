from .. import *
from Main.database_setup.queries import subject_queries



class GetSubjetDetails(HTTPEndpoint):
    
    @session_injection
    async def post(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="this endpoint can only be accessed by HTTP url",
                status_code=403
            )
        
        session = request.state.session
        try:
            subject_ = await request.json()
            subject_id = subject_.get("id")
            
            query_response = await subject_queries.get_subject_questions_time(session, subject_)
            if query_response == "not_working":
                raise HTTPException(
                    detail=f"error getting questions",
                    status_code=400
                )   
            return JSONResponse(
                content=query_response,
                status_code=200
            )     
        except BaseException  as e:
            raise HTTPException(
                detail=f"error in json due to {e}",
                status_code=500
            )
        