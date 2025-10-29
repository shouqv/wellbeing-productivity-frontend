import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { addTaskService, updateTaskService, getSingleTaskSercive } from '../../services/TaskService'

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
        user: 1
    })


    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }

    async function getSingleTask() {
        const response = await getSingleTaskSercive(taskId)
        console.log(response.data)
        setFormData(response.data)
    }


    console.log("from the form" + taskId)
    async function handleSubmit(event) {
        event.preventDefault()
        let response = {}
        setFormData({ ...formData, priority: Number(formData['priority']) })
        if (taskId) {
            response = await updateTaskService(formData, taskId)
            getAllTasks()
            getTodayTask(formData.date)

        } else {
            response = await addTaskService(formData)
            getAllTasks()
            getTodayTask(formData.date)
        }

        console.log(response)
        if (response.status === 201 || response.status === 200) {
            // close the model
            setShowTaskForm(false)
            setTaskId(null)
            setFormData({
                content: '',
                date: date,
                priority: '1',
                status: 'pending',
                user: 1
            })
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
            user: 1
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
                user: 1
            })
        }
    }, [taskId])

    if (!showTaskForm) return null;
    return (
        <div>
            <h1>{taskId ? 'Edit Task' : 'Add New Task'}</h1> <button onClick={() => {
                setShowTaskForm(false)
                setFormData({
                    content: '',
                    date: date,
                    priority: '1',
                    status: 'pending',
                    user: 1
                })
                setTaskId(null)
            }}>X</button>
            <form onSubmit={handleSubmit}>
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

                <button type='submit'>Submit</button>
            </form>



        </div>
    )
}

export default TaskForm