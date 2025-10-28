import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { getAllTasksService } from '../../services/TaskService'


function TaskIndex() {

    const [tasks, setTasks] = useState(null)
    const [filteredTasks, setFilteredTasks] = useState([])

    async function getAllTasks() {
        try {
            const response = await getAllTasksService()
            console.log(response.data)
            setTasks(response.data)
            console.log(tasks)
        }
        catch (error) { console.log("Error in getAllTasks", error) }
    }

    useEffect(() => {
        getAllTasks()
        console.log(tasks)
    }, [])

    const getTasksByFilter = (filter) => {
        
        switch (filter) {
            case 'pending':
                setFilteredTasks( tasks.pending_tasks)
                break
            case 'in_progress':
                setFilteredTasks(  tasks.in_progress_tasks)
                break
            case 'completed':
                setFilteredTasks(  tasks.completed_tasks)
                break
            case 'all':
            default:
                setFilteredTasks(  [
                    ...tasks.pending_tasks,
                    ...tasks.in_progress_tasks,
                    ...tasks.completed_tasks
                ])
        }
    };


    return (
        <div>

            <h1>Today tasks</h1>
            <div>
                <button onClick={() => getTasksByFilter('all')}>All</button>
                <button onClick={() => getTasksByFilter('pending')}>Pending</button>
                <button onClick={() => getTasksByFilter('in_progress')}>In Progress</button>
                <button onClick={() => getTasksByFilter('completed')}>Completed</button>
            </div>
            <ul>
                {
                    tasks?
                        filteredTasks.map((task, index) => {
                            return (
                                <li key={index}>

                                    <h3>{task.content} </h3>
                                </li>
                            )
                        })
                        :
                        <h2>No Tasks</h2>
                }
            </ul>
        </div>
    )
}

export default TaskIndex