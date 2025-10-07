import { useEffect } from "react";
import { handleLogout } from "../js/auth";
import {useNavigate } from "react-router-dom";
import Notification from "../../../components/Notification";


export default function Logout({authToken, setAuthToken, isAuthenticated, clearReactState}){
    const navigate = useNavigate()
    const message = {
        msg_:"you logged out successfully",
        type:"success"
    }

    useEffect(
        ()=>{
            if(!isAuthenticated){
                navigate("/")
            }
        }, []
    )
    useEffect(
        ()=>{
            if(isAuthenticated){
                handleLogout(authToken)
                sessionStorage.clear()
                clearReactState()
                setTimeout(
                    ()=>{
                        navigate("/")
                    }, 2000
                )
            }
        },[isAuthenticated]
    )
    return <div className="container">
        <div className="row">
            <div className="col-12 img-section logout-bg">
                <div className="row">
                    <Notification data={message}/>
                </div>
            </div>
        </div>
    </div>
}