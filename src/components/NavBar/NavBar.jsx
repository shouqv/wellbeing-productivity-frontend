import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

import dashboard from '../../assets/dark_dashboard.png'
import visionboard from '../../assets/dark_vision.png'
import goals from '../../assets/dark_goals.png'
import tasks from '../../assets/dark_tasks.png'
import checkin from '../../assets/dark_checkin.png'


import dashboardActive from '../../assets/dashboard.png'
import visionboardActive from '../../assets/visionboard.png'
import goalsActive from '../../assets/goals.png'
import tasksActive from '../../assets/tasks.png'
import checkinActive from '../../assets/checkin.png'

function NavBar({ user, setUser }) {
  const [activeNav , setActiveNav] = useState('dashboard')
  return (
    <nav>

      {
        user
          ?
          <>

            <div className='navbar-elements'>
            <Link to={'/dashboard'} onClick={()=> setActiveNav('dashboard')} className={activeNav === 'dashboard'? 'activeNavBar' : ''}>
            <img src={activeNav === 'dashboard'? dashboardActive : dashboard} alt="Dashboard" width={26} />
            </Link>

            <Link to={'/visionboard'} onClick={()=> setActiveNav('visionboard')} className={activeNav === 'visionboard'? 'activeNavBar' : ''}>
            <img src={activeNav === 'visionboard'? visionboardActive : visionboard} alt="vision" width={26}  /></Link>



            <Link to={'/goals'} onClick={()=> setActiveNav('goals')} className={activeNav === 'goals'? 'activeNavBar' : ''}>
            <img src={activeNav === 'goals'? goalsActive : goals} alt="goals" width={26}   /></Link>

            <Link to={'/tasks'} onClick={()=> setActiveNav('tasks')} className={activeNav === 'tasks'? 'activeNavBar' : ''}>
            <img src={activeNav === 'tasks'? tasksActive : tasks}  alt="tasks" width={26}  /></Link>

            
            <Link to={'/mood'} onClick={()=> setActiveNav('checkin')} className={activeNav === 'checkin'? 'activeNavBar' : ''}>
            <img src={activeNav === 'checkin'? checkinActive : checkin}  alt="checkin" width={26}  /></Link>
             
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