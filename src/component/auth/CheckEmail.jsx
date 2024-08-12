import { Alert, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import image from '../../images/print-204012264.webp'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SendNumberverfiy } from '../../redux/auth/authAction'
import { makeStateIsEmpity } from '../../redux/auth/authSlice'
import { validationAuth } from '../../future/validation/validation'
import show from '../../future/shareFunction/showAndHide';

export default function CheckEmail() {
    // 1. State and Utility Variables:
    const [email, setEmail] = useState(''); // LogIn email flag
    const [errorList, setErrorList] = useState([]); // Error list state
    let navigate = useNavigate(); // Navigation function
/*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const {
        errorSendNumberverfiy,
        errorSendNumberverfiyApi,
        errorSendNumberverfiyNetWork,
        loadingSendNumberverfiy
    } = useSelector((state) => state.auth)
    /*****************************************************************************************************************************/

    // 3. Define dispatch function (assuming it's from a Redux store)
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/

    // 4. Handle sending verification code (click handler)
    const handleClick = async (e) => {
        e.preventDefault();

        var valid = validationAuth({ email: email }) // validation Joi
        console.log(valid);
        if (valid.error)  // if error found
        {
            setErrorList(valid.error.details)
            return
        }
        const response = await dispatch(SendNumberverfiy({ email: email }))

        if (response.payload?.message === 'success') {
            setErrorList([])
            navigate('/verifyEmail')

        }
    };
    React.useEffect(() => {
        show('auth') // to show div
        return () => dispatch(makeStateIsEmpity()); // Cleanup function (if needed)
    }, []);

    return (

        <div className=' container'>
            <div id='auth' className=' auth  d-flex justify-content-center text-center mt-5 '>
                <div className='  w-50 border border-1 p-5 rounded-3 shadow' >
                    <img src={image} className=' imgAuth' alt="" />
                    <form onSubmit={handleClick}>
                        {/* Conditional rendering of error messages based on specific error states:
                        - If `errorSendNumberverfiy` exists, display an Alert with "error" severity and the error message
                        - Repeat for `errorSendNumberverfiyApi` and `errorSendNumberverfiyNetWork` as well */}

                        {errorSendNumberverfiy && <Alert sx={{ width: "100%", marginX: "auto" }} severity='error'>{errorSendNumberverfiy}</Alert>}
                        {errorSendNumberverfiyApi && <Alert sx={{ width: "100%", marginX: "auto" }} severity='error'>{errorSendNumberverfiyApi}</Alert>}
                        {errorSendNumberverfiyNetWork && <Alert sx={{ width: "100%", marginX: "auto" }} severity='error'>{errorSendNumberverfiyNetWork}</Alert>}

                        <TextField
                            label="Email" variant="standard"
                            sx={{ width: "90%", borderRadius: "10px" }}
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errorList.find((elm) => elm.path[0] === 'email')} // Set error helperText if email error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'email')?.message} // Display email error message
                        />

                        <button type='submit' className=' btnAuth btnShared' >

                            {loadingSendNumberverfiy ? <CircularProgress /> : 'continue >>'}
                        </button>
                    </form>

                    <hr />
                    <NavLink to='/login'  >Back</NavLink>
                </div>
            </div>
        </div>

    )
}
