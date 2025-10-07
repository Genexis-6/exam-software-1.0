import { useEffect, useState } from "react"
import "../css/displayresult.css"
import { useNavigate } from "react-router-dom"
import { getStudentParticularResult } from "../js/requestSubects"

export default function DisplayResult({userDetails, clickedSubject, authToken}){
    const displayResult= sessionStorage.getItem("displayResult")==="true"
    const [stundetStarts, setStudentStarts] = useState({})
    const navigate = useNavigate()


    useEffect(
        ()=>{
            if(!displayResult){
                navigate("/home")
            }
        },[]
    )
    useEffect(
        ()=>{
            if(authToken && userDetails){
                getStudentParticularResult(authToken, {
                    student_id: userDetails.id,
                    exam_title: clickedSubject.exam_title
                }, setStudentStarts)
            }
            
        }, [authToken, userDetails]
    )

    const getEncouragementMessage = (score, total) =>{
          const percentage = (score / total) * 100;

            if (percentage >= 50) {
                 return "🎉 Great job! You passed the exam. Keep up the good work and aim even higher next time!";
             } else {
            return "💪 Don't be discouraged! Failing is a part of learning. Review your mistakes, and come back stronger!";
            }

        }
    return <div className="display-results">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6 result-section">
                    <div className="row">
                        <div className="col-12 text-white text-center mt-3">
                            <h4 className="fw-bold">Your Result</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-4">
                            <div className="row show-result ">
                                <div className="col-12 mt-5 text-center text-white fw-bold">
                                    <h1 className="fw-bold">{stundetStarts?.score}</h1>
                                    <h4 className="mt-2">Of {stundetStarts?.qa_to_ans_length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 text-white">
                        <div className="col-12 text-center">
                            <h3 className="fw-bold">{stundetStarts?.exam_title}</h3>
                        </div>
                        <div className="col-12 text-center">
                            {getEncouragementMessage(stundetStarts?.score,stundetStarts?.qa_to_ans_length )}
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 summary-section">
                    <div className="row">
                        <div className="col-12 mt-3 text-center">
                           <h4 className="fw-bold">Summary</h4>
                        </div>
                    </div>
                    <div className="row mt-5 all-starts">
                        <div className="col-12 starts">
                            <div className="row">
                                <div className="col-2 mt-2">
                                    <span className="fw-bold">Name:</span>
                                </div>
                                <div className="col-10 mt-2">
                                    {`${userDetails?.firstname} ${userDetails?.lastname}`}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 starts">
                            <div className="row">
                                <div className=" col-5  mt-2">
                                    <span className="fw-bold">Time Spent:</span>
                                </div>
                                <div className=" col-7  mt-2">
                                    {stundetStarts?.time_left}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 starts">
                            <div className="row">
                                <div className="col-7  mt-2">
                                    <span className="fw-bold">Question Answered:</span>
                                </div>
                                <div className="col-5  mt-2">
                                    {stundetStarts?.qa_length_ans} Questions
                                </div>
                            </div>
                        </div>
                        <div className="col-12 starts">
                            <div className="row">
                                <div className="col-3 mt-2">
                                    <span className="fw-bold">Status:</span>
                                </div>
                                <div className=" col-9  mt-2">
                                    {stundetStarts?.exam_status}
                                </div>
                            </div>
                            <div className="bg-img"></div>
                        </div>
                    </div>
                </div>
                
            </div>
           
        </div>
         
    </div>
}