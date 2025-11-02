import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { addGoalsService, updateGoalService, getSingleGoalService } from '../../services/GoalService'

import '../../styles/popupWindow.css'
// TODO - pass the year from the user device
function GoalForm({ showGoalForm, setShowGoalForm, getAllGoals, goalId, setGoalId, user }) {
    const [formData, setFormData] = useState({
        content: '',
        status: 'active',
        year: new Date().getFullYear().toString(),
        // for now
        // user: user?.user_id
    })

    //     # REMEMBER: the below is the post req needed for goal
    // # {
    // #     "content": "to let the test succedd",
    // #     "status": "active",
    // #     "year": 2025,
    // #     "user": 1
    // # }


    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }


    async function getSingleGoal() {
        const response = await getSingleGoalService(goalId)
        console.log(response.data)
        setFormData(response.data)
    }



    async function handleSubmit(event) {
        event.preventDefault()
        let response = {}
        try {
            if (goalId) {
                response = await updateGoalService(formData, goalId)
            } else {
                response = await addGoalsService(formData)
            }
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                // close the model
                setShowGoalForm(false)
                setGoalId(null)
                setFormData({
                    content: '',
                    status: 'active',
                    year: new Date().getFullYear().toString(),
                    // for now
                    // user: user?.user_id
                })
            }
            getAllGoals()
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (goalId) {
            getSingleGoal()
        } else {
            setFormData({
                content: '',
                status: 'active',
                year: new Date().getFullYear().toString(),
                // for now
                // user: user?.user_id
            })
        }
    }, [goalId])

    if (!showGoalForm) return null;
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <h1>{goalId ? 'Edit Goal' : 'Add New Goal'}</h1>
                    <button className="popup-close-btn" onClick={() => {
                        setShowGoalForm(false)
                        setFormData({
                            content: '',
                            status: 'active',
                            year: new Date().getFullYear().toString(),
                            // for now
                            // user: user?.user_id
                        })
                        setGoalId(null)
                    }}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='content'>Goal:</label>
                        <input value={formData.content} onChange={handleChange} id='content' name='content' />
                    </div>
                    <div>
                        <label htmlFor='status' >Status:</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange}>
                            <option value="active">Active</option>
                            <option value="achieved">Achieved</option>
                        </select>
                    </div>

                    <button className='global-btn' type='submit'>Submit</button>
                </form>


            </div>
        </div>
    )
}


export default GoalForm
