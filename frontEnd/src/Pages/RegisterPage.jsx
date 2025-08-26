import React,{ useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { toast,Bounce  } from 'react-toastify'
import { registerUser } from '../API Services/AuthAPIs'

function RegisterPage() {
  const[userDetails,setUserDetails] = useState({
  username: "",
  email: "",
  password:"",
})

const[error,setError] = useState("")
const navigate = useNavigate()

const handleChange=(e)=>{
  e.preventDefault()
   setUserDetails({  ...userDetails, 
      [e.target.name]: e.target.value })
}

const handleSubmit= async (e)=>{
  e.preventDefault()
try {
  const res = await registerUser({
    ...userDetails
  })
  setUserDetails("")
  navigate('/login')
  const msg = res.data.message
    if (msg) {
       toast.success(msg, {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
     
      }
} catch (error) {
  const msg = error?.response?.data?.message;
  toast.error(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
}
}
  return (
    <div>
       <div>
      <div className='flex justify-center  my-8'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[300px] md:w-[450px] lg:w-[500px]   border p-4">
  <legend className="fieldset-legend font-semibold">Register</legend>
         {error && (
  <div className="text-red-500 font-medium mb-4">
    {error}
  </div>
)}

  <label className="label">username</label>
  <input type="text" className="input w-96  md:w-full" value={userDetails.username} name = "username" placeholder="username"  onChange={(e)=>handleChange(e)} />

  <label className="label">Email</label>
  <input type="email" className="input w-96  md:w-full" value={userDetails.email} name = "email" placeholder="Email"  onChange={(e)=>handleChange(e)}/>

  <label className="label">Password</label>
  <input type="password" className="input w-96 md:w-full" value={userDetails.password} name = "password" placeholder="Password" onChange={(e)=>handleChange(e)} /><br />

  <button className="btn btn-neutral mt-4 w-96 md:w-full" onClick={(e)=>handleSubmit(e)}>signUp</button>
  <div className='flex justify-between p-2'>
  <p>Already have a Account?</p>
 <Link to ='/login'><button>SignIn</button></Link>
  </div>
</fieldset>
      </div>
    </div>
    </div>
  )
}

export default RegisterPage