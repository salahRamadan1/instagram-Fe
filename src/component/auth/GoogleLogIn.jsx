import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { googleLogIn } from '../../redux/auth/authAction';
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function GoogleLogIn() {
    // 1. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingGoogleLogIn,
        errorGoogleLogIn,
        errorGoogleLogInNetWork,
    } = useSelector((state) => state.auth);
    /*****************************************************************************************************************************/
    let navigate = useNavigate();// Navigation function
    /*****************************************************************************************************************************/
    // 4. Main Google Function:
    const handleSuccess = async (response) => {
        // Extract the credential from the Google sign-in response
        const { credential } = response;
        // Dispatch a Redux action to perform Google login with the credential
        const responseFromApi = await dispatch(googleLogIn({ credential }))
        // Check if the login was successful
        if (responseFromApi.payload?.message === 'success') {
            // Navigate to the main home page if login successful
            navigate('/mainHome');
        }
    };
    return (
        <div className=' text-center mx-auto d-flex justify-content-center mt-2'>
            {loadingGoogleLogIn ? <CircularProgress /> : <GoogleLogin onSuccess={handleSuccess} />}
            <br />
            <br />
            
           
        </div>

    )
}
