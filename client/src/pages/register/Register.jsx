import './register.css'
import {Link} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)

  const handleclick=(async(e)=>{
    e.preventDefault();
    setError(false);
    try{
      const res =await axios.post('/auth/register',{
        username,
        email,
        password
      });
      res.data && window.location.replace('/login');
      setError(false);
    }catch(err){
      setError(true);
    }
  })
  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleclick}>
            <label>Username</label>
            <input type="text" className='registerInput' placeholder='Enter your username...' onChange={e=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="text" className='registerInput' placeholder='Enter your email...'onChange={e=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" className='registerInput' placeholder='Enter your password...' onChange={e=>setPassword(e.target.value)}/>
            <button className='registerButton' type='submit'>Register</button>
        </form>
        <Link className='registerLoginButton' to='/login'>Login</Link>
        {error && <span style={{color:'red',marginTop:'10px'}}>Something went wrong</span>}
    </div>
  )
}
