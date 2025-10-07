import "../css/exam.css"
import Timer from "../components/Timer"
import QuestionIcon from "../components/QuestionIcon"
import {ArrowBigLeftDash, ArrowBigRightDash, Clock1} from "lucide-react"
import LoaderAnimation from "../../dashboard/components/loader"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleExamTimoutSubmittion } from "../js/examSubmittion"
import Notification from "../../../components/Notification"


export default function Exam({clickedSubject, displayPopUpMenu, authToken, userDetails, examSubmitted, showNotification, displayNotification}){
    const [current, setCurrent] = useState(Number(sessionStorage.getItem("currentQuestion")) || 0)
    const examStarted = sessionStorage.getItem("examStarted") === "true"
    
    const [selectedAnswers, setSelectedAnswers] = useState(JSON.parse(sessionStorage.getItem("selectedAnswers")) || {
        id: "",
        answer: "",
        option:""
    })
    const [message, setMessage] = useState({
        msg_:"",
        type:""
    })
    const navigate = useNavigate()

    const nextQa = () =>{
        current < clickedSubject.questions.length && setCurrent(prev=> prev + 1)
        sessionStorage.setItem("currentQuestion", current)
    }
    const previous = () =>{
        current>= 0 && setCurrent(prev=> prev - 1)
        sessionStorage.setItem("currentQuestion", current)
    }
    
    useEffect(
        ()=>{
            if(!clickedSubject){
                navigate("/home")
            }
        }, [clickedSubject]
    )

    if(!clickedSubject.hr || !clickedSubject.min || !clickedSubject.sec || !clickedSubject.questions){
        return <LoaderAnimation customMessage={"Error getting questions"}/>
    }


    const handleSelectAnswers = (event) =>{
        const id = event.target.id
        const answer = event.target.name
        const option = event.target.value
        setSelectedAnswers((prev) =>(
            {
                ...prev, [current]:{
                    id:id,
                    answer:answer,
                    option:option
                }
            }
        ))

    }
    useEffect(
        ()=>{
            sessionStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers))
        }, [Object.keys(selectedAnswers).length]
    )

        useEffect(() => {
          if(!examStarted){
            navigate("/home")
          }
      
          const blockback = () =>{
            window.history.pushState(null, "", window.location.href)
          }
      
          blockback()
          window.addEventListener("popstate", blockback)
      
          return () => {
            window.removeEventListener("popstate", blockback)
          }
        }, [navigate])


    const examFinished = () =>{
        displayPopUpMenu(`Submit Exam`,"If you wish to submit this exam, click the proceed button to continue", navigate, "/result")
        examSubmitted("submitted")

    }
    console.log(authToken)
    return <div className="exam mt-3">
        <div className="container">
            <div className="row">
                <div className="col-12 text-center mt-2">
                    {showNotification && <Notification data={message}/>}
                    <Timer  hr={Number(clickedSubject.hr)} min={Number(clickedSubject.min)} sec={Number(clickedSubject.sec)}  displayNotification={displayNotification} setMessage={setMessage}
                    authToken={authToken} navigate={navigate} userDetails={userDetails && userDetails} subject={clickedSubject} examSubmitted={examSubmitted}/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-8 question-section">
                    <div className="row">
                        <div className="col-12 text-success">
                            <h5>Quest {current + 1},</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3 qest">
                            <p>
                                {clickedSubject.questions[current]?.quest}
                            </p>
                        </div>
                    </div>
                    
                    <div className="row mt-2 ">
                        <div className="col-12 options">
                            <div className="row">
                                <div className="col-12">
                                    <input type="checkbox" name={clickedSubject.questions[current].a}
                                    onChange={(event)=>{handleSelectAnswers(event)}}
                                    id={clickedSubject.questions[current].quest_id}
                                    checked ={selectedAnswers[current]?.option === "a"}
                                    className="bg-success"
                                    value="a"
                                    /><span className="mx-1">A</span> <span className="mx-1">{clickedSubject.questions[current]?.a}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input type="checkbox" name={clickedSubject.questions[current].b}
                                    onChange={(event)=>{handleSelectAnswers(event)}} 
                                    checked ={selectedAnswers[current]?.option === "b"}
                                    value="b"
                                    id={clickedSubject.questions[current].quest_id} /><span className="mx-1">B</span><span className="mx-2">{clickedSubject.questions[current]?.b}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input type="checkbox" name={clickedSubject.questions[current].c}
                                    onChange={(event)=>{handleSelectAnswers(event)}}
                                    checked ={selectedAnswers[current]?.option === "c"}
                                    value={"c"}
                                   id={clickedSubject.questions[current].quest_id}/><span className="mx-1">C</span><span className="mx-2">{clickedSubject.questions[current]?.c}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input type="checkbox" name={clickedSubject.questions[current].d}
                                    onChange={(event)=>{handleSelectAnswers(event)}}
                                    checked ={selectedAnswers[current]?.option === "d"}
                                    value={"d"}
                                    id={clickedSubject.questions[current].quest_id}/><span className="mx-1">D</span><span className="mx-2">{clickedSubject.questions[current]?.d}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row mt-auto">
                        <div className="col-6 ">
                            <button className="btn btn-danger"
                            disabled = {current === 0} 
                            onClick={previous}
                            ><ArrowBigLeftDash />Previous</button>
                        </div>
                        <div className="col-6 text-end">
                            <button className="btn btn-success"
                            onClick={
                                ()=>{
                                    current === clickedSubject.questions.length - 1?
                                    examFinished()
                                    :nextQa()
                                }
                            }
                            >
                             {current === clickedSubject.questions.length - 1?"Submit":"Next"} <ArrowBigRightDash/>
                                
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="row">
                        <div className="col-12 text-center text-success mb-2">
                            <h5>{clickedSubject.questions.length} Questions</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 questions-options">
                            {
                                clickedSubject.questions.length!== 0 && clickedSubject.questions.map((item, index)=>(
                                    <QuestionIcon number = {index + 1} key={index} setCurrent = {setCurrent} answered = {selectedAnswers[index]} selectedAnswer={selectedAnswers}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}