import React, { useEffect } from 'react'
import "./onboarding.css"
import { useNavigate } from 'react-router-dom'
export default function OnBoarding() {
  const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('firstTime', true)
        setTimeout(() => {
            navigate('/login')

        }, 2000);
    }, [])

    return (
        <div className="instagram">
            <div className="logo">
                <div className="logo_border"></div>
                <div className="logo_circle"></div>
                <div className="logo_light"></div>
            </div>
        </div>

    )
}
