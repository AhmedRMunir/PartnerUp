import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBarData  } from './SideBarData';

function NavBar() {

    const [sidebar, setSideBar] = useState(false); 

    const showSideBar = () => setSideBar(!sidebar);
    return (
    <>
        <div className="nav-bar">
            <Link to="#" className="menu-bars">
                <FaBars onClick={showSideBar}/> 
            </Link>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars'>
                        <AiOutlineClose />
                    </Link>
                </li>
                {SideBarData && SideBarData.length ? SideBarData.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                }) : null}
            </ul>
        </nav>
    </>

    )
}

export default NavBar