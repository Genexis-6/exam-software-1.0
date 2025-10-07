import { useEffect, useState } from "react"
import LoaderAnimation from "../components/loader"
import "../css/examsetup.css"
import {ArrowBigLeftDash, ArrowBigRightDash, Clock1} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { CheckSubjectIdExist } from "../js/requestSubects"


export default function ExamSetup({isAuthenticated, authToken, displayPopUpMenu, clickedSubject}){
    const {id} = useParams() 
    const navigate = useNavigate()
    const [proceed, setProceed] = useState(false)

    useEffect(
        ()=>{
            if(!isAuthenticated){
                navigate("/")
            }
        }, []
    )
    useEffect(
        ()=>{
            CheckSubjectIdExist(authToken, setProceed, id)
        },[authToken]
    )

    if(!proceed){
        return <LoaderAnimation customMessage = {"this url is invalid go back to the home page..."}/>
    }
    if(Object.keys(clickedSubject).length === 0){
         return <LoaderAnimation customMessage = {"exam has not been set, go back to the home page..."}/>
    }
    if(!clickedSubject.hr || !clickedSubject.min || !clickedSubject.sec){
        return <LoaderAnimation customMessage = {"timer has not been set by the admin... "}/>
    }


    return <div className="exam-setup">
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="bg-img">
                        {/* background image here */}
                    </div>
                </div>
                <div className="col-12 col-lg-8  information">
                    <div className="row text-center text-success  mt-3">
                        <h4 className="fw-bold">{clickedSubject.exam_title}</h4>
                    </div>
                    <div className="row mt-4 fw-bold">
                        <div className="col-6 text-warning ">
                            <Clock1 />{clickedSubject.hr}hr {clickedSubject.min}min {clickedSubject.sec}sec
                        </div>
                        <div className="col-6 text-end text-danger">
                            <p className="mx-2">{clickedSubject.tutor}</p>
                            
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12  text-success">
                                    <h5 >Description</h5>
                                </div>
                                <div className="col-12">
                                    <p>
                                        {clickedSubject.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-auto">
                        <div className="col-6">
                            <button className="btn btn-warning text-white fw-bold" onClick={()=>{navigate("/home")}}>
                                <ArrowBigLeftDash /> Back
                            </button>
                        </div>
                        <div className="col-6 text-end">
                            <button className="btn btn-success text-white fw-bold " onClick={()=>{displayPopUpMenu(`${clickedSubject.exam_title} exam`,"If you wish to proceed with this exam, click the proceed button to conitnue", navigate, "/exam")}}>Procced <ArrowBigRightDash/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}