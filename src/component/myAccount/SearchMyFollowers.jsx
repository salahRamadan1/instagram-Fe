import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getMyFriends } from '../../redux/friend/friendAction';
import { makeStateIsEmpity } from '../../redux/friend/friendSlice';
export default function SearchMyFollowers() {
    const [valueSearch, setValueSearch] = useState('')
    const dispatch = useDispatch();
    async function handleSearch(event) {
        event.preventDefault();

        dispatch(getMyFriends(valueSearch))
    }
    const handleNameChange = (event) => {
        setValueSearch(event.target.value);

    };
    function clearInputsearch() {
        setValueSearch('')
        dispatch(makeStateIsEmpity())
        dispatch(getMyFriends())
    }
    return (
        <div className=' searchMyFollowers container'>

            {valueSearch && <CloseIcon className="fa-solid fa-xmark iconeSearchCloseMyFollowers mouseCursor" onClick={clearInputsearch} />}
            <form onSubmit={handleSearch}>
                <input onChange={handleNameChange} value={valueSearch} className=' w-75  form form-control text-center  m-auto my-3 rounded-5 shadow-lg' placeholder='Search' />
                <button type='submit' className=' d-none'>

                </button>
                <SearchIcon className="fa-solid fa-magnifying-glass iconeSearchMyFollowers mouseCursor" onClick={handleSearch} />

            </form>
        </div >
    )
}
