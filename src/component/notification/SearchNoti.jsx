import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getNotiSeen, searchNoti } from '../../redux/noti/notiAction';
import './noti.css'
import { Alert, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { makeStateIsEmpity } from '../../redux/noti/notiSlice';
export default function SearchNoti() {

    const [valueSearch, setValueSearch] = useState('')
    const dispatch = useDispatch();
    async function handleSearch(event) {
        event.preventDefault();

        dispatch(getNotiSeen(valueSearch))
    }
    const handleNameChange = (event) => {
        setValueSearch(event.target.value);

    };
    function clearInputsearch() {
        setValueSearch('')
        dispatch(makeStateIsEmpity())
        dispatch(getNotiSeen())
    }
    return (
        <>
            <div className=' search container'>

                {valueSearch && <CloseIcon className="fa-solid fa-xmark iconeSearchClose mouseCursor" onClick={clearInputsearch} />}
                <form onSubmit={handleSearch}>
                    <input value={valueSearch} onChange={handleNameChange} className=' w-75  form form-control text-center  m-auto my-3 rounded-5 shadow-lg' placeholder='Search' />
                    <button type='submit' className=' d-none'>

                    </button>
                    <SearchIcon className="fa-solid fa-magnifying-glass iconeSearch mouseCursor" onClick={handleSearch} />

                </form>
            </div >

        </>
    )
}
