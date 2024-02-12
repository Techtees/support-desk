import {createSlice, createAsyncTHunk} from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const ticketSlice = createSlice({
    name:'ticket',
    initialState,
    reducers: (state) => {
        reset:(state) => initialState
    },
    extraReducers: (builder)
})


export const {reset} = ticketSlice.actions
export default ticketSlice.reducer