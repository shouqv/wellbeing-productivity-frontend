import React, { useEffect, useState } from "react"
import EmojiPieChart from "./EmojiPieChart"
import ProgressBar from "./ProgressBar"
import GoalBarChart from "./GoalBarChart"
import HightPriorityTasks from "./HightPriorityTasks"
import AiAnalysis from "./AiAnalysis"
import AchievedGoals from "./AchievedGoals"
import CalendarMoodTracking from "./CalendarMoodTracking"
import { authRequest } from "@/services/auth"

import '../../styles/Dashboard.css'

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await authRequest({
          method: "get",
          url: "http://127.0.0.1:8000/api/dashboard/",
        })
        setDashboardData(response.data)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading dashboard data</p>

  return (
    <div className="dashboard-larg-panel">
      <div className="dashboard-inner-panel">


        <div className="dashboard-first-line">
          <EmojiPieChart data={dashboardData} />
          <div className="dashboard-PBandHP-widget">
            <ProgressBar data={dashboardData} />
            <HightPriorityTasks data={dashboardData} />
          </div>
          <div className="dashboard-calender-widget w-[400px] h-[369px]  shadow-md rounded-lg">
            <CalendarMoodTracking data={dashboardData} />
          </div>
        </div>


        <div className="dashboard-sec-line">
          <GoalBarChart data={dashboardData} />

          <AiAnalysis data={dashboardData} />
          <AchievedGoals data={dashboardData} />
        </div>

      </div>
    </div>
  )
}

export default Dashboard
