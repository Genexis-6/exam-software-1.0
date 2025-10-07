from starlette.routing import Route, Mount
from .security_routes import all_security_endpoints
from .admin_route import all_admin_endpoint
from .students_routes import all_student_routes




all_routes = [
    Mount(path="/security", routes=all_security_endpoints),
    Mount(path="/admin", routes=all_admin_endpoint),
    Mount(path="/student", routes=all_student_routes)
    
]
