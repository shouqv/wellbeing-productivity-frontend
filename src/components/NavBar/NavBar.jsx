import React from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

function NavBar({ user, setUser }) {
  return (
    <nav>

      {
        user
          ?
          <>
            <LogOutButton setUser={setUser} />
            <Link to={'/dashboard'}>Dashboard</Link>
            <Link to={'/visionboard'}>Vision</Link>
            <Link to={'/goals'}>Goals</Link>
            <Link to={'/tasks'}>Tasks</Link>
            <Link to={'/mood'}>How you feeling?</Link></>

          :
          <>
            <Link to={'/signup'}>Sign Up</Link>
            <Link to={'/login'}>Log In</Link>
          </>
      }

    </nav>
  )
}

export default NavBar