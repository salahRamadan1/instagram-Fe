import React from 'react'
import SettingProfileImage from './SettingProfileImage'
import './setting.css'
import SettingName from './SettingName'
import SettingPassword from './SettingPassword'
export default function Setting() {
  return (
    <div className=' container text-center'>
      <div className=' row g-3 align-items-end '>

        <div className=' col-md-4'>
          <SettingName />
          <hr className=' w-75 text-center mx-auto' />


        </div>
        <div className=' col-md-4'>
          <SettingPassword />
          <hr className=' w-75 text-center mx-auto' />


        </div>
        <div className=' col-md-4  '>
          <SettingProfileImage />
          <hr className=' w-75 text-center mx-auto' />
        </div>
      </div>
    </div>
  )
}
