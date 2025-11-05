import React from 'react';
import { Link, useLocation } from 'react-router'
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
  const location = useLocation()
  const currentPath = location.pathname


  return (
    <nav>
      {user && (
        <div className="navbar-elements">
          <Link to="/dashboard" className={currentPath.startsWith('/dashboard') ? 'activeNavBar' : ''}>
            <img src={currentPath.startsWith('/dashboard') ? dashboardActive : dashboard} alt="Dashboard" width={26} />
          </Link>

          <Link to="/visionboard" className={currentPath.startsWith('/visionboard') ? 'activeNavBar' : ''}>
            <img src={currentPath.startsWith('/visionboard') ? visionboardActive : visionboard} alt="Vision Board" width={26} />
          </Link>

          <Link to="/goals" className={currentPath.startsWith('/goals') ? 'activeNavBar' : ''}>
            <img src={currentPath.startsWith('/goals') ? goalsActive : goals} alt="Goals" width={26} />
          </Link>

          <Link to="/tasks" className={currentPath.startsWith('/tasks') ? 'activeNavBar' : ''}>
            <img src={currentPath.startsWith('/tasks') ? tasksActive : tasks} alt="Tasks" width={26} />
          </Link>

          <Link to="/mood" className={currentPath.startsWith('/mood') ? 'activeNavBar' : ''}>
            <img src={currentPath.startsWith('/mood') ? checkinActive : checkin} alt="Mood" width={26} />
          </Link>

          <LogOutButton setUser={setUser} />
        </div>
      )}
    </nav>
  )
}

export default NavBar;
