import { useState } from "react"
import logo from "../assets/images/logo.png"
import { DoorOpen, Menu, UserRound, X, Key, House, User } from 'lucide-react';
import { NavLink } from "react-router-dom";



export default function NavBar({isAuthenticated, userDetails}){
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className="navbar bg-light border-bottom px-3">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="navbar-brand img row">
                    <div className="col-6">
                        <img src={logo} alt="" />
                    </div>
                     <div className="col-6 mt-3">
                        <div className="row">
                            <div className="col-12">
                                    <span className="mx-5  fw-bold text-success">GX- Exam</span>
                            </div>
                            <div className="col-12">
                                 {isAuthenticated && <span className="mx-5 user-name fw-bold text-danger "> <User size={13} />{userDetails?.firstname}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                
                <button className="btn d-sm-none" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>


               
                <div className={`collapse navbar-collapse d-sm-flex nav-links ${isOpen ? 'show' : ''}`}>
                    <div className="navbar-nav flex-sm-row flex-column w-100">
                        {isAuthenticated && <NavLink to={"/home"}>
                            <div className="nav-item text-success fw-bold px-3 py-1">Home <span><House /></span></div>
                        </NavLink>}
                        {isAuthenticated && <NavLink to={"/profile"}>
                            <div className="nav-item text-success fw-bold px-3 py-1">Profile <span><UserRound/></span></div>
                        </NavLink>}

                        {isAuthenticated && <NavLink to={"/logout"}>
                            <div className="nav-item text-danger fw-bold px-3 py-1">Exit <span><DoorOpen/></span></div>
                        </NavLink>}

                        {!isAuthenticated && <NavLink to={"/"}>
                            <div className="nav-item text-warning fw-bold px-3 py-1">Login <span><Key/></span></div>
                        </NavLink>}
                    </div>
                </div>
            </div>
        </nav>
    )
}