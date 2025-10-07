from .. import *
from Main.utils import extract_qa_from_excel
from Main.database_setup.queries import uploading_qureries, subject_queries


class UploadExamQuestion(HTTPEndpoint):
    
    @session_injection
    async def post(self, request: Request):
        if request.scope.get("type") != "http":
            raise HTTPException(
                detail="this endpoint can't be reached by the url"
            )
        session = request.state.session
        questions = await request.form()
        sub_name = questions.get("name")
        title= questions.get("title"),
        author = questions.get("author"),
        excel_file = questions.get("upload_file")
        
        if not author or not title or not excel_file or not sub_name:
            raise HTTPException(
                detail="request form body incomplete",
                status_code=400
            )
        
        
        if not excel_file.filename.endswith(".xlsx"):
            raise HTTPException(
                detail="file format not accepted",
                status_code=403
            )
        
        check_response = await subject_queries.check_subject_exist(session, sub_name)
        if check_response == "non_found":
            raise HTTPException(
                detail="this subject does not exist",
                status_code=404
            )
        
        content = await excel_file.read()
        extracted_qa = extract_qa_from_excel(content) 
        print(check_response)
        question_payload = {
            "title": title,
            "author":author,
            "subject_id": check_response,
            "questions":extracted_qa
        }
        query_response = await uploading_qureries.upload_exam_questions(session, question_payload)
        if query_response == "question_add":
            return JSONResponse(
                content="questions has been uploaded",
            status_code=200
        )
        raise HTTPException(
            detail="error uploading question",
            status_code=500
        )
        