import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router'
import GoalIndex from './components/GoalIndex/GoalIndex'
import NavBar from './components/NavBar/NavBar'
import TaskIndex from './components/TaskIndex/TaskIndex'
import EmotionForm from './components/EmotionForm/EmotionForm'
import VisionBoard from './components/VisionBoard/VisionBoard'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import HomePage from './components/HomePage/HomePage'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { getUserFromToken } from './services/auth'
import './App.css'



function AppContent({ user, setUser }) {
  const location = useLocation();
  const isHome =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/signup'

  return (
    <div className='app-main-div'>
      {!isHome && (
        <div className='app-nav-bar'>
          <NavBar user={user} setUser={setUser} />
        </div>
      )}

      <div className={isHome ? '' : 'app-content'}>
        <Routes>
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<HomePage />} />

          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/goals'
            element={
              <ProtectedRoute>
                <GoalIndex user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/tasks'
            element={
              <ProtectedRoute>
                <TaskIndex user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/mood'
            element={
              <ProtectedRoute>
                <EmotionForm user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/visionboard'
            element={
              <ProtectedRoute>
                <VisionBoard user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(getUserFromToken());

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  )
}

export default App
