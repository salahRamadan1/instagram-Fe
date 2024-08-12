import React from 'react'
import image from '../../images/print-204012264.webp'
import "./footer.css"
export default function Footer() {
    return (
        <div className=' fixed-bottom d-flex justify-content-center  '>

            <hr className=' text-black  ' />

            <img src={image} className=' imgAuth' alt="" />


        </div>
    )
}
