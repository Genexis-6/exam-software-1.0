export const mainUrl = "http://127.0.0.1:8000"
export const getMethod = (authToken) =>{
    if(authToken === null){
        return {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
            credentials:"include"
        }
    }else{
        return {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${authToken}`
            },
            credentials:"include"
        }
    }
}



// get access token 
export const requestAccessToken = async (setAuthToken)=>{
    try{
        const fetchData = await fetch(`${mainUrl}/security/refresh_token`, getMethod(null))
        if(fetchData.ok){
            const data = await fetchData.json()
            setAuthToken(data.access_token)
        }else{
            throw new Error("error getting access token")
        }
    }catch(error){
        console.log("error connecting to server", error)
    }
}

export const getCurrentUser = async (authToken, setUserDetails, setAuthToken) =>{
    try{
        const fetchData = await fetch(`${mainUrl}/security/user_info`,getMethod(authToken))
        if(fetchData.ok){
            const data = await fetchData.json()
            setUserDetails(data)
        }
        else if(fetchData.status === 401){
            requestAccessToken(setAuthToken)
        }
        else{
            throw new Error("error getting user information")
        }

    }catch(error){
        console.log("error connecting to server ", error)
    }
}



