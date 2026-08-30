"use client"
import React from 'react'
import {Tldraw} from "tldraw"
import "tldraw/tldraw.css"
const KivoCanvas = () => {
  return (
    <div className='h-full min-h-150 w-full'>
      <Tldraw persistenceKey='kivo-canvas'/>
    </div>
  )
}

export default KivoCanvas
