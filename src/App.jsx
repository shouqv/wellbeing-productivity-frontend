import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import GoalIndex from './components/GoalIndex/GoalIndex'
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<h2>This will be the home page</h2>} />
        <Route path='/goals' element={<GoalIndex/>} />
      </Routes>
    </Router>
  )
}

export default App
