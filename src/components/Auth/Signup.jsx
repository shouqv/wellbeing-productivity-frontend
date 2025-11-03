// crediting https://git.generalassemb.ly/SDA-SEB-02-V/DRF-example/blob/main/cat-collector-frontend/src/components/Auth/Signup.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://127.0.0.1:8000/api/signup/', { username, password, email })
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('Signup failed')
    }
  }

  return (
    <form className='generic-form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <button className='global-btn' type='submit'>Sign Up</button>
    </form>
  )
}