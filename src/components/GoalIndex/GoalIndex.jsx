import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { getAllGoalsService, deleteSingleGoalService } from '../../services/GoalService'
import GoalForm from '../GoalForm/GoalForm'
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete'


function GoalIndex() {

    const [goals, setGoals] = useState([])
    const [showGoalForm, setShowGoalForm] = useState(false)
    const [goalId, setGoalId] = useState(null)
    const [goalName, setGoalName] = useState('')
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    async function getAllGoals() {
        try {
            const response = await getAllGoalsService()
            setGoals(response.data)
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

                                    <button onClick={() => {
                                        setShowConfirmDelete(true)
                                        setGoalId(goal.id)
                                        setGoalName(goal.content)
                                    }}>Delete</button>

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


            <ConfirmDelete
                showConfirmDelete={showConfirmDelete}
                setShowConfirmDelete={setShowConfirmDelete}

                getAllGoals = {getAllGoals}
                deleteServiceFunction={deleteSingleGoalService}
                elementId={goalId}
                setElementId={setGoalId}
                text={`the goal ${goalName}`}
            />
        </div>
    )
}

export default GoalIndex