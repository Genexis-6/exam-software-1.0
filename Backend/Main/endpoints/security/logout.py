from .. import *

class Logout(HTTPEndpoint):
    @session_injection
    async def delete(self, request:Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="url can't access this endpoint",
                status_code=403
            )
        user_ = request.scope.get("user_")
        response = JSONResponse(
            content="user logged out successfully",
            status_code=200
        )
        response.delete_cookie("refresh_token", path="/security", samesite="none", secure=True, httponly=True)
        return response