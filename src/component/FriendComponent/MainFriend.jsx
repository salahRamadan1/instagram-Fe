import React from 'react'
import AllFreind from './AllFreind'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

import { Link, NavLink, Outlet } from 'react-router-dom';
export default function MainFriend() {

    return (
        <div className='mainFriend'>

            <ul className=' d-flex justify-content-center'>
                <li>
                    <NavLink to={'allfriend' || '/mainFriend'} className={({ isActive }) => isActive ? "link-active" : "link-inactive"}>
                        add Friend
                    </NavLink>
                </li>
                <li>
                    <NavLink to='requestfriend' className={({ isActive }) => isActive ? "link-active" : "link-inactive"} >
                        request friend
                    </NavLink>
                </li>
                <li>
                    <NavLink to='stillThereRequest' className={({ isActive }) => isActive ? "link-active" : "link-inactive"} >
                        my Requests
                    </NavLink>
                </li>
            </ul>


            <Outlet />
        </div>
    )
}
