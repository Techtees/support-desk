import {useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Modal from 'react-modal'
import {getTicket, closeTicket} from '../features/ticket/ticketSlice'
import {getNotes, createNote, reset as notesReset} from '../features/notes/noteSlice'
import {FaPlus} from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom';
import {BackButton} from '../component/BackButton'
import Spinner from '../component/Spinner'; 
import NoteItem from '../component/NoteItem';
import {toast} from 'react-toastify'

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
}

Modal.setAppElement('#root')

function Ticket() {
    const [ modalIsOpen, setModalIsOpen] = useState()
    const [noteText,setNoteText] = useState('')
    const {ticket, isLoading, isError, message} = useSelector((state) => state.tickets)

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

    const  handleNoteSubmit = (e) =>{
        e.preventDefault()
        dispatch(createNote({noteText, ticketId}))
        closeModal()
        setNoteText('')
    }

    if(isLoading || notesIsLoading) {
        return <Spinner />
    }

    if(isError) {
        return <h3>Something Went Wrong</h3>
    }
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)
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
           {ticket.status !=='closed' && (<button className='btn' onClick ={openModal}><FaPlus
            />Add Notes</button>)}
           {notes.map((note) => (
            <NoteItem key={note._id} note ={note}  />
           ))}

           <Modal isOpen= {modalIsOpen} onRequestClose = {closeModal} style={customStyles} contentLabel = 'Add Note'>
            <h2>Add Notes</h2>
            <button className='btn-close' onClick={closeModal}>X</button>
            <form onSubmit={handleNoteSubmit}>
                <div className='form-group'>
                    <textarea
                    name='noteText'
                    id='noteText'
                    className='form-control'
                    placeholder='Note text'
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    ></textarea>
                </div>
                <div className='form-group'>
                    <button className='btn' type='submit'>
                    Submit
                    </button>
                </div>
            </form>
           </Modal>
           {ticket.status !== 'closed' && (
            <button className='btn btn-block btn-danger' onClick={handleTicket}> Close TIcket</button>
           )}
        </div>
     );
}

export default Ticket;