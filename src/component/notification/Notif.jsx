import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { imgUrl, user } from '../../future/shareFunction/tokenJwtDecode'
import './noti.css'
import { makeStateIsEmpity } from '../../redux/noti/notiSlice';
import { getNotiSeen, makeNotiSeen } from '../../redux/noti/notiAction';
import { NavLink } from 'react-router-dom';
import SearchNoti from './SearchNoti';
import PaginationNoti from './PaginationNoti';
export default function Notif() {
  // 1. Data Fetching and Error Handling:
  const dispatch = useDispatch();
  const { loadingGetNotiSeen,
    errorGetNotiSeen,
    errorGetNotiSeenApi,
    noti
  } = useSelector((state) => state.noti); // Get auth data and errors from Redux store
  useEffect(() => {
    makeNotiSeen()
    dispatch(getNotiSeen({ ssa: "", asd: "" }))
    console.log(noti);
  }, [])
  return (
    <div className='container text-center mx-auto'>
      <h3 className=' mb-3'>Notification</h3>
      <SearchNoti />
      {/* Conditional rendering based on friend retrieval status */}
      {errorGetNotiSeen && <Alert severity='success' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorGetNotiSeen}</Alert>}
      {errorGetNotiSeenApi && <Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorGetNotiSeenApi}</Alert>}
      {/* <div className=' mynoti d-flex  justify-content-around   shadow-lg p-2 rounded-5'>
        <img className=' imgNoti' src={user.profilePicture} alt="" />
        <p className=' pt-2'>Lorem ipsum dolor sit amet.</p>
      </div> */}
      <br />
      {/* List of suggested friends if retrieved successfully */}
      {
        noti && noti.map((elm, i) => (
          <div key={i} className='d-flex justify-content-between align-items-center mx-auto border border-1 p-2 rounded-3 shadow-lg mb-2 w-75'>
            <NavLink className='text-decoration-none text-black' to={`${elm.navigate}`} >
              <div className=' d-flex justify-content-center align-content-center'>

                {elm.senderId.profilePicture && elm.senderId.profilePicture.startsWith('https://') ?

                  <img src={elm.senderId.profilePicture} className='profileImage me-2' alt="" /> :

                  <img src={imgUrl + elm.senderId.profilePicture} className='profileImage me-2' alt="" />


                }
                <p className=' mt-2'>{elm.title}</p>
              </div>


              {/* <span style={{ cursor: "pointer", color: "green" }} onClick={() => handleAddFriend(elm._id)}>

              < PersonAddIcon sx={{ cursor: "pointer" }} />


            </span> */}

            </NavLink>
          </div>

        ))
      }
      {loadingGetNotiSeen && <CircularProgress sx={{ marginX: "auto", display: "flex" }} />}
      <PaginationNoti />
    </div>
  )
}
