import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div>
      <div className='flex justify-center  my-8'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[300px] md:w-[450px] lg:w-[500px]   border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input w-96  md:w-full" placeholder="Email" />

  <label className="label">Password</label>
  <input type="password" className="input w-96 md:w-full" placeholder="Password" /><br />

  <button className="btn btn-neutral mt-4 w-96 md:w-full">Login</button>
  <div  className='flex justify-between p-2'>
  <p>Not Registred?</p>
 <Link to ='/register'><button>SignUp</button></Link>
  </div>
</fieldset>
      </div>
    </div>
  )
}

export default LoginPage