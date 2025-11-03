import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { addTaskService, updateTaskService, getSingleTaskSercive, unLinkTaslToGoalService, linkTaslToGoalService } from '../../services/TaskService'
import { getAllGoalsService } from '../../services/GoalService'
import '../../styles/popupWindow.css'

// {
//  {
//             "id": 1,
//              "content": "do front end",
//             "date": "2025-10-27",
//             "priority": 1,
//              "status": "pending",
//              "user": 1
//          }
// }

function TaskForm({ date, showTaskForm, taskId, setShowTaskForm, getAllTasks, getTodayTask, setTaskId }) {
    const [formData, setFormData] = useState({
        content: '',
        date: date,
        priority: '1',
        status: 'pending',
        // for now
        // user: user?.user_id
    })
    const [goals, setGoals] = useState([])
    const [checkedGoals, setCheckedGoals] = useState([])
    const [initialCheckedGoals, setInitialCheckedGoals] = useState([])

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }

    async function getAllGoals() {
        try {
            const response = await getAllGoalsService()
            setGoals(response.data)
        }
        catch (error) { console.log("Error in getAllGoals", error) }
    }

    useEffect(() => {
        if (!taskId) {
            getAllGoals()
        }
    }, [])

    async function getSingleTask() {
        const response = await getSingleTaskSercive(taskId)
        console.log(response.data)
        setFormData(response.data)

        const linkedGoalIds = response.data.goals_belong_to_task?.map(g => g.id) || []
        setCheckedGoals(linkedGoalIds)
        setInitialCheckedGoals(linkedGoalIds)
    }


    console.log("from the form" + taskId)

    async function handleSubmit(event) {
        event.preventDefault()
        let response = {}
        setFormData({ ...formData, priority: Number(formData['priority']) })
        console.log(formData)
        if (taskId) {
            response = await updateTaskService(formData, taskId)

        } else {
            response = await addTaskService(formData)
        }

        console.log(response)
        if (response.status === 201 || response.status === 200) {

            const removedRelationship = initialCheckedGoals.filter(element => !checkedGoals.includes(element));
            const addedRelationship = checkedGoals.filter(element => !initialCheckedGoals.includes(element))

            for (const goalId of removedRelationship) {
                await unLinkTaslToGoalService(response.data.id, goalId);
            }

            for (const goalId of addedRelationship) {
                await linkTaslToGoalService(response.data.id, goalId);
            }
            getAllTasks()
            getTodayTask(formData.date)
            // close the model
            setShowTaskForm(false)
            setTaskId(null)
            setCheckedGoals([])
            setInitialCheckedGoals([])
            setFormData({
                content: '',
                date: date,
                priority: '1',
                status: 'pending',
                // user: user?.user_id
            })
        }


    }
    function handleGoalToggle(goalId) {
        if (checkedGoals.includes(goalId)) {
            // this checks if it exist, it will be removed
            setCheckedGoals(checkedGoals.filter(id => id !== goalId));
        } else {

            setCheckedGoals([...checkedGoals, goalId]);
        }
    }

    // becuase the date in the TaskIndex has the inital value to Today date,
    // when the component firts render the date here will be always the initial day
    // to solve this i use the useEffect so that it set the date whenever 
    // the date changes using the date selector in the calender 
    useEffect(() => {
        // below ensure if the user opened an edit window in a day, then switched to another day the info is 
        // reseted and the popup windo is closeed
        setFormData({
            content: '',
            date: date,
            priority: '1',
            status: 'pending',
            // user: user?.user_id
        })
        setTaskId(null)
        setShowTaskForm(false)
    }, [date]);

    useEffect(() => {
        if (taskId) {
            getSingleTask()
        } else {
            setFormData({
                content: '',
                date: date,
                priority: '1',
                status: 'pending',
                // user: user?.user_id
            })
        }
    }, [taskId])

    if (!showTaskForm) return null;
    return (
        <div className="popup-overlay" >

            <div className="popup-content">

                <div className="popup-header">
                    <h1>{taskId ? 'Edit Task' : 'Add New Task'}</h1>

                    <button className="popup-close-btn" onClick={() => {
                        setShowTaskForm(false)
                        setFormData({
                            content: '',
                            date: date,
                            priority: '1',
                            status: 'pending',
                            // user: user?.user_id
                        })
                        setTaskId(null)
                    }}>X</button>
                </div>

                <form className='generic-form' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='content'>Task:</label>
                        <input value={formData.content} onChange={handleChange} id='content' name='content' />
                    </div>

                    <div>
                        <label htmlFor='priority'>Priority:</label>
                        <select id='priority' name="priority" value={formData.priority} onChange={handleChange}>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='status' >Status:</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange}>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {goals ? <h4>Available goals:</h4> : <></>}
                    <div className={goals ? 'linked-goals-container' : ''}>
                        <div className='linked-goals-items'>
                        {taskId ? formData.goals_belong_to_task?.map(goal => {
                            return <label>
                                <input
                                    type="checkbox"
                                    checked={checkedGoals.includes(goal.id)}
                                    onChange={() => handleGoalToggle(goal.id)}
                                />
                                {goal.content}
                            </label>
                        })
                            : <></>}
                        {/* <p>unlinked goals:</p> */}
                        {formData.goals_doesnot_belong_to_task?.map((goal, index) => {
                            return <label key={index}>
                                <input
                                    type="checkbox"
                                    checked={checkedGoals.includes(goal.id)}
                                    onChange={() => handleGoalToggle(goal.id)}
                                />
                                {goal.content}
                            </label>
                        })}
                        {
                            taskId ? <></> :
                                goals.map((goal, index) => {
                                    return <label className='linked-goals-item' key={index}>
                                        <input
                                            type="checkbox"
                                            checked={checkedGoals.includes(goal.id)}
                                            onChange={() => handleGoalToggle(goal.id)}
                                        />
                                        {goal.content}
                                    </label>
                                })
                        }
                    </div>
                    </div>
                    <button className='global-btn' type='submit'>Submit</button>
                </form>


            </div>
        </div>
    )
}

export default TaskForm