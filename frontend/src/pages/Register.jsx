import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2:''
    }) 
    const navigate = useNavigate()

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()

    const {user, isLoading, isSuccess,isError, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        //Redirect when logged in
        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset)
    }, [isError, isLoading, message,isSuccess,user, navigate,dispatch])

    const handleInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }) )
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if( password !== password2){
            toast.error('Password do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }
    return ( 
        <>
        <section className="heading">
            <h1>
                <FaUser /> Register 
            </h1>
            <p>Please create an account</p>
        </section>

        <section className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                      type="text"
                      className='form-control'
                      id='name'
                      name='name'
                      value={name}
                      placeholder='Enter your name'
                      onChange={handleInputChange}
                      required
                     />
                </div>
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
                    <input 
                      type="password"
                      className='form-control'
                      id='password2'
                      name='password2'
                      value={password2}
                      placeholder='Confirm password'
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

export default Register;