from .. import *
from Main.database_setup.queries import question_queries, subject_queries, student_starts_queries
from Main.utils import handle_score_summation

class HandleExamSubmittion(HTTPEndpoint):
    
    @session_injection
    async def post(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="this endpoint can only be accessed by HTTP url",
                status_code=403
            )
            
        session = request.state.session
        try:
            submittion = await request.json()
            subject_name = submittion.get("subject_name")
            exam_title = submittion.get("exam_title")
            answers = submittion.get("answers")
            time_left = int(submittion.get("timeLeft"))
            exam_status = submittion.get("exam_status")
            student_id = submittion.get("student_id")
           
            if not submittion:
                raise HTTPException(
                    detail="request body is empty",
                    status_code=400
                )
            if not exam_title or not answers or time_left<0 or not exam_status or not student_id:
                raise HTTPException(
                    detail="invalid request body",
                    status_code=403
                )
                
            query_response = await question_queries.get_questions_by_title(session, exam_title)
            processed_answer = [values for _, values in answers.items() if values != ""]
            
            

            if query_response == "non_found":
                raise HTTPException(
                    detail="no question with this title found",
                    status_code=404
                )
            print(submittion)
            score = await handle_score_summation(processed_answer, query_response)
            time_, score_qa, qa_to_ans_length = await subject_queries.get_time_spent(session, time_left, subject_name, score)
            qa_len = len(processed_answer)
            
            start_query_response = await student_starts_queries.set_new_student_start(session, submittion, qa_len, score_qa, time_, qa_to_ans_length)
            if start_query_response == "recorded":
                return JSONResponse(
                    content="score has been recorded",
                    status_code=201
                )
            return JSONResponse(
                content="score has been updated",
                status_code=200
            )
        
        except BaseException as e:
            raise HTTPException(
                detail=f"error decoding json due to {e}",
                status_code=500
            )
