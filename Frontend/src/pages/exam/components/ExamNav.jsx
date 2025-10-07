import { useState } from "react"
import { SendHorizontal, Menu, X, } from 'lucide-react';
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/exam-logo.svg"
import { useNavigate } from "react-router-dom";

export default function ExamNavBar({displayPopUpMenu, userDetails, examSubmitted}){
   const [isOpen, setIsOpen] = useState(false)
   const navigate = useNavigate()
    return (
        <nav className="navbar bg-light border-bottom px-3">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="navbar-brand img">
                    <img src={logo} alt="" /> <span className="mx-3 fw-bold text-success">{
                        `${userDetails?.firstname} ${userDetails?.lastname}`
                        }</span>
                </div>

                
                <button className="btn d-sm-none" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>


               
                <div className={`collapse navbar-collapse d-sm-flex nav-links ${isOpen ? 'show' : ''}`}>
                    <div className="navbar-nav flex-sm-row flex-column w-100">


                        {<NavLink>
                            <div className="nav-item text-success fw-bold px-3 py-1" 
                            onClick={
                                ()=>{displayPopUpMenu(`Submit Exam`,"If you wish to submit this exam, click the proceed button to continue", navigate, "/result")
                                    examSubmitted("submitted")
                                }
                            
                            }
                            >Submit <span><SendHorizontal /></span></div>
                        </NavLink>}
                    </div>
                </div>
            </div>
        </nav>
    )
}