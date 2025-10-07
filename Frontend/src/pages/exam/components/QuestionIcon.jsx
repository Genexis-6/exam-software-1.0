import "../css/questionIcon.css"

import checkedLogo from "../../../assets/images/checked.svg"
import questionLogo from "../../../assets/images/question-logo.svg"
import { useEffect, useState } from "react"

export default function QuestionIcon({number, setCurrent, answered, selectedAnswer}){
    const [isChecked, setIsChecked] = useState()

    useEffect(
        ()=>{
            setIsChecked(answered?answered.length!== 0:false)
        },[selectedAnswer]
    )

    return <div className={`question-icon ${isChecked && "bg-warning"}`} onClick={()=>{
        setCurrent(number - 1)
        sessionStorage.setItem("currentQuestion", number - 1)
    }}>
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <img src={isChecked?checkedLogo:questionLogo} alt="" />
                </div>
                <div className="col-12">
                    <hr />
                </div>
                <div className={`col-12 text-center ${isChecked && "text-white fw-bold"}`}>
                    {number}
                </div>
            </div>
        </div>
    </div>

}