import {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {getTicket, closeTicket} from '../features/ticket/ticketSlice'
import {getNotes, reset as notesReset} from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom';
import {BackButton} from '../component/BackButton'
import Spinner from '../component/Spinner'; 
import NoteItem from '../component/NoteItem';
import {toast} from 'react-toastify'

function Ticket() {
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)

    const {notes, isLoading:notesIsLoading } = useSelector((state) => state.notes)
    // console.log(note)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {ticketId} = useParams()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))

        //eslint-disable-next-line
    }, [isError, message, ticketId])

    const handleTicket = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')
        navigate('/tickets')

    }

    if(isLoading || notesIsLoading) {
        return <Spinner />
    }

    if(isError) {
        return <h3>Something Went Wrong</h3>
    }
    return ( 
        <div className='ticket-page'>
           <header className="ticket-header">
                <BackButton url= '/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Product: {ticket.product} </h3>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
           </header>
           {notes.map((note) => (
            <NoteItem key={note._id} note ={note}  />
           ))}
           {ticket.status !== 'closed' && (
            <button className='btn btn-block btn-danger' onClick={handleTicket}> Close TIcket</button>
           )}
        </div>
     );
}

export default Ticket;