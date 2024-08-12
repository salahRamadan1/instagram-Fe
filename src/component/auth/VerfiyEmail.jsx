import * as React from 'react';
import PropTypes from 'prop-types';
import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';
import image from '../../images/print-204012264.webp'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, CircularProgress } from '@mui/material';
import { verfiy } from '../../redux/auth/authAction';
import { useNavigate } from 'react-router-dom';
import { makeStateIsEmpity } from '../../redux/auth/authSlice';
import SendNumberTovVerfiy from './SendNumberTovVerfiy';
import SuccessComponent from './SuccessComponent';
import show from '../../future/shareFunction/showAndHide';

function OTP({ separator, length, value, onChange }) {
    const inputRefs = React.useRef(new Array(length).fill(null));

    const focusInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.focus();
    };

    const selectInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.select();
    };

    const handleKeyDown = (event, currentIndex) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case ' ':
                event.preventDefault();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (currentIndex < length - 1) {
                    focusInput(currentIndex + 1);
                    selectInput(currentIndex + 1);
                }
                break;
            case 'Delete':
                event.preventDefault();
                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });

                break;
            case 'Backspace':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }

                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });
                break;

            default:
                break;
        }
    };

    const handleChange = (event, currentIndex) => {
        const currentValue = event.target.value;
        let indexToEnter = 0;

        while (indexToEnter <= currentIndex) {
            if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                indexToEnter += 1;
            } else {
                break;
            }
        }
        onChange((prev) => {
            const otpArray = prev.split('');
            const lastValue = currentValue[currentValue.length - 1];
            otpArray[indexToEnter] = lastValue;
            return otpArray.join('');
        });
        if (currentValue !== '') {
            if (currentIndex < length - 1) {
                focusInput(currentIndex + 1);
            }
        }
    };

    const handleClick = (event, currentIndex) => {
        selectInput(currentIndex);
    };

    const handlePaste = (event, currentIndex) => {
        event.preventDefault();
        const clipboardData = event.clipboardData;

        // Check if there is text data in the clipboard
        if (clipboardData.types.includes('text/plain')) {
            let pastedText = clipboardData.getData('text/plain');
            pastedText = pastedText.substring(0, length).trim();
            let indexToEnter = 0;

            while (indexToEnter <= currentIndex) {
                if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                    indexToEnter += 1;
                } else {
                    break;
                }
            }

            const otpArray = value.split('');

            for (let i = indexToEnter; i < length; i += 1) {
                const lastValue = pastedText[i - indexToEnter] ?? ' ';
                otpArray[i] = lastValue;
            }

            onChange(otpArray.join(''));
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {new Array(length).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                    <BaseInput
                        slots={{
                            input: InputElement,
                        }}
                        aria-label={`Digit ${index + 1} of OTP`}
                        slotProps={{
                            input: {
                                ref: (ele) => {
                                    inputRefs.current[index] = ele;
                                },
                                onKeyDown: (event) => handleKeyDown(event, index),
                                onChange: (event) => handleChange(event, index),
                                onClick: (event) => handleClick(event, index),
                                onPaste: (event) => handlePaste(event, index),
                                value: value[index] ?? '',
                            },
                        }}
                    />
                    {index === length - 1 ? null : separator}
                </React.Fragment>
            ))}
        </Box>
    );
}

OTP.propTypes = {
    length: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    separator: PropTypes.node,
    value: PropTypes.string.isRequired,
};
export default function VerfiyEmail() {
    // 1. Data Fetching and Error Handling:
    const { loadingVerfiy,
        errorVerfiy,
        errorVerfiyApi,
        errorVerfiyNetWork,
        emailUser
    } = useSelector((state) => state.auth)
    /*****************************************************************************************************************************/
    // 2. State and Utility Variables:
    const [success, setSuccess] = React.useState(false)// Indicates successful registration
    const [otp, setOtp] = React.useState('');// Verification code entered by user
    const [ErrorNum, setErrorNum] = React.useState(false);// Flag for invalid verification code length
    const [formverfiy, setFormverfiy] = React.useState({
        email: emailUser,
        ConfirmEmailNum: null  // Placeholder for verification code
    })
    let navigate = useNavigate(); // Navigation function
    /*****************************************************************************************************************************/


    // 3. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/

    // 4. Main Registration Function:
    const handleVerfiy = async (e) => {
        e.preventDefault();
        formverfiy.ConfirmEmailNum = otp
        if (otp.length === 4) {
            setErrorNum(false)
            const { payload } = await dispatch(verfiy(formverfiy))// Dispatch verification action
            console.log(payload);
            if (payload && payload.message == 'success') {
                setSuccess(true)// Set success state
                setTimeout(() => {
                    setSuccess(false) // Set success state
                    if (payload.confirmEmail) {
                        navigate('/resetPassWord')// Redirect to resetPassWord page if confirmEmail true
                    } else {

                        navigate('/login')// Redirect to login page page if confirmEmail false
                    }
                }, 1000);
            }
            return
        }
        setErrorNum(true) // Set flag for invalid code length
    }
    /*****************************************************************************************************************************/

    // 5. Handle user redirection if email is not available
    React.useEffect(() => {
        show('auth') // to show div

        if (!emailUser) navigate('/register')
        // Cleanup function to reset state on component unmount
        return () => {
            dispatch(makeStateIsEmpity()) // Assuming this action resets verification-related state

        }
    }, [])





    return (
        <>
            {success && <SuccessComponent />} {/*Conditionally render SuccessComponent if success is true*/}
            < div id='auth' className='auth text-center mt-5 pt-5 border border-1  w-75 mx-auto shadow-lg pb-2'>
                {/*   Image with class imgAuth and alt text */}
                <img src={image} className=' imgAuth' alt="" />
                {/* Text with email address in bold */}
                <p>please check your email <span className=' fw-bolder'>({emailUser})</span> to get digit </p>
                <form onSubmit={handleVerfiy}>
                    {/*  Error alert if errorVerfiy exists */}
                    {errorVerfiy && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{errorVerfiy}</Alert>}
                    {/*  Error alert if errorVerfiyApi exists */}

                    {errorVerfiyApi && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{errorVerfiyApi}</Alert>}
                    {/*  Error alert if errorVerfiyNetWork exists */}

                    {errorVerfiyNetWork && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{errorVerfiyNetWork}</Alert>}
                    {/*  Error alert if ErrorNum exists (must be 4 numbers) */}
                    {ErrorNum && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'> must be 4 number</Alert>}
                    <div className='mx-auto d-flex justify-content-center py-3' >
                        <br />
                        {/*  OTP component with separator, value, type, onChange handler, and length set to 4 */}
                        <OTP separator={<span>-</span>} value={otp} type='number' onChange={setOtp} length={4} />

                    </div>
                    {/* Display entered OTP value with green text */}
                    <p  >Entered value: <span className=' text-success'>{otp}</span> </p>
                    <button type='submit' className=' btnAuth btnShared w-25' >
                        {/* Button displays loading indicator if loadingVerfiy is true, otherwise displays "verfiy" text */}
                        {loadingVerfiy ? <CircularProgress /> : 'continue >>'}
                    </button>
                    {/* Presumably a component to send the verification number */}
                    <SendNumberTovVerfiy />
                    <br />
                </form>
            </div>
        </>

    )
}
const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const InputElement = styled('input')(
    ({ theme }) => `
    width: 40px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 0px;
    border-radius: 8px;
    text-align: center;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);