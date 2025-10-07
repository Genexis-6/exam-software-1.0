import { Outlet } from "react-router-dom";
import ExamNavBar from "./ExamNav";

export default function ExamLayout({displayPopUpMenu, userDetails, examSubmitted}){
    return <>
    <ExamNavBar displayPopUpMenu = {displayPopUpMenu} userDetails ={userDetails && userDetails} examSubmitted ={examSubmitted}/>
    <Outlet/>
    </>
}