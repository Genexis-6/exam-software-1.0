from .. import *
from Main.database_setup.queries import security_queries

class UserInfo(HTTPEndpoint):
    
    @session_injection
    async def get(self, request: Request):
        user_ = request.scope.get("user_")
        session = request.state.session
        if not user_:
            raise HTTPException(
                detail="user not authenticated",
                status_code=401
            )
        user_info = await security_queries.get_user_info(session, user_)
        if user_info == "none":
            raise HTTPException(
                detail="user not found",
                status_code=404
            )
        
        response = JSONResponse(
            content={
                "id":user_info.id, 
                "firstname": user_info.firstname,
                "lastname": user_info.lastname,
                "email": user_info.email,
                "picture": user_info.picture,
                "role": user_info.role,
                },
            status_code=200
        )
        return response
        