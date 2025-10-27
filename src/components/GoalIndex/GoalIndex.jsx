import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { getAllGoalsService } from '../../services/GoalService'


function GoalIndex() {

    const [goals, setGoal] = useState([])

    async function getAllGoals() {
        try {
            const response = await getAllGoalsService()
            setGoal(response.data)
        }
        catch (error) { console.log("Error in getAllGoals", error) }
    }

    useEffect(() => {
        getAllGoals()
    }, [])


    return (
        <div>
            
            <h1>2025 Goals</h1>
            <ul>
            {
                goals.length ?
                    goals.map((goal, index) => {
                        return (
                            <li key={index}>
                            
                                <h3>{goal.content} </h3>
                            </li>
                        )
                    })
                    :
                    <h2>No Goals</h2>
            }
            </ul>
        </div>
    )
}

export default GoalIndex