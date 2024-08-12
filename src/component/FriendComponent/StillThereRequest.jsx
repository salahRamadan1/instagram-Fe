import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyRequestFriend, getMyRequsets } from '../../redux/friend/friendAction';
import { makeStateIsEmpity } from '../../redux/auth/authSlice';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, CircularProgress } from '@mui/material';
import { imgUrl } from '../../future/shareFunction/tokenJwtDecode';

export default function StillThereRequest() {
  // 1. Data Fetching and Error Handling:
  const dispatch = useDispatch();
  const { loadingMyRequests,
    errorMyRequests,
    errorMyRequestsApi,
    MyRequests,
    loadingMyRequestFriend,
    errorMyRequestFriend,
    errorMyRequestFriendApi,
  } = useSelector((state) => state.friend); // Get auth data and errors from Redux store
  /*****************************************************************************************************************************/
  // 2. State and Utility Variables:
  const [successMyRequestFriend, setSuccessMyRequestFriend] = useState(false)
  /*****************************************************************************************************************************/

  // 3. handle function accept friend
  const handleMyRequestFriend = async (id) => {
    const response = await dispatch(deleteMyRequestFriend({ id }));
    if (response.payload?.message === 'success') {
      let sasa = await dispatch(getMyRequsets());
      setSuccessMyRequestFriend(true)
      setTimeout(() => {
        setSuccessMyRequestFriend(false)
      }, 1000);
    }
  }
  /*****************************************************************************************************************************/

  useEffect(() => {

    // Dispatch an action to fetch users (likely using Redux or a similar state management library)
    dispatch(getMyRequsets());


    // Cleanup function to remove the event listener when the component unmounts
    return () => {

      dispatch(makeStateIsEmpity())
    };
  }, []);
  return (

    <div className=' container mx-auto'>
      <h6 className=' text-center'>People you sent a friend request to</h6>
      {/* Conditional rendering based on friend reject status */}
      {successMyRequestFriend && < Alert severity='success' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>rejected</Alert>}
      {errorMyRequestFriend && < Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorMyRequestFriend}</Alert>}
      {errorMyRequestFriendApi && < Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorMyRequestFriendApi}</Alert>}
      {loadingMyRequestFriend && <CircularProgress sx={{ marginX: "auto", display: "flex" }} />}
      {/* Conditional rendering based on friend retrieval status */}
      {errorMyRequests && <Alert severity='success' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorMyRequests}</Alert>}
      {errorMyRequestsApi && <Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorMyRequestsApi}</Alert>}
      {loadingMyRequests && <CircularProgress
        sx={{ marginX: "auto", display: "flex" }} />}
      {/* List of suggested friends if retrieved successfully */}
      {
        MyRequests && MyRequests.map((elm, i) => (
          <div key={i} className='d-flex justify-content-between align-items-center mx-auto border border-1 p-2 rounded-3 shadow-lg mb-2 w-75'>
            <div className=' d-flex justify-content-center align-content-center'>
              {elm.profilePicture.startsWith('https://') ?

                <img src={elm.profilePicture} className='profileImage me-2' alt="" /> :

                <img src={imgUrl + elm.profilePicture} className='profileImage me-2' alt="" />


              }
              <p className=' mt-2'>{elm.name}</p>
            </div>
            <div className=' d-flex justify-content-center'>
              <CloseIcon onClick={() => handleMyRequestFriend(elm._id)} sx={{ cursor: "pointer", color: "red" }} />
            </div>

          </div>
        ))
      }
      {loadingMyRequests && <CircularProgress sx={{ marginX: "auto", display: "flex" }} />}

    </div>

  )
}
