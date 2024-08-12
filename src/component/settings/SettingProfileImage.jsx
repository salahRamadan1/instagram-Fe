import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { readFileAsImage } from '../../future/shareFunction/functionFileReader';
import { imgUrl } from '../../future/shareFunction/tokenJwtDecode';
import { changeProfileImage } from '../../redux/auth/authAction';
import { logIn, makeStateIsEmpity } from '../../redux/auth/authSlice';
import { Alert, CircularProgress } from '@mui/material';

export default function SettingProfileImage() {
    // 1. State and Utility Variables:
    const [open, setOpen] = React.useState(false);// State for modal visibility

    const [isValid, setIsValid] = React.useState(false);   // State for image validation (likely used for error handling or enabling actions)

    const [image, setImage] = React.useState(null);  // State for the selected image file

    const [imageUrl, setImageUrl] = React.useState(null);  // State for the displayed image URL

    const [success, setSuccess] = React.useState(false);  // State for the displayed success
    /*****************************************************************************************************************************/

    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const { userData,
        loadingProfileImage,
        errorProfileImageApi,
        errorProfileImageNetWork, } = useSelector((state) => state.auth);
    /*****************************************************************************************************************************/

    //3. Functions to open and close the modal
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        // Reset image and URL state when closing (assuming desired behavior)
        setImageUrl(false)
        setImage(false)
    };
    /*****************************************************************************************************************************/
    //4. Function to handle image file selection
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        setIsValid(true);
        readFileAsImage(event.target.files[0], (imageUrl) => {
            setImageUrl(imageUrl);
        });
    };
    //5. Function handle change image by reduxt api 
    const handleChangeImage = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('profileImage', image)
        const respose = await dispatch(changeProfileImage(formData))
        console.log(respose);
        if (respose.payload?.message === 'success') {
            setSuccess(true)
            dispatch(logIn())
            setTimeout(() => {
                setSuccess(false)
                handleClose()
                dispatch(makeStateIsEmpity())
            }, 1000);
        }
    }
    return (
        <div  >
            {userData && <>
                {userData.profilePicture.startsWith('https://') ?

                    <img src={userData.profilePicture} className='imageStatic me-2' alt="" /> :

                    <img src={imgUrl + userData.profilePicture} className='imageStatic me-2' alt="" />


                }


                <br />
                <button className=' btn btn-success mt-2  ' onClick={handleClickOpen}>change</button>

            </>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
                    {"Change profile image"}
                </DialogTitle>
                <form onSubmit={handleChangeImage}>


                    {errorProfileImageApi && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorProfileImageApi}</Alert>} {/* error joi api */}
                    {errorProfileImageNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorProfileImageNetWork}</Alert>} {/* error joi api */}
                    {success && <Alert severity='success' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >changed</Alert>}
                    <label htmlFor="image" className=' btn btn-success w-50 mx-auto d-flex justify-content-center  '> choose Image</label>
                    <input onChange={handleImageChange} id='image' type="file" className=' d-none' />

                    {imageUrl && <img src={imageUrl} alt="" className='imageStatic  mx-auto d-flex' />}



                    <DialogActions>
                        <Button type='submit' disabled={!isValid} onClick={handleChangeImage} sx={{ color: "green" }}>
                            {loadingProfileImage ? <CircularProgress /> : 'Change'}


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
