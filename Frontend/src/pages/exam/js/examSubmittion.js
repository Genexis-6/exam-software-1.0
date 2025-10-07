import {mainUrl} from "../../../config"
// handle_exam_submittion


const removeSubjectInfo = () =>{
        sessionStorage.setItem("displayResult", "true")
        sessionStorage.removeItem("current_time")
        sessionStorage.removeItem("currentQuestion")
        sessionStorage.removeItem("selectedAnswers")
        sessionStorage.removeItem("clickedSubject")
        sessionStorage.removeItem("current_time")
        sessionStorage.removeItem("CurrentQuestions")
        sessionStorage.removeItem("exam_status")
        sessionStorage.removeItem("examStarted")
}


export const handleExamSubmittion = async (payload, subject, setPreparingResult, navigate, setShowPopUpMenu, timeLeft, exam_status, student_id, authToken) =>{
    try{
        const fetchData = await fetch(`${mainUrl}/student/handle_exam_submittion`, {
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            },
            method:"POST",
            credentials:"include",
            body:JSON.stringify(
                {
                student_id:student_id,
                subject_name:subject.subject_name,
                exam_title:subject.exam_title,
                answers:payload,
                timeLeft:timeLeft,
                exam_status:exam_status
            }
            )
        })

        if(fetchData.ok){
            setPreparingResult(false)
            const data = await fetchData.json()
            console.log(data)
            removeSubjectInfo()
            navigate("/result")
            setShowPopUpMenu(false)
        }else{
            throw new Error("error submitting exam")
        }


    }catch(error){
        console.log("error submitting exam", error)
    }
}


export const handleExamTimoutSubmittion = async (authToken, payload, subject, navigate, student_id, examSubmitted) =>{
    try{
        const fetchData = await fetch(`${mainUrl}/student/handle_exam_submittion`, {
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            },
            method:"POST",
            credentials:"include",
            body:JSON.stringify(
                {
                student_id:student_id,
                subject_name:subject.subject_name,
                exam_title:subject.exam_title,
                answers:payload,
                timeLeft:"0",
                exam_status:"timed out"
            }
            )
        })
        if(fetchData.ok){
            const data = await fetchData.json()
            console.log(data)
            removeSubjectInfo()
            examSubmitted("submitted")
            navigate("/result")
        }else{
            throw new Error("error submitting exam")
        }


    }catch(err){
        console.log("error submitting exam ", err)
    }

}