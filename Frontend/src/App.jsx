import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import Layout from "./components/Layout"
import Login from "./pages/authentication/pages/Login"
import { requestAccessToken, getCurrentUser } from "./config"
import Logout from "./pages/authentication/pages/Logout"
import PopUpNotification from "./components/PopupNotification"


import Home from "./pages/dashboard/pages/Home"
import ExamSetup from "./pages/dashboard/pages/ExamSetup"
import DisplayResult from "./pages/dashboard/pages/DisplayResult"


import ExamLayout from "./pages/exam/components/ExamLayout"
import Exam from "./pages/exam/pages/Exam"
import { getAllAvailableSubjects } from "./pages/dashboard/js/requestSubects"

import Profile from "./pages/dashboard/pages/Profile"
import NotFound404 from "./pages/404Notfound"


function App() {
  const [showNotification, setShowNotification] = useState(false)
  const [authToken, setAuthToken] = useState("")
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  const [userDetails, setUserDetails] = useState(null)
  const [allSubject, setAllSubjects] = useState([])
  const [filteredSearch, setFilteredSearch] = useState([])
  const [clickedSubject, setClickedSubject] = useState(JSON.parse(sessionStorage.getItem("clickedSubject")) || {})
  const [showPopUpMenu, setShowPopUpMenu] = useState(false)
  const [preparingResult, setPreparingResult] = useState(false)
  const [popUpNotificationMessage, setPopUpNotificationMessage] = useState({
    title:"",
    message:"",
    operation:null,
    operationValue:null
  })
  const exam_status = sessionStorage.getItem("exam_status") || ""
  const timeLeft = sessionStorage.getItem("current_time") || ""

  const displayNotification = () =>{
    setShowNotification(true);
    setTimeout(
      ()=>{
        setShowNotification(false)
      }, 3000
    )
  }

  const displayPopUpMenu = (title, message, operation, operationValue = null) =>{
    setShowPopUpMenu(true)
    setPopUpNotificationMessage(
      {
        title:title,
        message:message,
        operation:operation,
        operationValue:operationValue
      }
    )
  }

  const clearReactState = () =>{
    setAllSubjects([])
    setAuthToken(null)
    setUserDetails(null)
    setFilteredSearch([])
    setClickedSubject({})
    setShowPopUpMenu(false)

  }

  useEffect(
    ()=>{
      if(isAuthenticated && !authToken)
        requestAccessToken(setAuthToken)
    }, [authToken]
  )
  useEffect(
    ()=>{
      if(authToken && isAuthenticated && !userDetails){
        getCurrentUser(authToken, setUserDetails, setAuthToken)
      }
    }, [authToken, userDetails]
  )
  useEffect(
    ()=>{
      if(authToken && isAuthenticated && allSubject.length === 0){
        getAllAvailableSubjects(authToken, setAllSubjects, setFilteredSearch)
      }
    }, [authToken]
  )

  
  // this function set the status of the exam 
  const examSubmitted = (value) =>{
    sessionStorage.setItem("exam_status", value)
  }


  return <>
   {showPopUpMenu && <PopUpNotification popUpNotificationMessage ={popUpNotificationMessage} setShowPopUpMenu ={setShowPopUpMenu} preparingResult={preparingResult} setPreparingResult={setPreparingResult}
   authToken={authToken} examSubmitted={examSubmitted} exam_status={exam_status} userDetails={userDetails && userDetails} timeLeft={timeLeft}
   clickedSubject = {clickedSubject}/>}
  <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Layout isAuthenticated={isAuthenticated} userDetails ={userDetails && userDetails}/>}>
      
        <Route index element ={<Login showNotification = {showNotification} displayNotification ={displayNotification} 
        setAuthToken={setAuthToken} isAuthenticated={isAuthenticated} authToken={authToken}/>}/>

        <Route path="logout" element ={<Logout authToken={authToken} setAuthToken={setAuthToken} isAuthenticated={isAuthenticated} clearReactState={clearReactState}/>}/>


        <Route path="home" element={<Home isAuthenticated={isAuthenticated} showNotification={showNotification} 
        filteredSearch = {filteredSearch} setFilteredSearch={setFilteredSearch} setClickedSubject={setClickedSubject} authToken={authToken}
        displayNotification={displayNotification} allSubjects={allSubject} clickedSubject={clickedSubject}/>}/>
        <Route path="setup/:id" element={<ExamSetup isAuthenticated={isAuthenticated} authToken={authToken}  setClickedSubject = {setClickedSubject}
        clickedSubject = {Object.keys(clickedSubject).length !== 0 && clickedSubject} displayPopUpMenu = {displayPopUpMenu} 
        />}/>
        <Route path="result" element= {<DisplayResult userDetails ={userDetails && userDetails}  
        clickedSubject = {Object.keys(clickedSubject).length !== 0 && clickedSubject} authToken={authToken}/>}    />

        <Route path="profile" element={<Profile/>}/>
      </Route>

      <Route path ="/exam" element = {<ExamLayout displayPopUpMenu = {displayPopUpMenu} userDetails={userDetails && userDetails} examSubmitted={examSubmitted}/>}>
        <Route index element ={<Exam clickedSubject = {Object.keys(clickedSubject).length !== 0 && clickedSubject} displayPopUpMenu = {displayPopUpMenu}
         authToken={authToken && authToken}  examSubmitted={examSubmitted}  userDetails={userDetails && userDetails} showNotification={showNotification} displayNotification={displayNotification}
        />}   />
      </Route>

      <Route path="*" element={<NotFound404 isAuthenticated={isAuthenticated}/>}/>
    </Routes>
  </BrowserRouter>
  </>
}

export default App
