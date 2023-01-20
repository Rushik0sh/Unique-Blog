import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './topbar.css'

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
    }
    return (
        <>
            <div className='top'>
                <div className="topLeft">
                    <i className="topIcon fa fa-facebook-square"></i>
                    <i className="topIcon fa fa-twitter-square"></i>
                    <i className="topIcon fa fa-pinterest-square"></i>
                    <i className="topIcon fab fa-instagram-square"></i>
                </div>
                <div className="topCenter">
                    <ul className="topList">
                        <Link to='/' className="topListItem">HOME</Link>
                        <Link to='/' className="topListItem">ABOUT</Link>
                        <Link to='/' className="topListItem">CONTACT</Link>
                        <Link to='/write' className="topListItem">WRITE</Link>
                        <Link to='/' className="topListItem" onClick={handleLogout}>{user && 'LOGOUT'}</Link>
                    </ul>
                </div>
                <div className="topRight">
                    {user ? (
                        <Link to='/settings'><img className='topImg' src={PF+user.profilePic} alt="" /></Link>
                    ) : (<><ul className='topList'>
                        <Link to='/login' className="topListItem">Login</Link>
                        <Link to='/register' className="topListItem">Register</Link>
                    </ul>
                    </>
                    )
                    }
                    <i className="topSearchIcon fa fa-search"></i>
                </div>
            </div>
        </>
    )
}

