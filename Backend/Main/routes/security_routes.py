
from . import *
from Main.endpoints.security import logout
from Main.endpoints.security import login
from Main.endpoints.security import user_info
from Main.endpoints.security import refresh_token
from Main.middlewares import AccessTokenMiddelware
from starlette.middleware import Middleware



all_security_endpoints = [
    Route(path="/login", endpoint=login.Login, name="login"),
    Route(path="/logout", endpoint=logout.Logout, name="logout"),
    Route(path="/refresh_token", endpoint=refresh_token.GetNewAccessToken),
    Route(path="/user_info", endpoint=user_info.UserInfo, name="user_info", middleware=[Middleware(AccessTokenMiddelware.AccessTokenMiddleware)]),
    Route(path= "/add", endpoint=login.Add)
    
] 