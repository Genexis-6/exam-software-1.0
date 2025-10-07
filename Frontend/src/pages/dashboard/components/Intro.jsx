import {ArrowBigRight} from "lucide-react"

export default function Intro({addClass}){
    
    return <div className={`intro ${addClass}`}>
        <div className="container h-100">
            <div className="row">
                <div className="col-12 d-flex flex-column content">
                    <div className="row">
                        <div className="col-12 text-center mt-4">
                            <h4 className="fw-bold text-success">Welcome to App Name</h4>
                        </div>
                        <div className="col-12 mt-3 text-center">
                            <p>short description</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="bg-img">
                {/* background image here */}
            </div>
        </div>
    </div>
}