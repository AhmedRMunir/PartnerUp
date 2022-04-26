import React from 'react'
import NavBar from '../components/NavBar'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InstructorHome from './InstructorHome';

function LaunchPage() {
  return (
   /* <div>
        <h1>PartnerUp!</h1>
        <button>Login with SSO</button>
    </div> */

    <BrowserRouter>
        <h1>PartnerUp!</h1>
        <Link to="/InstructorHome">
            <button>Login with SSO</button>
        </Link>
        <Routes>
            <Route exact path="/" element={LaunchPage}/>
            <Route path="InstructorHome" element={InstructorHome}/>
        </Routes>
    </BrowserRouter>
  )
}

export default LaunchPage