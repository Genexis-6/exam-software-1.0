from .. import *
from Main.database_setup.queries import timer_queries


class SetExamTimer(HTTPEndpoint):
    
    @session_injection
    async def post(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="this endpoint can only be accessed by HTTP url"
            )
        session = request.state.session
        try:
            timer_ = await request.json()
            hr_ = int(timer_.get("hr")),
            min_ = int(timer_.get("min")),
            sec_ = int(timer_.get("sec"))
            subject_id = timer_.get("subject_id")
            
            if not timer_:
                raise HTTPException(
                    detail="request body is empty",
                    status_code=400
                )
            if not subject_id:
                raise HTTPException(
                    detail="request body data not accepted",
                    status_code=403
                )
            query_response = await timer_queries.set_exam_timer(session, timer_)
            if query_response == "new_timer_set":
                return JSONResponse(
                    content="new time has been set",
                    status_code=201
                )
            return JSONResponse(
                content="timer has been updated",
                status_code=200
            )
        except TypeError as e:
            raise HTTPException(
                detail=f"only accepts integers  {e}",
                status_code=500
            )
        except BaseException as e:
            raise HTTPException(
                detail=f"error decoding json due to {e}",
                status_code=500
            )