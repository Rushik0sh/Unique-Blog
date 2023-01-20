import './login.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isfetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  }
  // console.log(user)
  console.log(isfetching);
  return (
    <div className='login'>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" className='loginInput' placeholder='Enter your username...' ref={userRef} />
        <label>Password</label>
        <input type="password" className='loginInput' placeholder='Enter your password...' ref={passwordRef} />
        <button className='loginButton' type='submit' disabled={isfetching}>Login</button>
      </form>
      <Link to='/register' className='loginRegisterButton'>Register</Link>
    </div>
  )
}
