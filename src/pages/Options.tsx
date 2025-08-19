import { useNavigate } from "react-router-dom"
const API_URL = import.meta.env.VITE_API_URL;

export function Options() {
const navigate = useNavigate()
function handleSignout(){
    fetch(`http://${API_URL}:8000/auth/logout`, {
        method: "POST", 
        credentials: "include"
    })
    .then(()=>navigate("/"))
    .catch(err=>console.log(err))
};

  return (

    <>
        <div className="fixed inset-0 overflow-y-scroll pb-20 flex flex-col gap-4 h-full m-5">
            <div className='flex flex-col gap-4 h-full m-5'>
                <div className="w-full p-4 text-white card" onClick={()=>navigate("/dashboard")}>BACK</div>
                <div className="w-full p-4 text-white card" onClick={handleSignout}>SIGN OUT</div>
            </div>
        </div>
        
    </>
  )
}