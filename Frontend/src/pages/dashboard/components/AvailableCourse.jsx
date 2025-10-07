import examimg from "../../../assets/images/exams.svg"
import { getParticularSubjectInfo } from "../js/requestSubects"

export default function AvaliableCourse({navigate, subject, tutor, id, setClickedSubject, clickedSubject, authToken}){
    const handleNavigation = () =>{
        getParticularSubjectInfo(authToken, id, setClickedSubject)
        navigate(`/setup/${id}`)
    }
    return <div className="card" onClick={handleNavigation}>
        <div className="img text-center">
            <img src={examimg} alt="" />
        </div>
        <div className="description text-center mt-2">
            <div className="row">
                <div className="col-12 fw-bold text-success title">
                    {subject}
                </div>
                <div className="col-12 text-end fb-bold mt-3">
                    <span>{tutor}</span>
                </div>
            </div>
            
        </div>
    </div>
}