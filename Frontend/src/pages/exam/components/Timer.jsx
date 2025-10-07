import "../css/timer.css"
import { Clock1 } from "lucide-react"
import { useState, useEffect } from "react"
import { handleExamTimoutSubmittion } from "../js/examSubmittion"

export default function Timer({ hr, min, sec, authToken, subject, userDetails, examSubmitted, navigate, setMessage, displayNotification }) {
    const initSeconds = hr * 3600 + min * 60 + sec
    const [timedOut, setTimedOut] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(() => {
        return sessionStorage.getItem("current_time") || initSeconds
    })

    useEffect(
        ()=>{
            if(timedOut){
                setMessage({
                    msg_:"you where timed out",
                    type:"danger"
                })
                displayNotification()

                const ans = JSON.parse(sessionStorage.getItem("selectedAnswers")) || {}
                setTimeout(
                    ()=>{
                           handleExamTimoutSubmittion(authToken,ans, subject, navigate, userDetails, examSubmitted)
                    }, 1500
                )
            }
        },[timedOut]
    )

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                const newTime = prev - 1

                sessionStorage.setItem("current_time", String(newTime))

                if (newTime <= 0) {
                    clearInterval(interval)
                    setTimedOut(true)
                    return 0
                }

                return newTime
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, []) // Only runs once when component mounts

    const formattedTime = (total) => {
        const h = Math.floor(total / 3600)
        const m = Math.floor((total % 3600) / 60)
        const s = total % 60

        return `${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`
    }

    console.log(timedOut)
    return (
        <div className="timer">
            <div className="container bg-success fw-bold text-white p-2">
                <div className="row">
                    <div className="col-12">
                        <Clock1 /> {formattedTime(Number(secondsLeft))}
                    </div>
                </div>
            </div>
        </div>
    )
}
