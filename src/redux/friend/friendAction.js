import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

var URL = 'http://localhost:3001/friend'


export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (value = '') => {
        const { data } = await axios.get(`${URL}/getUsers?keyword=${value}`, { headers: { token: localStorage.getItem('userToken') } });

        return data

    }
);
export const getUsersPage = createAsyncThunk(
    'home/searchUser/Friend',
    async (value = 1) => {
        const { data } = await axios.get(`${URL}/getUsers?page=${value}`, { headers: { token: localStorage.getItem('userToken') } })
        return data
    })
export const addFriend = createAsyncThunk(
    'Friend/addFriend',
    async (id) => {
        const { data } = await axios.post(`${URL}/addFriend`, id, { headers: { token: localStorage.getItem('userToken') } });
        return data

    }
);

export const getRequsets = createAsyncThunk(
    'Friend/getMyListRequestAdd',
    async () => {

        const { data } = await axios.get(`${URL}/getMyListRequestAdd`, { headers: { token: localStorage.getItem('userToken') } });
        return data

    }
);
export const getMyRequsets = createAsyncThunk(
    'Friend/getStillThereRequest',
    async () => {

        const { data } = await axios.get(`${URL}/getStillThereRequest`, { headers: { token: localStorage.getItem('userToken') } });
        return data

    }
);
export const acceptFriend = createAsyncThunk(
    'Friend/acceptFriend',
    async (id) => {

        const { data } = await axios.post(`${URL}/acceptFriend`, id, { headers: { token: localStorage.getItem('userToken') } });
        return data

    }
);
export const rejectFriend = createAsyncThunk(
    'Friend/rejectFriend',
    async (id) => {

        const { data } = await axios.post(`${URL}/rejectFriend`, id, { headers: { token: localStorage.getItem('userToken') } });
        return data

    }
);
export const deleteMyRequestFriend = createAsyncThunk(
    'Friend/deleteMyRequestFriend',
    async (id) => {

        const { data } = await axios.post(`${URL}/deleteMyRequestFriend`, id, { headers: { token: localStorage.getItem('userToken') } });
        return data

    }
);
export const getMyFriends = createAsyncThunk(
    'Friend/getMyFriends',
    async (value = '') => {
        const { data } = await axios.get(`${URL}/getMyFriends?keyword=${value}`, { headers: { token: localStorage.getItem('userToken') } });
        return data

    }
);


