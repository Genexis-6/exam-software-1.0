import {Eye, EyeClosed} from "lucide-react"
import { useEffect, useState } from "react"
import { handleLogin } from "../js/auth"
import Notification from "../../../components/Notification"
import { useNavigate } from "react-router-dom"

export default function Login({showNotification, displayNotification, setAuthToken, isAuthenticated, authToken}){
    const [isVisible, setIsVisible] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [message, setMessage] = useState({
        msg_:"",
        type:""
    })
    const naviagte = useNavigate()


    useEffect(
        () =>{
            if(isAuthenticated){
                naviagte("/home")
            }

        }, []
    )
    const handleSubmittion = (e)=>{
        setIsSubmitted(true)
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")
        
        if(email.trim() === "" || password.trim() === ""){
            setMessage({
                msg_:"field must not be empty",
                type:"warning"
            })

            displayNotification()
            setIsSubmitted(false)
        }else{
            const data = {
                email:email,
                password:password
            }
            handleLogin(JSON.stringify(data), e, setIsSubmitted, displayNotification, setMessage, setAuthToken, naviagte)
        }
    
    }

    return <>
        <div className="container-fluid mt-2" >
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="d-none d-lg-block col-lg-6 img-section">
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 m-auto mt-5">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="row ">
                                {showNotification && <Notification data={message}/>}
                                    <div className="login-logo">

                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-12 form-section">
                                <form onSubmit={handleSubmittion}>
                                <h2 className="text-center text-success">Login</h2>
                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">email</label>
                                            <input type="email"  placeholder="email" name="email" />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label ">password</label>
                                            <input type={isVisible?"text":"password"} placeholder="password" name="password"/>
                                            <span className="eye" onClick={()=>{
                                                setIsVisible(prev => !prev)
                                            }}>
                                                {
                                                    isVisible? <Eye size={15}/>: <EyeClosed size={15}/>
                                                }
                                            
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <button className="btn btn-success" disabled = {isSubmitted}>{
                                                !isSubmitted?"submit":"submitting..."
                                            }</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="col-12 bg-img">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>
}