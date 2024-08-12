import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStateIsEmpity } from '../../redux/friend/friendSlice';
import { acceptFriend, getRequsets, rejectFriend } from '../../redux/friend/friendAction';
import { Alert, CircularProgress } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { imgUrl } from '../../future/shareFunction/tokenJwtDecode';
export default function RequestFreind() {
  // 1. Data Fetching and Error Handling:
  const dispatch = useDispatch();
  const { loadingRequests,
    errorRequests,
    errorRequestsApi,
    requests,
    loadingAcceptFriend,
    errorAcceptFriend,
    errorAcceptFriendApi,
    loadingRejectFriend,
    errorRejectFriend,
    errorRejectFriendApi,
  } = useSelector((state) => state.friend); // Get auth data and errors from Redux store
  /*****************************************************************************************************************************/
  // 2. State and Utility Variables:
  const [successAddFriend, setSuccessAddFriend] = useState(false)
  const [successRejectFriend, setSuccessRejectFriend] = useState(false)
  /*****************************************************************************************************************************/
  // 3. handle function accept friend
  const handleAcceptFriend = async (id) => {
    const response = await dispatch(acceptFriend({ id }));
    if (response.payload?.message === 'success') {
      let sasa = await dispatch(getRequsets());

      setSuccessAddFriend(true)
      setTimeout(() => {
        setSuccessAddFriend(false)
      }, 1000);
    }
  }
  /*****************************************************************************************************************************/

  // 3. handle function reject friend
  const handleRejectFriend = async (id) => {
    const response = await dispatch(rejectFriend({ id }));
    if (response.payload?.message === 'success') {
      let sasa = await dispatch(getRequsets());

      setSuccessRejectFriend(true)
      setTimeout(() => {
        setSuccessRejectFriend(false)
      }, 1000);
    }
  }
  // 4. handle function reject Friend  
  useEffect(() => {

    // Dispatch an action to fetch users (likely using Redux or a similar state management library)
    dispatch(getRequsets());


    // Cleanup function to remove the event listener when the component unmounts
    return () => {

      dispatch(makeStateIsEmpity())
    };
  }, []);
  return (
    <div className=' container mx-auto'>
      <h6 className=' text-center'>People who sent you a friend request</h6>
      {/* Conditional rendering based on friend reject status */}
      {successRejectFriend && < Alert severity='success' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>rejected</Alert>}
      {errorRejectFriend && < Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorRejectFriend}</Alert>}
      {errorRejectFriendApi && < Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorRejectFriendApi}</Alert>}
      {loadingRejectFriend && <CircularProgress sx={{ marginX: "auto", display: "flex" }} />}
      {/* Conditional rendering based on friend accept status */}
      {successAddFriend && < Alert severity='success' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>Become your friend</Alert>}
      {errorAcceptFriend && < Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorAcceptFriend}</Alert>}
      {errorAcceptFriendApi && < Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorAcceptFriendApi}</Alert>}
      {loadingAcceptFriend && <CircularProgress sx={{ marginX: "auto", display: "flex" }} />}
      {/* Conditional rendering based on friend retrieval status */}
      {errorRequests && <Alert severity='success' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorRequests}</Alert>}
      {errorRequestsApi && <Alert severity='error' sx={{ width: "50%", marginX: "auto", marginBottom: "20px" }}>{errorRequestsApi}</Alert>}
      {loadingRequests && <CircularProgress sx={{ marginX: "auto", display: "flex" }} />}
      {
        requests && requests.map((elm, i) => (
          <div key={i} className='d-flex justify-content-between align-items-center mx-auto border border-1 p-2 rounded-3 shadow-lg mb-2 w-75'>
            <div className=' d-flex justify-content-center align-content-center'>

              {elm.profilePicture.startsWith('https://') ?

                <img src={elm.profilePicture} className='profileImage me-2' alt="" /> :

                <img src={imgUrl + elm.profilePicture} className='profileImage me-2' alt="" />


              }
              <p className=' mt-2'>{elm.name}</p>
            </div>

            <div className=' d-flex justify-content-center'>
              <DoneIcon onClick={() => handleAcceptFriend(elm._id)} sx={{ cursor: "pointer", color: "green", marginInlineEnd: "10px" }} />
              <CloseIcon onClick={() => handleRejectFriend(elm._id)} sx={{ cursor: "pointer", color: "red" }} />
            </div>

          </div>
        ))
      }
    </div>
  )
}
