from .import *



class AccessTokenMiddleware:
    def __init__(self, app):
        self.app = app
        
    async def __call__(self, scope: Scope, receive: Receive, send: Send):
        if scope.get("type") != "http":
            return await self.app(scope, receive, send)
        
        auth_header = dict(scope.get("headers")).get(b"authorization")
        
        auth_token = auth_header.decode() if auth_header else None
        

        if auth_token and auth_token.startswith("Bearer"):
            user_ = await verify_token(auth_token[7:].strip(" "))
            if user_ == "invalid_token" or user_ == "error_decoding":
                response = JSONResponse(
                    content="invalid token type",
                    status_code=303
                )
                await response(scope, receive, send)
                return
            elif user_ == "time_expired":
                response = JSONResponse(
                    content="invalid token type",
                    status_code=403
                )
                await response(scope, receive, send)
                return 
            scope["user_"] = user_
            await self.app(scope, receive, send)
            return
        
        response = JSONResponse(
            content="unauthorized",
            status_code=401
        )
        await response(scope, receive, send)

