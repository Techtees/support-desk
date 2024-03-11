import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket, reset} from '../features/ticket/ticketSlice'
import Spinner from '../component/Spinner'


function NewTicket() {
    const {user} = useSelector((state) => state.auth)
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.ticket)

    const[name] = useState(user.name)
    const[email] = useState(user.email)
    const[product, setProduct] = useState('iPhone')
    const[description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch])

    if(isLoading) {
        return <Spinner />
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({product,description}))
    }
    return ( 
        <>
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={name}
                        disabled
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={email}
                        disabled
                     />
                </div>
                <form onSubmit = {handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name='product'
                            id='product'
                            value={product}
                            onChange={ (e) => setProduct(e.target.value)}
                        >
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                            
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea 
                            name="description" className='form-control' placeholder='Description' 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            id="description" 
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
     );
}

export default NewTicket;