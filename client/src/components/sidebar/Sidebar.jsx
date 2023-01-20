import React from 'react'
import './sidebar.css'
import { useState ,useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats, setCats] = useState([]);
    // const location =useLocation();
    // console.log(location)

    useEffect(() => {
      const getCats =async ()=>{
        const res =await axios.get('/categories');
        // console.log(res);
        setCats(res.data);
      }
      getCats();
    }, [])
    
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT</span>
                <img src="https://images.pexels.com/photos/7292903/pexels-photo-7292903.jpeg?cs=srgb&dl=pexels-julia-volk-7292903.jpg&fm=jpg" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur ab omnis dolores vitae maiores!</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Category</span>
                <ul className="sidebarList">
                    {cats.map((c)=>{
                      return  <Link to={`/?cat=${c.name}`}className='link'><li className="sidebarListItem">{c.name}</li></Link>
                    })}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa fa-facebook-square"></i>
                    <i className="sidebarIcon fa fa-twitter-square"></i>
                    <i className="sidebarIcon fa fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
