import Notification from "../../../components/Notification"
import "../css/intro.css"
import "../css/home.css"
import "../css/avaliablecourse.css"
import Intro from "../components/Intro"
import AvaliableCourse from "../components/AvailableCourse"
import { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom";
import LoaderAnimation from "../components/loader"




export default function Home({isAuthenticated, showNotification, displayNotification, allSubjects,
     filteredSearch, setFilteredSearch, setClickedSubject, authToken, clickedSubject}){
    const [introDisappeared, setIntoDisappeared] = useState(false)
    const disableInto = sessionStorage.getItem("disableIntro") === "true"
    const examStarted = sessionStorage.getItem("examStarted") === "true"
    const [notification, setNotification] = useState({ 
        msg_:"",
        type:"" })
    
    
    const navigate = useNavigate()

    const sendNotification = (msg_, type) =>{
        setNotification({
            msg_:msg_, type :type
        })
    }
    useEffect(
        ()=>{
            if(!isAuthenticated){
                navigate("/logout")
            }

        },[isAuthenticated]
    )
    useEffect(
        ()=>{
            if(examStarted){
                navigate("/exam")
            }
        }, []
    )
    useEffect(
        ()=>{
            setTimeout(()=>{
                setIntoDisappeared(true)
                !introDisappeared && sessionStorage.setItem("disableIntro", "true")
            }, 3000)
        }, []
    )    


    // disable view result if this page is reached
    useEffect(
        ()=>{
            sessionStorage.removeItem("displayResult")
            sessionStorage.removeItem("exam_status")
            
        },[]
    )

    // remove clicked subject from the session storage if the user hit this page
    useEffect(
        ()=>{
            if(!examStarted && Object.keys(clickedSubject).length !== 0){
                setClickedSubject({})
                sessionStorage.removeItem("clickedSubject")
                
            }
        }, [authToken]
    )

    const handleSearches = (e) =>{
        const searchInput = allSubjects.filter(item=>item.subject.toLowerCase().includes(e))
        setFilteredSearch(searchInput)
        console.log(filteredSearch)
    }
    if(!allSubjects){
        return <LoaderAnimation/>
    }

    return <>
        {showNotification && <Notification data={notification}/>}
        {!disableInto && <Intro addClass = {introDisappeared && "d-none"}/>}
        {
            disableInto && <div className={`container home mt-3`} >
                <div className="row">
                    <div className="col-12 text-center mt-1">
                        <h4 className="fw-bold text-success">All Courses Avaliable</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-3 col-lg-4 ">
                        <div className="row">
                            <div className="col-12 d-flex flex-column fw-bold text-success">
                                <div className="row">
                                    <div className="col-12 mb-1 fw-bold text-success filter">
                                        <div className="row">
                                            <div className="col-4">
                                               <label htmlFor=""> Search</label>
                                            </div>
                                            <div className="col-8">
                                                <label htmlFor="">Active </label>
                                                <input type="checkbox" className="mx-3"name="" id=""  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <input type="text" className="w-100 mb-1" name="" id="" placeholder="Course Name" onChange={(e)=>{handleSearches(e.target.value.toLowerCase())}} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12"></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-8 all-cards ">
                        {
                            filteredSearch.length !== 0?(
                                filteredSearch.map((item, index) =>(
                                    <AvaliableCourse key={index} subject={item.subject} 
                                    tutor = {item.tutor} id={item.id} navigate = {navigate} 
                                    setClickedSubject={setClickedSubject}
                                    authToken={authToken}
                                    />
                                ))
                            ):(<div className="fw-bold text-danger">No Course Found</div>)
                        }
                    </div>
                </div>


                <div className="bg-home-img">
                    {/* bg image here */}
                </div>

            </div>
        }
    </>
}