import {CircleX, ThumbsUp} from "lucide-react"
import { useEffect, useState } from "react";
import { handleExamSubmittion } from "../pages/exam/js/examSubmittion";

export default function PopUpNotification({popUpNotificationMessage, setShowPopUpMenu,clickedSubject, authToken, examSubmitted, exam_status, userDetails, timeLeft, preparingResult, setPreparingResult}){
    
    const selectedAnswer = JSON.parse(sessionStorage.getItem("selectedAnswers")) || {}
    const [resultAvailable, setResultAvailable] = useState(false)
    const [subject, setSubject] = useState(clickedSubject || "")
    
    

   
  
    // useEffect(
    //     ()=>{
    //         if( popUpNotificationMessage.operationValue === "/result"){
    //             preparingResult && popUpNotificationMessage.operation(popUpNotificationMessage.operationValue);
    //             preparingResult && setShowPopUpMenu(false)
    //         }
    //     },[authToken, preparingResult]
    // )
    useEffect(
        ()=>{
            setResultAvailable(sessionStorage.getItem("displayResult") === "true")
        }, [preparingResult]
    )
    console.log(resultAvailable)

    return <div className="popup-notifiaction">
        <div className="container popup-model">
            <div className="row">
                <div className="col-12 title-section text-center mt-1 text-success">
                    <h4 className="fw-bold">{popUpNotificationMessage.title}</h4>
                </div>
            </div>
            <div className="row">
                <div className={`col-12 mt-5 popup-message text-center`}>
                    {preparingResult && (<>
                    <div className="spinner"></div> <p className="fw-bold mx-3 mt-3">Submitting</p>
                    </>)}
                    {!preparingResult && <p>{popUpNotificationMessage.message}</p>}
                </div>
            </div>
            <div className="row mt-auto mb-3">
                <div className="col-12 popup-options">
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-danger fw-bold" onClick={()=>{setShowPopUpMenu(false)}}
                                disabled={preparingResult}
                                >
                               <CircleX /> Cancel
                            </button>
                        </div>
                        <div className="col-6 text-end">
                            <button className="btn btn-success fw-bold" onClick={()=>{
                                popUpNotificationMessage.operationValue !== "/result"?
                                popUpNotificationMessage.operation(popUpNotificationMessage.operationValue):
                                setPreparingResult(true); 
                                popUpNotificationMessage.operationValue === "/result"?(resultAvailable && setShowPopUpMenu(false)):setShowPopUpMenu(false)
                                popUpNotificationMessage.operationValue === "/result"  && handleExamSubmittion(selectedAnswer, subject, 
                                    setPreparingResult, popUpNotificationMessage.operation, setShowPopUpMenu, timeLeft, exam_status, userDetails?.id, authToken)
                                popUpNotificationMessage.operationValue === "/exam" && sessionStorage.setItem("examStarted", "true")
                                popUpNotificationMessage.operationValue === "/result" && sessionStorage.removeItem("examStarted")
                                popUpNotificationMessage.operationValue === "/result" && examSubmitted("submitted")

                            }}
                                disabled={preparingResult}
                                >
                                
                                {popUpNotificationMessage.operationValue === "/result"?"Submit":"Proceed"} <ThumbsUp />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}