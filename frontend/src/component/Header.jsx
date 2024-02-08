import { FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import{logOur, logOut, reset} from '../features/auth/authSlice'
import {Link, useNavigate} from 'react-router-dom'
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logOut())
        dispatch(reset())
        navigate('/')
    }
    return ( 
        <header className='header'>
            <div className="logo">
                <Link to='/'>Support Desk</Link>
            </div>
            <ul>
                {
                    user ? (
                        <li>
                            <button className='btn' onClick={handleLogout} > <FaSignInAlt /> Logout
                            </button>
                        </li>
                    ) : (
                       <>
                            <li>
                                <Link to='/login'>
                                    <FaSignInAlt />Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <FaUser />Register
                                </Link>
                            </li>
                       </>
                    )
                }
                
            </ul>
        </header>
     );
}

export default Header;