import notFound from "../assets/images/404.png"
import { useNavigate } from "react-router-dom"
import { ArrowBigRightIcon } from "lucide-react"

export default function NotFound404 ({isAuthenticated}){
    const navigate = useNavigate()

    const handleNavigation = () =>{
        isAuthenticated? navigate("/home"): navigate("/")
    }
    return <div className="container">
        <div className="row">
            <div className="col-12 mt-5 text-center">
                <img src={notFound} alt="" srcset="" />
            </div>
            <div className="col-12 text-center">
                <div className="row">
                    <div className="col-12">
                        <h4 className="text-danger fw-bold">
                            Page not-found
                        </h4>
                    </div>
                    <div className="col-12 mt-3">
                        <button className="btn btn-success" onClick={handleNavigation}>{`Back to ${isAuthenticated?"Home page": "Login page"}`}<ArrowBigRightIcon/></button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}