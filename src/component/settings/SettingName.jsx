import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, CircularProgress, TextField } from '@mui/material';
import { validationAuth } from '../../future/validation/validation';
import { ChangeName } from '../../redux/auth/authAction';
import { makeStateIsEmpity } from '../../redux/auth/authSlice';
export default function SettingName() {
    // 1. State and Utility Variables:
    const [open, setOpen] = React.useState(false);
    const [errorList, setErrorList] = useState([]); // Error list state
    const [success, setSuccess] = useState(false); // Register success flag
    const [name, setName] = useState(''); // Confirm password state
    const [isValid, setIsValid] = React.useState(false);   // State for image validation (likely used for error handling or enabling actions)


    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const { userData,
        loadingChangeName,
        errorChangeNameApi,
        errorChangeNameNetWork,
        errorName } = useSelector((state) => state.auth);
    //3. Functions to open and close the modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSuccess(false);
        setName('')
        setErrorList([])
        setIsValid(false)
    };

    // 4. handle Input Change
    const handleInputChange = async (e) => {
        e.preventDefault();
        console.log(name);
        var valid = validationAuth({ name }) // validation Joi
        console.log(valid);
        if (valid.error)  // if error found
        {
            setErrorList(valid.error.details)
            return
        }
        const response = await dispatch(ChangeName({ name: name }));
        console.log(response);
        if (response.payload?.message === 'success') {
            setSuccess(true);
            setTimeout(() => {
                handleClose()
                dispatch(makeStateIsEmpity())
            }, 1000);



        }
    }
    return (
        <>
            <h5 className='mb-5'>change your Name <span className=' fw-bolder text-danger  h6'>({userData && userData.name})</span> </h5>
            {/* Text field for name with error handling based on errorList */}

            <button onClick={handleClickOpen} className=' btn btn-success mt-5'>
                change
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"change your name"}
                </DialogTitle>
                <form onSubmit={handleInputChange}>

                    <DialogContent>
                        {errorChangeNameApi && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorChangeNameApi}</Alert>} {/* error joi api */}
                        {errorChangeNameNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorChangeNameNetWork}</Alert>} {/* error joi api */}
                        {success && <Alert severity='success' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >changed</Alert>}

                        {/* Text field for name with error handling based on errorList */}
                        <TextField
                            label="name" variant="standard"
                            sx={{ width: "90%", marginX: 'auto', display: "flex" }}
                            required
                            name="name"
                            // value={formUserRegister.name}
                            onChange={(e) => { setName(e.target.value); setIsValid(true); }}
                            error={!!errorList.find((elm) => elm.path[0] === 'name')} // Set error helperText if name error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'name')?.message} // Display name error message
                        />
                        {/* Error handling api for specific Joi validation error errorName */}
                        {errorName && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorName}</Alert>} {/*error joi api*/}
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!isValid} sx={{ color: "green" }} type='submit'>

                            {loadingChangeName ? <CircularProgress /> : 'Change'}

                        </Button>
                        <Button onClick={handleClose} autoFocus sx={{ color: "red" }}>
                            close
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}
