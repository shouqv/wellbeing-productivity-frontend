import React, { useEffect, useState } from "react"
import EmojiPieChart from "./EmojiPieChart"
import ProgressBar from "./ProgressBar"
import GoalBarChart from "./GoalBarChart"
import HightPriorityTasks from "./HightPriorityTasks"
import AiAnalysis from "./AiAnalysis"
import { authRequest } from "@/services/auth"

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
    <div>
      <EmojiPieChart data={dashboardData} />
      <ProgressBar data={dashboardData} />
      <GoalBarChart data={dashboardData} />
      <HightPriorityTasks data={dashboardData} />
      <AiAnalysis data={dashboardData} />
    </div>
  )
}

export default Dashboard
