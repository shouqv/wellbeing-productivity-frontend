import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'



function GoalIndex() {

    const [goals, setGoal] = useState([])

    async function getAllGoals() {
        try {
            // will add the call to the backend
        }
        catch (error) { console.log("Error in getAllGoals", error) }
    }

    useEffect(() => {
        getAllGoals()
    }, [])


    return (
        <div>
            <h1>2025 Goals</h1>
            {
                goals.length ?
                    goals.map((goal, index) => {
                        return (
                            <div key={index}>
                            
                                <h2>{goal.title} </h2>
                            
                            </div>
                        )
                    })
                    :
                    <h2>No Goals</h2>
            }
        </div>
    )
}

export default GoalIndex