import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBarData  } from './SideBarData';
import './NavBar.css';
import { IconContext } from 'react-icons';
 
function NavBar() {

    const [sidebar, setSideBar] = useState(false); 

    const showSideBar = () => setSideBar(!sidebar);
    return (
    <>
    <IconContext.Provider value= {{ color: 'white' }}>
        <div className="nav-bar">
            <Link to="#" className="menu-bars">
                <FaBars onClick={showSideBar}/> 
            </Link>
        </div>

        <nav className={sidebar ? 'navbar-menu active' : 'navbar-menu'}>
            <ul className='nav-menu-items' onClick={showSideBar}>
                <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars'>
                        <AiOutlineClose />
                    </Link>
                </li>
                {SideBarData.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
        </IconContext.Provider>
    </>

    )
}

export default NavBar