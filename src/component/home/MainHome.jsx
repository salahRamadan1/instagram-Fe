import React, { useEffect, useState } from 'react'
import LeftBar from '../LeftBar/LeftBar'
import Story from './StoryComponents/Story'
import Post from './PostComponent/Post'
import { socket } from '../../future/shareFunction/socket'
import { user } from '../../future/shareFunction/tokenJwtDecode'




export default function MainHome() {


    useEffect(() => {
    }, [])


    return (
        <div className=' container d-flex  justify-content-evenly'>

            {/* <LeftBar /> */}
            <div >

                <Story />
                <Post />
            </div>
            <div className=' ms-5'>
                {/* <GetSomeFirend /> */}
            </div>
        </div>
    )
}
