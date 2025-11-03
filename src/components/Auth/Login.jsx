// crediting https://git.generalassemb.ly/SDA-SEB-02-V/DRF-example/blob/main/cat-collector-frontend/src/components/Auth/Login.jsx
import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../services/auth"
import { useNavigate } from "react-router"

export default function Login({ setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", { username, password })
      saveTokens(res.data.access, res.data.refresh)
      setUser(getUserFromToken())
      navigate("/dashboard")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className='global-btn' type="submit">Login</button>
    </form>
  )
}