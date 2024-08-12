import { Stack } from '@mui/material'
import React from 'react'
import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getNotiSeenPage } from '../../redux/noti/notiAction';

export default function PaginationNoti() {
    // 1. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        noti, numberOfPage
    } = useSelector((state) => state.noti); // Get auth data and errors from Redux store
    // const handlePagination = async (event, pageNumber) => {
    //     event.preventDefault();
    //     console.log(pageNumber);
    //     await dispatch(getNotiSeen({ value: '', pageNumber }));
    // };
    const handlePagination = async (event, pageNumber) => {
        // event.preventDefault();
        // console.log(pageNumber);
        await dispatch(getNotiSeenPage(pageNumber));
    };
    return (
        <>
            {noti.length > 0 && <div className='pagination my-1 d-flex justify-content-center'>
                <Stack spacing={10} >
                    <Pagination count={numberOfPage} onChange={handlePagination} shape="rounded" />
                </Stack>
            </div>}
        </>
    )
}
