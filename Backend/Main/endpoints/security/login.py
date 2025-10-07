from .. import *
from Main.database_setup.queries.security_queries import register_student, login_user_query
from Main.utils import generate_access_token, generate_refresh_token
from datetime import timedelta


class Login(HTTPEndpoint):
    @session_injection
    async def post(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="url can't access this endpoint",
                status_code=403
            )
        session = request.state.session
        
        user = await request.json()
        user_email = user.get("email")
        password = user.get("password")
        
        if not user_email or not password:
            raise HTTPException(
                detail="request body is empty",
                status_code=400
            )
        if not user_email.endswith("@gmail.com"):
            raise HTTPException(
                detail="invalid email",
                status_code=403
            )
            
        query_response = await login_user_query(session=session, user=user)
        if query_response =="invalid_password":
            raise HTTPException(
                detail="invalid password",
                status_code=401
            )
        elif query_response == "not_found":
            raise HTTPException(
                detail="no user found",
                status_code=404
            )
            
        access_token = generate_access_token(
            user_email=user_email, user_id=query_response.id,time_=timedelta(minutes=20)
        )
        refresh_token = generate_refresh_token(user_email=user_email, user_id=query_response.id) 
           
        response = JSONResponse(
            content={
                "access_token": access_token,
                "token_type": "Bearer",
                "message": "user logged in successfully"
                },
            status_code=200
        )
        response.set_cookie(key="refresh_token", value=refresh_token, samesite="none", httponly=True, secure=True, path="/security")
        return response
    
    
    
    
    
    
        
class Add(HTTPEndpoint):

    @session_injection
    async def get(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="url can't access this endpoint",
                status_code=403
            )
        session = request.state.session
        student = {
            "firstname":"genexis",
            "lastname":"victory",
            "email":"victoryazudoni@gmail.com",
            "picture":"picture_url",
            "role":"user",
            "password":"string",
            
        }
        query_response = await register_student(session, student)
        if not query_response:
            raise HTTPException(
                detail="user already exist",
                status_code=403
            )

            
        return JSONResponse(
            content="user added",
            status_code=201
        )
    
        