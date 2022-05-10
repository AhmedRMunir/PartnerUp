import { Link } from 'react-router-dom';

function LaunchPage() {
  return (
    <div>
         <h1>PartnerUp!</h1>
         <Link to="instructor-home">
            <button>Login with SSO</button>
        </Link>
    </div>
  )
}

export default LaunchPage