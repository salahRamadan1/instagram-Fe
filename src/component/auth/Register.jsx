import React, { useState, } from 'react'
import image from '../../images/print-204012264.webp'
import { Alert, CircularProgress, TextField } from '@mui/material'
import './auth.css'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PasswordShowAndHide } from '../../future/shareFunction/password';
import { NavLink, useNavigate } from 'react-router-dom';
import { validationAuth } from '../../future/validation/validation';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/authAction';
import { makeStateIsEmpity } from '../../redux/auth/authSlice';
import SuccessComponent from './SuccessComponent';
import show from '../../future/shareFunction/showAndHide';
import GoogleLogIn from './GoogleLogIn';

export default function Register() {
    // 1. State and Utility Variables:
    const [success, setSuccess] = React.useState(false); // Register success flag
    const [passwordsMatch, setPasswordsMatch] = useState(false); // Password match flag
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
    let { showPassword, toggle } = PasswordShowAndHide(); // Password visibility functions
    let navigate = useNavigate(); // Navigation function
    const [formUserRegister, setFormUserRegister] = useState({
        name: "",
        email: '',
        password: ''
    }); // Register form data state
    const [errorList, setErrorList] = useState([]); // Error list state
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingRegister,
        errorRegister,
        errorRegisterNetWork,
        errorPassword,
        errorName,
        errorEmail,
    } = useSelector((state) => state.auth); // Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 3. Helper Functions:
    function handleInputChange(e) {
        setFormUserRegister({ ...formUserRegister, [e.target.name]: e.target.value });
    }
    /*****************************************************************************************************************************/
    // 4. Main Registration Function:
    const handleRegister = async (e) => {
        e.preventDefault();
        var valid = validationAuth(formUserRegister) // validation Joi
        if (valid.error)  // if error found
        {
            setErrorList(valid.error.details)
            return
        }
        else if (formUserRegister.password !== confirmPassword) // check password confirm
        {
            setPasswordsMatch(true);
            return
        }

        const response = await dispatch(registerUser(formUserRegister));
        if (response.payload?.message === 'Registration successful') {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/verifyEmail');
            }, 1000);



        }
    }
    /*****************************************************************************************************************************/
    // 5. Cleanup Function (Optional):
    React.useEffect(() => {
        show('auth') // to show div

        return () => dispatch(makeStateIsEmpity()); // Cleanup function (if needed)
    }, []);
    return (
        <div className=' container'>
            {/* Conditionally render SuccessComponent if `success` is true */}
            {success && <SuccessComponent />}
            <div id='auth' className=' auth  d-flex justify-content-center text-center mt-5 '>
                <div className='  w-50 border border-1 p-5 rounded-3 shadow' >
                    <img src={image} className=' imgAuth' alt="" />
                    {/* Error handling for network and Joi validation (errorRegisterNetWork and errorRegister) */}

                    {errorRegisterNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorRegisterNetWork}</Alert>} {/* error joi api */}
                    {errorRegister && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorRegister}</Alert>} {/* error joi api */}

                    <form onSubmit={handleRegister}>
                        {/* Text field for name with error handling based on errorList */}

                        <TextField
                            label="name" variant="standard"
                            sx={{ width: "90%", }}
                            required
                            name="name"
                            value={formUserRegister.name}
                            onChange={handleInputChange}
                            error={!!errorList.find((elm) => elm.path[0] === 'name')} // Set error helperText if name error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'name')?.message} // Display name error message
                        />
                        {/* Error handling api for specific Joi validation error errorName */}
                        {errorName && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorName}</Alert>} {/* error joi api */}
                        {/* Text field for email with error handling based on errorList */}

                        <TextField
                            label="Email" variant="standard"
                            sx={{ width: "90%" }}
                            required
                            name="email"
                            value={formUserRegister.email}
                            onChange={handleInputChange}
                            error={!!errorList.find((elm) => elm.path[0] === 'email')} // Set error helperText if email error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'email')?.message} // Display email error message
                        />
                        {/* Error handling api for specific Joi validation error errorEmail */}
                        {errorEmail && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorEmail}</Alert>} {/* error joi api */}
                        <br />
                        {/* Text field for password with error handling based on errorList and password visibility toggle */}

                        <TextField
                            label="Password"
                            variant="standard"

                            sx={{ width: "90%" }}
                            required
                            name="password"
                            value={formUserRegister.password}
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

                        {errorPassword && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorPassword}</Alert>} {/* error joi api */}
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
                            {loadingRegister ? <CircularProgress /> : 'register'}
                        </button>
                        <GoogleLogIn />
                    </form>
                    <br />

                    <NavLink to='/login' className='CreateEmail btnShared'>already i have an account</NavLink>
                </div>
            </div>
        </div>
    )
}
