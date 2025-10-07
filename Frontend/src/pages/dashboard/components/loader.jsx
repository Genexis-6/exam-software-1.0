export default function LoaderAnimation({customMessage}){
    return <div className="loader">
        <div className="spinner">
        </div>
        <div className="loading mx-2 text-white fw-bold">
            {customMessage? customMessage : "loading..."}
        </div>
    </div>
}