
import {FaQuestion} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function AboutIconLink({handleShow}) {
    const location = useLocation()
    const test = () => {
       return location.pathname === '/' ? 'flex' : 'none'
    }
  return (
    <div className="about-link" style={{display: test()}}>
        <Link to={{
            pathname: '/about'
        }}>
            <FaQuestion size={30} />
        </Link>
    </div>
  )
}

export default AboutIconLink