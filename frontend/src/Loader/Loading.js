import React from 'react'
import './style.css'
import Loader from '../components/assets/pencil.gif'

function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full">
        <img src={Loader} alt="no loader"/>
    </div>
  )
}

export default Loading
