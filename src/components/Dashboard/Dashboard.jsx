import React from 'react'
import EmojiPieChart from './EmojiPieChart'
import ProgressBar from './ProgressBar'
import GoalBarChart from './GoalBarChart'
import HightPriorityTasks from './HightPriorityTasks'

function Dashboard() {
  return (
    <div>
      <EmojiPieChart />
      <ProgressBar />
      <GoalBarChart/>
      <HightPriorityTasks />
    </div>
  )
}

export default Dashboard
