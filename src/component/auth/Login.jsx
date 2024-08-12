import React, { useState, } from 'react'
import image from '../../images/print-204012264.webp'
import { Alert, CircularProgress, TextField } from '@mui/material'
import './auth.css'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PasswordShowAndHide } from '../../future/shareFunction/password';
import { NavLink, useNavigate } from 'react-router-dom';
import show from '../../future/shareFunction/showAndHide';
import { logIn, makeStateIsEmpity } from '../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { validationAuth } from '../../future/validation/validation';
import { logInUser } from '../../redux/auth/authAction';
import SuccessComponent from './SuccessComponent';
import GoogleLogIn from './GoogleLogIn';


export default function Login() {
    // 1. State and Utility Variables:
    let { showPassword, toggle } = PasswordShowAndHide(); // Password visibility functions
    let navigate = useNavigate(); // Navigation function
    const [formUserLogIn, setFormUserLogIn] = useState({
        email: '',
        password: ''
    }); // LogIn form data state
    const [errorList, setErrorList] = useState([]); // Error list state
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingLogIn,
        errorLogIn,
        errorLogInNetWork,
        errorLogInPassword,
        errorLogInEmail,
    } = useSelector((state) => state.auth); // Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 3. Helper Functions:
    function handleInputChange(e) {
        setFormUserLogIn({ ...formUserLogIn, [e.target.name]: e.target.value });
    }
    /*****************************************************************************************************************************/
    // 4. Main Registration Function:
    const handleLogIn = async (e) => {
        e.preventDefault();
        var valid = validationAuth(formUserLogIn) // validation Joi
        if (valid.error)  // if error found
        {
            console.log(valid);
            setErrorList(valid.error.details)
            return
        }

        const response = await dispatch(logInUser(formUserLogIn));

        if (response.payload?.message === 'success') {

            setErrorList([])

            navigate('/mainHome');

        }
    }
    /*****************************************************************************************************************************/
    // 5. Cleanup Function (Optional):
    React.useEffect(() => {
        // show('auth') // to show div
        if (localStorage.getItem('userToken')) {
            navigate('/mainHome')
        }
        return () => dispatch(makeStateIsEmpity()); // Cleanup function (if needed)
    }, []);




    return (

        <div className=' container'>
            {/* Conditionally render SuccessComponent if `success` is true */}

            <div id='auth' className=' auth  d-flex justify-content-center text-center mt-5 '>
                <div className='  w-50 border border-1 p-5 rounded-3 shadow' >
                    <img src={image} className=' imgAuth' alt="" />
                    {/* Error handling for network and Joi validation (errorLogInNetWork and errorLogIn) */}

                    {errorLogInNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorLogInNetWork}</Alert>} {/* error joi api */}
                    {errorLogIn && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorLogIn}</Alert>} {/* error joi api */}

                    <form onSubmit={handleLogIn}>

                        {/* Text field for email with error handling based on errorList */}
                        <TextField
                            label="Email" variant="standard"
                            sx={{ width: "90%" }}
                            required
                            name="email"
                            value={formUserLogIn.email}
                            onChange={handleInputChange}
                            error={!!errorList.find((elm) => elm.path[0] === 'email')} // Set error helperText if email error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'email')?.message} // Display email error message
                        />
                        {/* Error handling api for specific Joi validation error errorEmail */}

                        {errorLogInEmail && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorLogInEmail}</Alert>} {/* error joi api */}

                        <br />
                        {/* Text field for password with error handling based on errorList and password visibility toggle */}

                        <TextField
                            label="Password"
                            variant="standard"
                            sx={{ width: "90%" }}
                            required
                            name="password"
                            value={formUserLogIn.password}
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

                        {errorLogInPassword && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorLogInPassword}</Alert>} {/* error joi api */}

                        <br />

                        <button type='submit' className=' btnAuth btnShared' >
                            {loadingLogIn ? <CircularProgress /> : 'LogIn'}
                        </button>
                        <GoogleLogIn />
                        <br />
                        <NavLink to='/checkEmail'  > Forgotten password?</NavLink>
                    </form>
                    <hr />
                    <NavLink to='/register' className='CreateEmail btnShared'> Create an account</NavLink>
                </div>

            </div>
        </div>

    )
}
