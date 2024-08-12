import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

var URL = 'http://localhost:3001/notification'


export const getNotiSeen = createAsyncThunk(
    'users/notification',
    async (value = '') => {
        const { data } = await axios.get(`${URL}/getNotiSeen?keyword=${value}`, { headers: { token: localStorage.getItem('userToken') } });
        return data
    }
);

export const getNotiSeenPage = createAsyncThunk(
    'users/getNotiSeenPage',
    async (value = 1) => {
        const { data } = await axios.get(`${URL}/getNotiSeen?page=${value}`, { headers: { token: localStorage.getItem('userToken') } });
        return data
    }
);
export const getNotiUnSeen = async () => {
    const { data } = await axios.get(`${URL}/getNotiUnSeen`, { headers: { token: localStorage.getItem('userToken') } });

    return data
}
export const makeNotiSeen = async () => {
    const { data } = await axios.get(`${URL}/makeNotiSeen`, { headers: { token: localStorage.getItem('userToken') } });
}
export const searchNoti = createAsyncThunk(
    'home/searchNoti/Noti',
    async (value) => {
        const { data } = await axios.get(`${URL}/getNotiSeen?keyword=${value}`, { headers: { token: localStorage.getItem('userToken') } })
        return data
    })