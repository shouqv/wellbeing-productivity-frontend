import React from 'react'
import EmojiPieChart from './EmojiPieChart'
import ProgressBar from './ProgressBar'
import GoalBarChart from './GoalBarChart'

function Dashboard() {
  return (
    <div>
      <EmojiPieChart />
      <ProgressBar />
      <GoalBarChart/>
    </div>
  )
}

export default Dashboard
