import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../services/auth"
import { useNavigate } from "react-router"
import '../../styles/HomePage.css'

// crediting https://git.generalassemb.ly/SDA-SEB-02-V/DRF-example/blob/main/cat-collector-frontend/src/components/Auth/Login.jsx
export default function Login({ setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", { username, password })
      saveTokens(res.data.access, res.data.refresh)
      setUser(getUserFromToken())
      navigate("/dashboard")
    } catch (err) {
      console.error(err)
      console.log(err)
      setMessage(err.response.data.detail || `${err.response.data.password? `${ err.response.data.password }(password)`: '' }` || `${err.response.data.username} (username)` )
    }
  }

  return (
    <div className='big-homepage-full-container'>
      <div className='user-auth-page'>
        <form className="generic-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input placeholder="Username" value={username} onChange={e => {
            setUsername(e.target.value)
            setMessage('')
          }} />
          <input type="password" placeholder="Password" value={password} onChange={e => {
            setPassword(e.target.value)
            setMessage('')
          }} />
          {message ? <p className='text-red-400 w-50'>{message}</p> : ''}
          <button className='global-btn' type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}