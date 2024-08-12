import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, CircularProgress } from '@mui/material';
import image from '../../images/instagram-background-gradient-colors_23-2147823814.avif'
import DeleteIcon from '@mui/icons-material/Delete';
import { getMyFriends } from '../../redux/friend/friendAction';
import { makeStateIsEmpity } from '../../redux/friend/friendSlice';
import PaginationMyFollowers from './PaginationMyFollowers';
import SearchMyFollowers from './SearchMyFollowers';
export default function Myfollowers() {
    // 1. State and Utility Variables:
    const [open, setOpen] = React.useState(false);
    //2. Functions to open and close the modal
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        dispatch(makeStateIsEmpity())
    };
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const { loadingMyFriend,
        errorMyFriend,
        errorMyFriendApi,
        myFriends } = useSelector((state) => state.friend);
    //3. handle my friends
    const geyMyfriendsU = async () => {
        await dispatch(getMyFriends());
    }
    useEffect(() => {
        geyMyfriendsU()

    }, [])

    return (<>
        <p className='archiveAndEdit me-4 ' style={{ cursor: 'pointer' }} onClick={handleClickOpen}>{myFriends.myFriends && myFriends.myFriends[0].friends.length} followers     </p>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle sx={{ marginX: "auto" }}> my followers</DialogTitle>
            {errorMyFriendApi && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorMyFriendApi}</Alert>} {/* error joi api */}
            {loadingMyFriend && <CircularProgress sx={{ marginX: "auto" }} />}
            <SearchMyFollowers />

            <div className=' container  pe-5 '>
                {myFriends.myFriends && myFriends.myFriends[0].friends.map((elm, i) => (
                    <div key={i} >
                        <div className=' ms-5 d-flex justify-content-between'>
                            <div className=' d-flex'>
                                <img src={elm.profilePicture} className='imageMyFriends' alt="" />
                                <p className=' mt-2 mx-2'>{elm.name}</p>
                            </div>
                            <DeleteIcon sx={{ color: 'red', cursor: "pointer", marginTop: "5px", }} />
                        </div>
                    </div>
                ))
                }
            {errorMyFriend && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorMyFriend}</Alert>} {/* error joi api */}

            </div>
            <PaginationMyFollowers />

            <Button onClick={handleClose}>Close</Button>


        </Dialog >
    </>
    )
}
