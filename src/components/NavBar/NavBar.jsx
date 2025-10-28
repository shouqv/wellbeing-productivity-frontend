import React from 'react'
import { Link } from 'react-router'

function NavBar() {
  return (
    <nav>
        <Link to={'/'}>Dashboard</Link>
        <Link to={''}>Vision</Link>
        <Link to={'/goals'}>Goals</Link>
        <Link to={'/tasks'}>Tasks</Link>
        <Link to={''}>How you feeling?</Link>
    </nav>
  )
}

export default NavBar