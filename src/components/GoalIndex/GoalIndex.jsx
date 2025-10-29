import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { getAllGoalsService } from '../../services/GoalService'
import GoalForm from '../GoalForm/GoalForm'


function GoalIndex() {

    const [goals, setGoal] = useState([])
    const [showGoalForm, setShowGoalForm] = useState(false)
    const [goalId, setGoalId] = useState(null)

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

            <h1>2025 Goals</h1> <button onClick={() => {
                setShowGoalForm(true)
                setGoalId(null)
            }}>+</button>
            <ul>
                {
                    goals.length ?
                        goals.map((goal, index) => {
                            return (
                                <li key={index}>

                                    <h3>{goal.content} </h3>
                                    <button onClick={() => {
                                        setShowGoalForm(true)
                                        setGoalId(goal.id)
                                    }}>Edit</button>
                                </li>
                            )
                        })
                        :
                        <h2>No Goals</h2>
                }
            </ul>

            <GoalForm
                showGoalForm={showGoalForm}
                setShowGoalForm={setShowGoalForm}
                goalId={goalId}
                setGoalId={setGoalId}
                getAllGoals={getAllGoals}
            />
        </div>
    )
}

export default GoalIndex