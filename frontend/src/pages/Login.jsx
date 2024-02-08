import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { toast } from 'react-toastify'
import {Navigate, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../component/Spinner'
import {login, reset} from '../features/auth/authSlice'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    }) 

    const {email, password} = formData
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }
        dispatch(reset)
    },[user, isSuccess, isLoading, isError, message, navigate, dispatch])

    const handleInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }) )
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
         
    }
    if(isLoading) {
        return <Spinner />
    }
    return ( 
        <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Sign in
            </h1>
            <p>Please log in to get support</p>
        </section>

        <section className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                      type="email"
                      className='form-control'
                      id='email'
                      name='email'
                      value={email}
                      placeholder='Enter your email'
                      onChange={handleInputChange}
                      required
                     />
                </div>
                <div className="form-group">
                    <input 
                      type="password"
                      className='form-control'
                      id='password'
                      name='password'
                      value={password}
                      placeholder='Enter your password'
                      onChange={handleInputChange}
                      required
                     />
                </div>
                <div className="form-group">
                    <button className="btn btn-block">
                        Submit
                    </button>
                </div>
            </form>
        </section>
        </>
     );
}

export default Login;