import { textAlign } from '@mui/system';
import NavBar from '../components/NavBar';

function InstructorHome() {
  return (
    <div>
      <NavBar/>
      <h1 style={{textAlign: 'center'}}>Instructor Home: Select a course</h1>
    </div>
  )
}

export default InstructorHome;