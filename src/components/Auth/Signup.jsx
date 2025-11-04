// crediting https://git.generalassemb.ly/SDA-SEB-02-V/DRF-example/blob/main/cat-collector-frontend/src/components/Auth/Signup.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import '../../styles/PasswordStrength.css'


export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const [strength, setStrength] = useState(0);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = ''
    try {
      response = await axios.post('http://127.0.0.1:8000/api/signup/', { username, password, email })
      navigate('/login')
    } catch (err) {
      console.log(err)
      if (err.response.data.error) {
        console.log(err.response.data.error)
        setMessage(err.response.data.error)
      }
      else {
        alert('Signup failed')
      }

    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkStrength(value);
  }
  // crediting https://www.geeksforgeeks.org/javascript/create-a-password-strength-checker-using-html-css-and-javascript/ 
  // for password checking display
  const checkStrength = (value) => {
    let point = -1;
    const tests = [
      { regex: /[0-9]/, label: "number" },
      { regex: /[a-z]/, label: "lowercase" },
      { regex: /[A-Z]/, label: "uppercase" },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, label: "special" },
    ]


    tests.forEach((test) => {
      if (test.regex.test(value)) point += 1
    })

    if (value.length >= 8) { point += 1 }


    setStrength(point)
  }

  const widthPower = ["1%", "25%", "50%", "75%", "100%"];
  const colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];
  const strengthText = ["Too Weak", "Weak", "Fair", "Good but not enough", "Strong"];

  return (
    <div className='big-homepage-full-container'>
      <div className='user-auth-page'>
        <form className='generic-form' onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input placeholder='Username' value={username} onChange={e => {
            setUsername(e.target.value)
            setMessage('')
          }} required />
          <input placeholder='Email' type="email" value={email} onChange={e => {
            setEmail(e.target.value)
            setMessage('')
          }} required />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <div className="power-container">
            <div
              id="power-point"
              style={{
                width: widthPower[strength],
                backgroundColor: colorPower[strength],
              }}
            ></div>
          </div>

          {password && (
            <p className="strength-label">{strengthText[strength]}</p>
          )}
          {message ? <p className='text-red-400'>{message}</p> : ''}
          <button className='global-btn' type='submit' disabled={strength < 4}>Sign Up</button>

        </form>
      </div>
    </div>
  )
}