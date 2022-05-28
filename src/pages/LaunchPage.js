import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";
import InstructorHome from "./InstructorHome.js";


function LaunchPage() {
  let navigate = useNavigate();
  const handleLogin = (googleData) => {
    console.log("test");
    console.log(googleData);
    let path = '/instructor-home';
    navigate(path);
  };
  const handleFailure = (result) => {
    console.log(result);
  };
  return (
    <div>
         <h1>PartnerUp!</h1>
         <GoogleLogin
            clientId={'757257283487-66gfaadgquqni05m3avlc0jmkdt41rio.apps.googleusercontent.com'}
            buttonText ="Log in with Google SSO"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
    </div>
  )
}


export default LaunchPage