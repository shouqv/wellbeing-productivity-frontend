import React from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

import dashboard from '../../assets/dark_dashboard.png'
import visionboard from '../../assets/dark_vision.png'
import goals from '../../assets/dark_goals.png'
import tasks from '../../assets/dark_tasks.png'
import checkin from '../../assets/dark_checkin.png'

function NavBar({ user, setUser }) {
  return (
    <nav>

      {
        user
          ?
          <>

            <div className='navbar-elements'>
            <Link to={'/dashboard'}><img src={dashboard} alt="Dashboard" width={24} /></Link>
            <Link to={'/visionboard'}><img src={visionboard} alt="Dashboard" width={24} /></Link>
            <Link to={'/goals'}><img src={goals} alt="Dashboard" width={24} /></Link>
            <Link to={'/tasks'}><img src={tasks} alt="Dashboard" width={24} /></Link>
            <Link to={'/mood'}><img src={checkin} alt="Dashboard" width={24} /></Link>
             
            <LogOutButton setUser={setUser} />
            </div>
           

          </>

          :
          <>
            {/* <Link to={'/signup'}>Sign Up</Link>
            <Link to={'/login'}>Log In</Link> */}
          </>
      }

    </nav>
  )
}

export default NavBar