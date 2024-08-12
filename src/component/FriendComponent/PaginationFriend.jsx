import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsersPage } from '../../redux/friend/friendAction';
import { Pagination, Stack } from '@mui/material';

export default function PaginationFriend() {
        // 1. Data Fetching and Error Handling:
        const dispatch = useDispatch();
        const {
            users, numberOfPage
        } = useSelector((state) => state.friend); // Get auth data and errors from Redux store
        // const handlePagination = async (event, pageNumber) => {
        //     event.preventDefault();
        //     console.log(pageNumber);
        //     await dispatch(getNotiSeen({ value: '', pageNumber }));
        // };
        const handlePagination = async (event, pageNumber) => {
            // event.preventDefault();
            // console.log(pageNumber);
         await    dispatch(getUsersPage(pageNumber));
        };
    return (
        <>
            {users && <div className='pagination my-1 d-flex justify-content-center'>
                <Stack spacing={10} >
                    <Pagination count={numberOfPage} onChange={handlePagination} shape="rounded" />
                </Stack>
            </div>}
        </>
    )
}
