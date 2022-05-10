import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBarData  } from './SideBarData';
import './NavBar.css';
import { IconContext } from 'react-icons';
import { IoMdAddCircleOutline } from "react-icons/io";
import {IoSchool} from "react-icons/io5";

function NavBar() {

    const [sidebar, setSideBar] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [courses, setCourses] = useState(SideBarData)

    const showSideBar = () => setSideBar(!sidebar);

    const handleSubmit = (input) => {
        setShowModal(false)
        setCourses([...courses, { title: input, path: '/Course1', icon: <IoSchool />, className: 'nav-text' }])
    }

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
                {courses.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link to='/course' state={item}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
                <li className='nav-text'>
                    <div onClick={() => setShowModal(true)}>
                        <IoMdAddCircleOutline />
                        <span style={{ color: 'white' }}>Add Course</span>
                    </div>
                </li>
            </ul>
        </nav>
        </IconContext.Provider>
        {showModal && <AddCourseModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />}
    </>

    )
}

export default NavBar

const AddCourseModal = ({ onSubmit, onClose }) => {
    const [input, setInput] = useState('')
    return (
      <div className='add-course-modal-container'>
          <div className='add-course-modal-inner-container'>
              <p>Course Name</p>
              <input onChange={e => setInput(e.target.value)} />
              <button onClick={() => onSubmit(input)} style={{ marginTop: '8px' }}>Submit</button>
              <div className='add-course-modal-close-icon' onClick={onClose}>X</div>
          </div>
      </div>
      )
}