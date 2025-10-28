import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { getAllTasksService } from '../../services/TaskService'
import Calender from '../Calneder/Calender'


function TaskIndex() {

    const [todayTasks, setTodayTasks] = useState(null)
    const [filteredTasks, setFilteredTasks] = useState([])
    const [filter, setFilter] = useState('all')
    // below gets all tasks to be in the calender
    const [calnderTasks, setCalnderTasks] = useState([])

    const priority = {
        1: 'Low',
        2: 'Medium',
        3: 'High'
    }

    async function getAllTasks() {
        try {
            const response = await getAllTasksService()
            setCalnderTasks([...response.data.pending_tasks, ...response.data.in_progress_tasks])
        }
        catch (error) { console.log("Error in getAllTasks", error) }
    }

    async function getTodayTask(date) {
        try {
            if (!date) { date = new Date().toISOString().split('T')[0] }

            const response = await getAllTasksService(date)
            console.log(response.data)
            setTodayTasks(response.data)
            setFilter('all')
        }
        catch (error) { console.log("Error in getAllTasks", error) }
    }



    useEffect(() => {
        // gets all the tasks to show it as events in the calender
        getAllTasks()
        // get the tasks for today when the user first navigate to it
        getTodayTask()
        console.log(todayTasks)
    }, [])

    useEffect(() => {
        // if the user changed the date, the getTodayTask will be called
        // hecne the tasks will change then this will be called to filter 
        getTasksByFilter(filter);
    }, [todayTasks]);

    const getTasksByFilter = (filter) => {
        setFilter(filter)
        console.log("inside")
        if (!todayTasks) return
        console.log("in")
        switch (filter) {
            case 'pending':
                setFilteredTasks(todayTasks.pending_tasks)
                break
            case 'in_progress':
                setFilteredTasks(todayTasks.in_progress_tasks)
                break
            case 'completed':
                setFilteredTasks(todayTasks.completed_tasks)
                break
            case 'all':
            default:
                setFilteredTasks([
                    ...todayTasks.pending_tasks,
                    ...todayTasks.in_progress_tasks,
                    ...todayTasks.completed_tasks
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
                    todayTasks ?
                        filteredTasks.length ?
                            filteredTasks.map((task, index) => {
                                return (
                                    <li key={index}>

                                        <h3>{task.content} </h3>
                                        <p>status: {task.status}</p>
                                        <p>priority: {priority[task.priority]}</p>
                                        <p>Date: {task.date}</p>
                                    </li>
                                )
                            })
                            :
                            <h2>No tasks</h2>
                        :
                        <h2>No Tasks</h2>
                }
            </ul>

            <div style = {{width:'50vw'}}>
                <Calender tasks={calnderTasks} getTodayTask={getTodayTask} />
            </div>
        </div>
    )
}

export default TaskIndex