import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBarData  } from './SideBarData';
import './NavBar.css';
import { IconContext } from 'react-icons';
import { IoMdAddCircleOutline } from "react-icons/io";
import {IoSchool} from "react-icons/io5";
import { collection, addDoc, doc, query, where, getDocs, QuerySnapshot } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { async } from '@firebase/util';
import { queryAllByAltText } from '@testing-library/react';

function NavBar() {

    // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCN1E0yCkUbk2v8kQH3PGPpvAqICZkrHOc",
    authDomain: "partnerup-8fb5c.firebaseapp.com",
    projectId: "partnerup-8fb5c",
    storageBucket: "partnerup-8fb5c.appspot.com",
    messagingSenderId: "757257283487",
    appId: "1:757257283487:web:0c6e02b206ade0c9033faa"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  
  const db = getFirestore(firebaseapp);

    const [sidebar, setSideBar] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [courses, setCourses] = useState(SideBarData)


    const showSideBar = () => setSideBar(!sidebar);

    const addCourse = (input) => {
        setShowModal(false)

        let class_id = Math.random().toString().substring(2,8);
        let n = input
        console.log(n);
        setCourses([...courses, { course_id: class_id, title: n, path: '/courses', icon: <IoSchool />, className: 'nav-text' }])
        
        addToDb(n);
    }


    const addToDb = (n) => {
            addDoc(collection(db, 'classes'), { 
                name: n
            });
    }
    
    const handleSubmit = (input) => {
        addCourse(input);
        addToDb(courses);
    }

    const fetchClasses = async () => {

        let questionsQuery = query(collection(db, "classes"))
        const data = await getDocs(questionsQuery);

        const ids = []
        //console.log(data)

        data.docs.forEach(doc => {
            ids.push(doc)
        });

        ids.forEach(i => {
            console.log(i)
            let courseQuery = query(collection(db, "classes"), where ("id", "==", doc(i)))
            const courseData = getDocs(courseQuery);
            setCourses([...courses, { course_id: i, title: courseData, path: '/courses', icon: <IoSchool />, className: 'nav-text' }])
        })

    }
    useEffect ( () => {
        fetchClasses();
    }) 
    
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
                        <li key={index} className='nav-text'>
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