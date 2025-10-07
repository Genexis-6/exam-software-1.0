from .. import *
from Main.utils import verify_token, generate_access_token
from datetime import timedelta

class GetNewAccessToken(HTTPEndpoint):
    async def get(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="url is invalid",
                status_code=403
            )
        get_refresh_token = request.cookies.get("refresh_token")
        if get_refresh_token:
            user_ =await verify_token(get_refresh_token)
            if user_ == "invalid_token" or user_ == "error_decoding" or user_ == "time_expired":
                response = JSONResponse(
                    content="login for new refresh token",
                    status_code=303
                )
                return response
            
            new_access_token = generate_access_token(
                user_email=user_.get("user_email"),
                user_id= user_.get("user_id"),
                time_=timedelta(minutes=30)
            )
            response = JSONResponse(
                content={
                    "access_token": new_access_token,
                    "token_type" : "Bearer"
                    },
                status_code=200
            )
            return response
                
        response = JSONResponse(
            content=str(get_refresh_token),
            status_code=200
        )
        return response