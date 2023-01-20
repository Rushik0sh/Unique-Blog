import axios from 'axios'
import { useContext } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import './settings.css'
import { useState } from 'react'

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [success, setSuccess] = useState(false)

  const PF = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      password,
      email
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put('/users/' + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  }
  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-circle-user"></i>
            </label>
          </div>
          <input type="file" id='fileInput' style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <button className='settingsSubmit' type='submit'>Update</button>
          {success && <span style={{ color: "green", textAlign: 'center', marginTop: '20px' }}>Your data has been updated</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
