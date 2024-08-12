import React from 'react'
import { imgUrl, user } from '../../future/shareFunction/tokenJwtDecode'
import { NavLink } from 'react-router-dom'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import './account.css'
import { useSelector } from 'react-redux';
import Myfollowers from './Myfollowers';
export default function MyAccount() {
    const { isLoggedIn, userData } = useSelector((state) => state.auth);

    return (
        <>

            <div className=' container mx-auto text-center '>
                {userData && <>
                    <h4 className=' text-center  fw-bolder  '>{userData.name}</h4>
                    {userData.profilePicture.startsWith('https://') ?
                        <img src={userData.profilePicture} className='imgProfileMyAccount me-2 mb-2' alt="" /> :
                        <img src={imgUrl + userData.profilePicture} className='imgProfileMyAccount me-2' alt="" />


                    }
                </>
                }
                <div className=' d-flex justify-content-center mb-2'>
                    <NavLink className='archiveAndEdit me-4 '>View archive</NavLink>
                    <NavLink className='iconeSettingAccount me-4 ' to='/setting'>Edit Profile <ManageAccountsIcon /></NavLink>

                </div>

                <div className=' d-flex justify-content-center'>

                    <p className='archiveAndEdit  me-4    text-center '> posts 0</p>
                    <Myfollowers />
                    <p className='archiveAndEdit me-4 '> 1,507 following</p>

                </div>

                <hr className=' w-75 text-center mx-auto' />




            </div>

        </>
    )
}
