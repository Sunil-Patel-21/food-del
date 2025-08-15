import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/frontend_assets/assets'

function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
        <p>For a better experience, download our app <br/>Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="play-store" />
            <img src={assets.app_store} alt="app-store" />
        </div>
    </div>
  )
}

export default AppDownload
