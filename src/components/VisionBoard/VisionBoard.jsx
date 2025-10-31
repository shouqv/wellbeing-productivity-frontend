import React from 'react'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

function VisionBoard() {
    return (
       
        // <div style={{ position: 'fixed', inset: 0 }}>
        <div style={{ width: '80vw', height: '100vh',position: 'fixed' , right: 0, top:0}}>
            <Tldraw />
        </div>
        
    )
}

export default VisionBoard
