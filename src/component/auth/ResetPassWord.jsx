import React, { useEffect, useState } from 'react'
import SuccessComponent from './SuccessComponent'
import image from '../../images/print-204012264.webp'
import { Alert, CircularProgress, IconButton, TextField } from '@mui/material'
import { PasswordShowAndHide } from '../../future/shareFunction/password';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validationAuth } from '../../future/validation/validation';
import { resetPassWord } from '../../redux/auth/authAction';
import { makeStateIsEmpity } from '../../redux/auth/authSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import show from '../../future/shareFunction/showAndHide';

export default function ResetPassWord() {
    // 1. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingResetPassWord,
        errorResetPassWord,
        errorResetPassWordNetWork,
        errorResetPassWordApi,
        emailUser

    } = useSelector((state) => state.auth); // Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 2. State and Utility Variables:
    const [success, setSuccess] = React.useState(false); // ResetPassWord success flag
    const [passwordsMatch, setPasswordsMatch] = useState(false); // Password match flag
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
    let { showPassword, toggle } = PasswordShowAndHide(); // Password visibility functions
    let navigate = useNavigate(); // Navigation function
    const [formUserResetPassWord, setFormUserResetPassWord] = useState({
        email: emailUser,
        password: ''
    }); // ResetPassWord form data state
    const [errorList, setErrorList] = useState([]); // Error list state
    /*****************************************************************************************************************************/

    // 3. Helper Functions:
    function handleInputChange(e) {
        setFormUserResetPassWord({ ...formUserResetPassWord, [e.target.name]: e.target.value });
    }
    /*****************************************************************************************************************************/
    // 4. Main Registration Function:
    const handleResetPassWord = async (e) => {
        e.preventDefault();

        var valid = validationAuth(formUserResetPassWord) // validation Joi
        if (valid.error)  // if error found
        {
            setErrorList(valid.error.details)
            return
        }
        else if (formUserResetPassWord.password !== confirmPassword) // check password confirm
        {
            setPasswordsMatch(true);
            return
        }

        const response = await dispatch(resetPassWord(formUserResetPassWord));

        if (response.payload?.message === 'success') {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/login');
            }, 1000);



        }
    }
    /*****************************************************************************************************************************/
    // 5. Cleanup Function (Optional):
    useEffect(() => {
        show('auth') // to show div
        if (!emailUser) navigate('/login')

        return () => dispatch(makeStateIsEmpity()); // Cleanup function (if needed)
    }, []);
    return (
        <div className=' container'>
            {/* Conditionally render SuccessComponent if `success` is true */}
            {success && <SuccessComponent />}
            <div id='auth' className=' auth  d-flex justify-content-center text-center mt-5 '>
                <div className='  w-50 border border-1 p-5 rounded-3 shadow' >
                    <img src={image} className=' imgAuth' alt="" />
                    {/* Error handling for network and Joi validation (errorResetPassWordNetWork and errorResetPassWord) */}

                    {errorResetPassWordNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorResetPassWordNetWork}</Alert>} {/* error joi api */}
                    {errorResetPassWordApi && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorResetPassWordApi}</Alert>}   {/* error joi api */}

                    <form onSubmit={handleResetPassWord}>

                        {/* Text field for password with error handling based on errorList and password visibility toggle */}

                        <TextField
                            label="Password"
                            variant="standard"

                            sx={{ width: "90%" }}
                            required
                            name="password"
                            value={formUserResetPassWord.password}
                            onChange={handleInputChange}
                            type={showPassword ? 'text' : 'password'}
                            error={!!errorList.find((elm) => elm.path[0] === 'password')} // Set error helperText if password error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'password')?.message} // Display password error message
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={toggle}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                        {/* Error handling api for specific Joi validation error errorPassword */}

                        {errorResetPassWord && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorResetPassWord}</Alert>}   {/* error joi api */}
                        <br />
                        {/* Text field for confirming password with error handling based on passwords matching */}

                        <TextField
                            id="standard-basic" label="repet password" variant="standard"
                            type={showPassword ? "text" : "password"}
                            required
                            error={passwordsMatch}
                            helperText={passwordsMatch && 'Passwords do not match'}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            sx={{ width: '90%', marginBottom: "20px" }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={toggle}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <button type='submit' className=' btnAuth btnShared' >
                            {loadingResetPassWord ? <CircularProgress /> : 'continue >>'}
                        </button>
                    </form>
                    <br />


                </div>
            </div>
        </div>
    )
}
