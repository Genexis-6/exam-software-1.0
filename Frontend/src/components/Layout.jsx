import {Outlet} from "react-router-dom"
import NavBar from "./navBar"
import "../pages/authentication/css/auth.css"

export default function Layout({isAuthenticated, userDetails}){
    return <>
    <NavBar isAuthenticated={isAuthenticated} userDetails ={userDetails && userDetails}/>
    <Outlet/>
    </>
}