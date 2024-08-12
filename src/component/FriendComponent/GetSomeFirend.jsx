import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './friend.css'
import { NavLink } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import { getFriends } from '../../redux/friend/friendAction';
export default function GetSomeFirend() {
    const { isLoggedIn, userData } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.friend);

    const dispatch = useDispatch();

    const handle = async () => {
        // dispatch(getUsers)
    };
    useEffect(() => {
        // handle()
    }, []);
    return (
        <div className=' container friend   p-3 rounded-5'>

            {/* info form me */}
            <div className=' me'>
                {userData && <div className=' d-flex '>
                    <img className=' profileImage me-2' src={userData.profilePicture} alt="" />
                    <div>
                        <p>
                            {userData.name}
                            <br />
                            {userData.email}
                        </p>
                    </div>
                </div>
                }
            </div>

            <hr />
            <div className=' d-flex  justify-content-between'>
                <p className=' me-5'>Suggested for you
                </p>
                <NavLink to='/allFreind' className='text-decoration-none'>see all</NavLink>
            </div>
            {/* get friends */}
            {users.user && (
                <ul className="user-list">
                    {users.user.map((user, index) => (
                        <li key={user.id || index} className="user-item d-flex align-items-end me">
                            <div className="d-flex me-5">
                                <div className="image-and-title">
                                    <img
                                        className="profileImage me-2"
                                        src={user.profileImage || "default-profile-image.png"} // Handle missing image
                                        alt={user.name}
                                    />
                                    <div className="float-end">
                                        <p>
                                            {user.name}
                                            <br />
                                            Instagram recommended
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-primary follow-button" style={{ cursor: "pointer" }}>
                                Follow
                            </p>
                        </li>
                    ))}

                </ul>
            )}
        </div>
    )
}
