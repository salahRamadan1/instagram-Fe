import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:3001/user/'
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData) => {
        const { data } = await axios.post(`${URL}register`, userData)
        return data
    }
)
export const googleLogIn = createAsyncThunk(
    'auth/googleLogIn',
    async (idToken) => {
        const { data } = await axios.post(`${URL}googleLogIn`, idToken)
        return data
    }
)
export const verfiy = createAsyncThunk(
    'auth/verfiy',
    async (userData) => {
        const { data } = await axios.post(`${URL}verfiy`, userData)
        return data
    }
)

export const SendNumberverfiy = createAsyncThunk(
    'auth/numberVerfiy',
    async (userData) => {
        const { data } = await axios.post(`${URL}numberVerfiy`, userData)
        return data
    }
)


export const logInUser = createAsyncThunk(
    'auth/logIn',
    async (userData) => {
        const { data } = await axios.post(`${URL}logIn`, userData)
        return data

    }
)



export const resetPassWord = createAsyncThunk(
    'auth/resetPawword',
    async (userData) => {
        const { data } = await axios.put(`${URL}resetPassword`, userData)
        return data

    }
)
export const changeProfileImage = createAsyncThunk(
    'auth/ChangeProdileImage',
    async (image) => {
        const { data } = await axios.put(`${URL}ChangeProdileImage`, image, { headers: { token: localStorage.getItem('userToken') } })
        return data

    }
)
export const ChangeName = createAsyncThunk(
    'auth/ChangeName',
    async (newName) => {
        const { data } = await axios.put(`${URL}ChangeName`, newName, { headers: { token: localStorage.getItem('userToken') } })
        return data

    }
)
export const ChangePassword = createAsyncThunk(
    'auth/ChangePassword',
    async (newPassword) => {
        const { data } = await axios.put(`${URL}ChangePassword`, newPassword, { headers: { token: localStorage.getItem('userToken') } })
        return data

    }
)