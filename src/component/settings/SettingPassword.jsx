import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, CircularProgress, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { PasswordShowAndHide } from '../../future/shareFunction/password';
import { useNavigate } from 'react-router-dom';
import { validationAuth } from '../../future/validation/validation';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePassword } from '../../redux/auth/authAction';
import { makeStateIsEmpity } from '../../redux/auth/authSlice';
export default function SettingPassword() {
  // 1. State and Utility Variables:
  let { showPassword, toggle } = PasswordShowAndHide(); // Password visibility functions
  const [open, setOpen] = React.useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false); // Password match flag
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
  const [success, setSuccess] = React.useState(false); // Register success flag
  let navigate = useNavigate(); // Navigation function
  const [formUserChangePassWord, setFormUserChangePassWord] = useState({
    currentPassword: '',
    newPassword: ''
  }); // ChangePassWord form data state
  const [errorList, setErrorList] = useState([]); // Error list state
  /*****************************************************************************************************************************/

  // 2. Helper Functions:
  function handleInputChange(e) {
    setFormUserChangePassWord({ ...formUserChangePassWord, [e.target.name]: e.target.value });
  }
  /*****************************************************************************************************************************/

  // 3. Data Fetching and Error Handling:
  const dispatch = useDispatch();
  const {
    loadingChangePassword,
    errorChangePasswordApi,
    errorChangePasswordNetWork,
    errorCurrentPasswordChange,
    errorNewPasswordChange,
  } = useSelector((state) => state.auth); // Get auth data and errors from Redux store
  /*****************************************************************************************************************************/
  // 4. Main Registration Function:
  const handleResetPassWord = async (e) => {
    e.preventDefault();

    var valid = validationAuth(formUserChangePassWord) // validation Joi
    console.log(valid);
    if (valid.error)  // if error found
    {
      setErrorList(valid.error.details)
      return
    }
    else if (formUserChangePassWord.newPassword !== confirmPassword) // check password confirm
    {
      setPasswordsMatch(true);
      return
    }

    const response = await dispatch(ChangePassword(formUserChangePassWord));

    if (response.payload?.message === 'success') {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleClose()
        dispatch(makeStateIsEmpity())
      }, 1000);

    }
  }
  /*****************************************************************************************************************************/
  //5. Functions to open and close the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorList([])
    setPasswordsMatch(false)
    formUserChangePassWord.currentPassword = '';
    formUserChangePassWord.newPassword = '';
    setConfirmPassword('')
  };
  return (
    <div>
      <h5 className='mb-5'>change your password</h5>
      <button className=' btn btn-success mt-5  ' onClick={handleClickOpen}>change</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"change your password"}
        </DialogTitle>
        <form onSubmit={handleResetPassWord}>
          {success && <Alert severity='success' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >changed</Alert>}
          {/* Text field for password with error handling based on errorList and password visibility toggle */}

          <TextField
            label="current Password"
            variant="standard"
            sx={{ width: "90%", display: 'flex', marginX: "auto" }}
            required
            name="currentPassword"
            value={formUserChangePassWord.currentPassword}
            onChange={handleInputChange}
            type={showPassword ? 'text' : 'password'}
            error={!!errorList.find((elm) => elm.path[0] === 'currentPassword')} // Set error helperText if password error exists
            helperText={errorList.find((elm) => elm.path[0] === 'currentPassword')?.message} // Display password error message
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
          {errorCurrentPasswordChange && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorCurrentPasswordChange}</Alert>} {/*error joi api*/}
          {/* Error handling api */}
          {errorChangePasswordApi && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorChangePasswordApi}</Alert>} {/*error joi api*/}
          {errorChangePasswordNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorChangePasswordNetWork}</Alert>} {/*error joi api*/}

          {/* Text field for password with error handling based on errorList and password visibility toggle */}

          <TextField
            label="new Password"
            variant="standard"
            sx={{ width: "90%", display: 'flex', marginX: "auto" }}
            required
            name="newPassword"
            value={formUserChangePassWord.newPassword}
            onChange={handleInputChange}
            type={showPassword ? 'text' : 'password'}
            error={!!errorList.find((elm) => elm.path[0] === 'newPassword')} // Set error helperText if password error exists
            helperText={errorList.find((elm) => elm.path[0] === 'newPassword')?.message} // Display password error message
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

          {errorNewPasswordChange && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorNewPasswordChange}</Alert>} {/*error joi api*/}

          {/* Text field for confirming password with error handling based on passwords matching */}
          <TextField
            id="standard-basic" label="repet new Password" variant="standard"
            type={showPassword ? "text" : "password"}
            required
            error={passwordsMatch}
            helperText={passwordsMatch && 'Passwords do not match'}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            sx={{ width: '90%', display: 'flex', marginX: "auto" }}
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

          <DialogActions>
            <Button sx={{ color: "green" }} type='submit'>
              {loadingChangePassword ? <CircularProgress /> : 'Change'}

            </Button>
            <Button onClick={handleClose} autoFocus sx={{ color: "red" }}>
              close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
