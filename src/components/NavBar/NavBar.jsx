import React from 'react'
import { Link } from 'react-router'

function NavBar() {
  return (
    <nav>
        <Link to={'/goals'}>All Goals</Link>
    </nav>
  )
}

export default NavBar