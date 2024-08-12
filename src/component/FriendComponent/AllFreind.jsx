import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, getUsers } from '../../redux/friend/friendAction';
import { Alert, Pagination } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStateIsEmpity } from '../../redux/friend/friendSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchFriend from './SearchFriend';
import PaginationFriend from './PaginationFriend';
import { imgUrl } from '../../future/shareFunction/tokenJwtDecode';

export default function AllFreind() {
    // 1. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const { loadingGetFriends,
        errorGetFriends,
        errorGetFriendsApi,
        users,
        loadingAddFirend,
        errorAddFriend,
        errorAddFriendsApi,
    } = useSelector((state) => state.friend); // Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 2. State and Utility Variables:
    const [successAddFriend, setSuccessAddFriend] = useState(false)
    useEffect(() => {
        if (users) {
            // console.log(users[0].profilePicture);
            console.log(users);
        }
        // Dispatch an action to fetch users (likely using Redux or a similar state management library)
        dispatch(getUsers());

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            dispatch(makeStateIsEmpity())
        };
    }, []);
    // Action to send request
    const handleAddFriend = async (id) => {
        const response = await dispatch(addFriend({ id }))
        if (response.payload?.message === 'success') {
            await dispatch(getUsers());

            setSuccessAddFriend(true)
            setTimeout(() => {
                setSuccessAddFriend(false)
            }, 1000);
        }

    }

    return (
        <div className='container  mx-auto '>
            <h4 className='  text-center'>Suggested</h4>
            <SearchFriend />
            {/* Conditional rendering based on friend addition status */}
            {successAddFriend && < Alert severity='success' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>added</Alert>}
            {loadingAddFirend && <CircularProgress sx={{ marginX: "auto", display: "flex" }} />}
            {errorAddFriend && <Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorAddFriend}</Alert>}
            {errorAddFriendsApi && <Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorAddFriendsApi}</Alert>}
            {/* Conditional rendering based on friend retrieval status */}
            {errorGetFriends && <Alert severity='success' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorGetFriends}</Alert>}
            {errorGetFriendsApi && <Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorGetFriendsApi}</Alert>}
            {/* List of suggested friends if retrieved successfully */}
            {
                users && users.map((elm, i) => (
                    <div key={i} className='d-flex justify-content-between align-items-center mx-auto border border-1 p-2 rounded-3 shadow-lg mb-2 w-75'>
                        <div className=' d-flex justify-content-center align-content-center'>
                            {elm.profilePicture.startsWith('https://') ?

                                <img src={elm.profilePicture && elm.profilePicture} className='profileImage me-2' alt="" /> :

                                <img src={imgUrl + elm.profilePicture} className='profileImage me-2' alt="" />


                            }

                            <p className=' mt-2'>{elm.name}</p>
                        </div>


                        <span style={{ cursor: "pointer", color: "green" }} onClick={() => handleAddFriend(elm._id)}>

                            < PersonAddIcon sx={{ cursor: "pointer" }} />


                        </span>

                    </div>
                ))
            }
            {/* Loading indicator while retrieving friends */}
            {loadingGetFriends && <CircularProgress sx={{ marginX: "auto", display: "flex" }} />}
            <PaginationFriend />
        </div >
    )
}
