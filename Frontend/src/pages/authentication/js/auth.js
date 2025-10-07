import { mainUrl } from "../../../config"


const showNotification = (displayNotification, setMessage, content, type) =>{
    setMessage({
        msg_:content,
        type:type
    })
    displayNotification()
}

export const handleLogin = async (payload, e,setIsSubmitted, displayNotification, setMessage, setAuthToken, navigate) =>{
    try{
        const fetchData = await fetch(`${mainUrl}/security/login`,{
            headers:{
                "Content-Type": "application/json"
            },
            method:"POST",
            body:payload,
            credentials:"include"
        })
        if(fetchData.ok){
            const data = await fetchData.json()
            showNotification(displayNotification, setMessage,"user logged in successfully","success")
            setAuthToken(data.access_token)
            e.target.reset()
            setIsSubmitted(false)
            sessionStorage.setItem("isAuthenticated", "true")

            navigate("/home")



        }else if(fetchData.status === 401){

            setIsSubmitted(false)
            showNotification(displayNotification, setMessage,"invalid password","warning")
 


        }else if(fetchData.status === 403){

            setIsSubmitted(false)
            showNotification(displayNotification, setMessage,"invalid email type... 'supports only @gmail.com'","warning")
 


        }
        
        
        else if(fetchData.status === 404){
            setIsSubmitted(false)
            showNotification(displayNotification, setMessage,"No user with this record found... contact the admin","danger")


        }else{
            setIsSubmitted(false)
            showNotification(displayNotification, setMessage,"error submitting form","danger")
            throw new Error("error submitting form")
            
        }
    }catch(error){
        console.log("erro from server due to,", error)
        setIsSubmitted(false)
        showNotification(displayNotification, setMessage,"error connecting to server","danger")

    }
}


export const handleLogout = async (authToken) =>{
    try{
        const fetchData = await fetch(`${mainUrl}/security/logout`, {
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
            },
            credentials:"include"
        })
        if(fetchData.ok){
            const data = await fetchData.json()
            console.log(data.message)
        }else{
            throw new Error("error deleting token")
        }
    }catch(error){
        console.log("error connecting to server", error)
    }
} 