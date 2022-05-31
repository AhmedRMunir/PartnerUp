import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import React, { useEffect } from 'react';
import './LaunchPage.css'

function login(auth) {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}

function LaunchPage() {
  const auth = getAuth();
  let navigate = useNavigate();
  useEffect(() => {
    getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      if (user == null) {
        return;
      }
      if (user.email.endsWith("uw.edu") || user.email.endsWith("cs.washington.edu")) {
        navigate('/instructor-home');
      } else {
        alert('Sorry, you must sign in with a UW email account to access this service!');
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      if (error.user == null) {
        return;
      }
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      if (credential.user == null) {
        return;
      }
      // ...
    });
  });
  return (
    <div className='launchPage'>
      <h1 className='title'>PartnerUp!</h1>
      <button className='login-button' onClick={() => login(auth)}>Login with SSO</button>
    </div>
  )
}

export default LaunchPage