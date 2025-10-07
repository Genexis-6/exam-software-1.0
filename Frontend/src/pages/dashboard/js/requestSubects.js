import {mainUrl, getMethod} from "../../../config"


export const getAllAvailableSubjects = async (authToken, setAllSubjects, setFilteredSearch) =>{
    try{
        const fetchData = await fetch(`${mainUrl}/student/all_subjects`, getMethod(authToken))
        if(fetchData.ok){
            const data = await fetchData.json()
            console.log(data)
            setAllSubjects(data)
            setFilteredSearch(data)
            
        }
        else{
            throw new Error("error getting rooms")
        }
    }catch(error){
        console.log("error connecting to server", error)
    }
}


export const CheckSubjectIdExist = async (authToken , setProceed, id) =>{
       try{
        const fetchData = await fetch(`${mainUrl}/student/check_id`,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${authToken}`
            },
            method:"POST",
            credentials:"include",
            body: JSON.stringify({
                id:id
            })
        })
        if(fetchData.ok){
            const data = await fetchData.json()
            console.log(data)
            setProceed(data)
            sessionStorage.removeItem("clickedSubject")
            sessionStorage.removeItem("current_time")
        }
        else{
            throw new Error("error getting rooms")
        }
    }catch(error){
        console.log("error connecting to server", error)
    }
}


export const getParticularSubjectInfo = async (authToken, id, setClickedSubject) =>{
    try{
        const fetchData = await fetch(`${mainUrl}/student/subject_questions`,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${authToken}`
            },
            method:"POST",
            credentials:"include",
            body: JSON.stringify({
                id:id
            })
        })
        if(fetchData.ok){
            const data = await fetchData.json()
            sessionStorage.setItem("clickedSubject", JSON.stringify(data))
            setClickedSubject(data)
        }else{
            throw new Error("error getting subject info")
        }
    }catch(error){
        console.log("error communicationg with server ", error)
    }
}


export const getStudentParticularResult = async (authToken, payload, setStudentStarts) =>{
        try{
        const fetchData = await fetch(`${mainUrl}/student/view_result`,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${authToken}`
            },
            method:"POST",
            credentials:"include",
            body: JSON.stringify(payload)
        })
        if(fetchData.ok){
            const data = await fetchData.json()
            setStudentStarts(data)
        }else{
            throw new Error("error getting subject info")
        }
    }catch(error){
        console.log("error communicationg with server ", error)
    }
}