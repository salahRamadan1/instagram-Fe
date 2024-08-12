import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import image from '../../images/print-204012264.webp'

export default function SuccessComponent() {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Alert severity='success' sx={{ width: "70%", margin: "auto" }} >  Success</Alert>
                    <CheckCircleOutlineIcon sx={{ fontSize: "400px", margin: "auto", color: "green" }} />
                </DialogTitle>
                <img src={image} className=' imgAuth  mx-auto' alt="" />
                <DialogContent>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    )
}
