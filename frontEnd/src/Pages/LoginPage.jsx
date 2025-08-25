import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { toast,Bounce  } from 'react-toastify'
import { loginUser } from '../API Services/AuthAPIs'
import { useAuth } from '../Context/AuthContext.jsx';

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {login} = useAuth()
 

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser({ email, password })
      console.log(res.data)
     if (res.data?.IsBlocked) {
        toast.error("🚫 Your account is blocked by admin.", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
        setEmail("")
         setPassword("")
        return; // stop login process here
      }
      login(res.data.username);
      navigate("/");

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
setEmail("")
setPassword("")
window.localStorage.setItem("userID", res.data.userid);
// window.localStorage.setItem("username", res.data.username);
window.localStorage.setItem("Role", res.data.role);
window.localStorage.setItem("Email", res.data.email);

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
      setEmail("")
      setPassword("")

    }

  }
  return (
    <div>
      <div className='flex justify-center  my-8'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[300px] md:w-[450px] lg:w-[500px]   border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input w-96  md:w-full" value={email}placeholder="Email"  onChange={(e)=>setEmail(e.target.value)}/>

  <label className="label">Password</label>
  <input type="password" className="input w-96 md:w-full" value={password}placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/><br />

  <button className="btn btn-neutral mt-4 w-96 md:w-full" onClick={(e)=>handleSubmit(e)}>Login</button>
  <div  className='flex justify-between p-2'>
  <p>Not Registred?</p>
 <Link to ='/register'><button>SignUp</button></Link>
 <Link to ='/admin'><button>AdminLogin</button></Link>
  </div>
</fieldset>
      </div>
    </div>
  )
}

export default LoginPage