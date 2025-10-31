// crediting https://git.generalassemb.ly/SDA-SEB-02-V/DRF-example/blob/main/cat-collector-frontend/src/components/Auth/LogOutButton.jsx
import React from 'react'
import { clearTokens } from "../../services/auth"
import { useNavigate } from 'react-router'

function LogOutButton({setUser}) {
    const navigate = useNavigate()
    function handleLogOut(){
        clearTokens()
        setUser(null)
        navigate('/login')
    }
  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default LogOutButton