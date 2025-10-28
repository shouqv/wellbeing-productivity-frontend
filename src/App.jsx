import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import GoalIndex from './components/GoalIndex/GoalIndex'
import NavBar from './components/NavBar/NavBar'
import TaskIndex from './components/TaskIndex/TaskIndex'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<h2>This will be the home page</h2>} />
        <Route path='/goals' element={<GoalIndex/>} />
        <Route path='/tasks' element={<TaskIndex/>} />
      </Routes>
    </Router>
  )
}

export default App
