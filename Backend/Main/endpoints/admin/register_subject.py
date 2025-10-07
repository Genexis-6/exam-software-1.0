from .. import *
from Main.database_setup.queries import subject_queries

class AddNewSubject(HTTPEndpoint):
    @session_injection
    async def post(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="this endpoint can only be accessed by HTTP url"
            )
        session = request.state.session
        try:
            subject_info = await request.json()
            if not subject_info:
                raise HTTPException(
                    detail="request body is empty",
                    status_code=400
                )
            sub_name = subject_info.get("name")
            sub_tutor = subject_info.get("tutor")
            sub_description = subject_info.get("description")

            if not sub_tutor or not sub_name or not sub_description:
                raise HTTPException(
                    detail="request body data not found",
                    status_code=400
                )
            query_response = await subject_queries.register_new_subject(session, subject_info)

            if query_response == "already_exist":
                raise HTTPException(
                    detail="this subject already exist",
                    status_code=403
                )
            return JSONResponse(
                content="new subject has been added",
                status_code=200
            )
        except BaseException as e:
            raise HTTPException(
                detail=f"error decoding json due to {e}",
                status_code=500
            ) 