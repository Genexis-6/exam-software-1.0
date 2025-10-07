import { useState } from "react"


export default function Notification({data}){

    return <div className="col-12 pop-up ">
        <div className="row">
            <div className={`alert ${
                data.type === "warning" && "alert-warning" || 
                data.type === "success" && "alert-success" ||
                data.type === "danger" && "alert-danger" 
            }  text-center`}>
                {data.msg_}
            </div>
        </div>
    </div>
}