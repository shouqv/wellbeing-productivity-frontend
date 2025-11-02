import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import GoalIndex from './components/GoalIndex/GoalIndex'
import NavBar from './components/NavBar/NavBar'
import TaskIndex from './components/TaskIndex/TaskIndex'
import EmotionForm from './components/EmotionForm/EmotionForm'
import VisionBoard from './components/VisionBoard/VisionBoard'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/Signup'
import Dashboard from './components/Dashboard/Dashboard'

import ProtectedRoute from './components/Auth/ProtectedRoute'
import { getUserFromToken } from './services/auth'
import './App.css'

function App() {
  const [user, setUser] = useState(getUserFromToken());


  return (
    <Router>
      <div className='app-main-div'>
      <div className='app-nav-bar'>
      <NavBar user={user} setUser={setUser} />
      </div>
      <div className='app-content'>
      <Routes>
        {/* once they login sent them to the dashboard */}
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<h2>This will be welcoming page</h2>} />

        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        {/* <Route path='/goals' element={<GoalIndex />} />
        <Route path='/tasks' element={<TaskIndex />} />
        <Route path='/mood' element={<EmotionForm />} />
        <Route path='/visionboard' element={<VisionBoard />} /> */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <GoalIndex user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskIndex user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mood"
          element={
            <ProtectedRoute>
              <EmotionForm user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visionboard"
          element={
            <ProtectedRoute>
              <VisionBoard user={user} />
            </ProtectedRoute>
          }
        />




      </Routes>
      </div>
      </div>
    </Router>
  )
}

export default App
