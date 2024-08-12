import React from 'react'
import image from '../../images/instagram-background-gradient-colors_23-2147823814.avif'
import './message.css'
export default function MainMessage() {
  return (
    <>

      <div className='d-flex justify-content-between shadow-lg p-2 container'>
        <div className=' d-flex'>
          <img src={image} className='imgListMessages me-2' alt="" />
          <div>
            <p >
              <span className=' fw-bolder'>salah ramadan</span>
              <br />
              <span>message</span>
            </p>

          </div>
        </div>
        <p className=' mt-2 ms-3'>date</p>
      </div>
    </>


  )
}
