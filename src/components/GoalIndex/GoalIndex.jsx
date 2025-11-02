import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { getAllGoalsService, deleteSingleGoalService } from '../../services/GoalService'
import GoalForm from '../GoalForm/GoalForm'
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete'


function GoalIndex({ user }) {

    const [goals, setGoals] = useState([])
    const [filteredGoals, setFilteredGoals] = useState([])
    const [filter, setFilter] = useState('active')

    const [showGoalForm, setShowGoalForm] = useState(false)
    const [goalId, setGoalId] = useState(null)
    const [goalName, setGoalName] = useState('')
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    async function getAllGoals() {
        try {
            const response = await getAllGoalsService()
            setGoals(response.data)
            applyFilter(filter, response.data)
        }
        catch (error) { console.log("Error in getAllGoals", error) }
    }



    function applyFilter(status, goalsList = goals) {
        setFilter(status)
        if (status === 'active') {
            setFilteredGoals(goalsList.filter(g => g.status === 'active'))
        } else if (status === 'achieved') {
            setFilteredGoals(goalsList.filter(g => g.status === 'achieved'))
        }
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

            
            <div className='filter-div'>
                <button className={`filter-selector ${filter === 'active' ? 'active' : 'unactive'}`} onClick={() => applyFilter('active')}>Active</button>
                <button className={`filter-selector ${filter === 'achieved' ? 'active' : 'unactive'}`} onClick={() => applyFilter('achieved')}>Achieved</button>
            </div>

            <div className='big-main-container'>
            <ul className='widget-list-item-container'>
                {
                    filteredGoals.length ?
                        filteredGoals.map((goal, index) => {
                            return (
                                <li key={index} className='widget-list-item'>

                                    <h3>{goal.content} </h3>
                                    <p>status: {goal.status}</p>
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
                user={user}
            />


            <ConfirmDelete
                showConfirmDelete={showConfirmDelete}
                setShowConfirmDelete={setShowConfirmDelete}

                getAllGoals={getAllGoals}
                deleteServiceFunction={deleteSingleGoalService}
                elementId={goalId}
                setElementId={setGoalId}
                text={`the goal ${goalName}`}
            />
        </div>
        </div>
    )
}

export default GoalIndex