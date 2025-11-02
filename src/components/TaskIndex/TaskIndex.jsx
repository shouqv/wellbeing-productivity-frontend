import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { getAllTasksService } from '../../services/TaskService'
import Calender from '../Calneder/Calender'
import TaskForm from '../TaskForm/TaskForm'
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete'
import { deleteTaskService } from '../../services/TaskService'

import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import '../../styles/TaskIndex.css'


function TaskIndex() {

    const [todayTasks, setTodayTasks] = useState(null)
    const [filteredTasks, setFilteredTasks] = useState([])
    const [filter, setFilter] = useState('all')
    // below gets all tasks to be in the calender
    const [calnderTasks, setCalnderTasks] = useState([])
    // const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [date, setDate] = useState(
        new Date().toLocaleDateString('en-CA')
    )
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [taskId, setTaskId] = useState(null)
    const [taskName, setTaskName] = useState('')

    const priority = {
        1: 'Low',
        2: 'Medium',
        3: 'High'
    }

    const statusIcon = {
        'pending': '⏸️',
        'in_progress': '▶️',
        'completed': '✅'
    }

    async function getAllTasks() {
        try {
            const response = await getAllTasksService()
            setCalnderTasks([...response.data.pending_tasks, ...response.data.in_progress_tasks])
        }
        catch (error) { console.log("Error in getAllTasks", error) }
    }

    // the below method get the tasks for a specific day from the backend,
    // if the user from the calender compnent chose a date, this method will be called to retirve 
    // the tasks for that day
    async function getTodayTask(dateCalender) {
        try {
            if (!dateCalender) {
                // dateCalender = new Date().toISOString().split('T')[0]
                // below gets the user specific date
                dateCalender = new Date().toLocaleDateString('en-CA')
            }
            const response = await getAllTasksService(dateCalender)
            console.log(response.data)
            setTodayTasks(response.data)
            // TODO - rememeber that the below can be deleted
            // if i wanted to keep the filter across days and have the user remove it by himself
            setFilter('all')
        }
        catch (error) { console.log("Error in getAllTasks", error) }
    }



    useEffect(() => {
        // gets all the tasks to show it as events in the calender compnent
        getAllTasks()
        // get the tasks for today when the user first navigate to this page
        getTodayTask()
        console.log(todayTasks)
    }, [])

    useEffect(() => {
        // if the user changed the date, the getTodayTask will be called
        // hecne the tasks will change, so to reflect the change on the screen
        //  the below method will be called, since it is what prints the tasks to the user
        getTasksByFilter(filter);
    }, [todayTasks]);

    const getTasksByFilter = (filter) => {
        // i have made the filter as a state, so that when you navigate to another date
        // i can set the filter back to all , in the getTodayTask() method as it will be called from the calender compnent
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
                ].sort((a, b) => b.priority - a.priority))
        }
    };



    return (
        <div className='task-main-container'>
            <div className='task-left-main-container'>
                <Calender tasks={calnderTasks} getTodayTask={getTodayTask} setDate={setDate} />
            </div>
            <div className='task-right-main-container'>
                {/* For date, creditng https://www.geeksforgeeks.org/javascript/how-to-format-a-date-in-javascript/ */}
                {date === new Date().toLocaleDateString('en-CA') ? <h1>Today tasks</h1> : <h1>
                    {new Intl.DateTimeFormat("en-US", { dateStyle: 'medium' }).format(new Date(date)).replace(',', '')}
                </h1>}

                <div className='filter-div'>
                    <button className={`filter-selector ${filter === 'all' ? 'active' : 'unactive'}`} onClick={() => getTasksByFilter('all')}>All</button>
                    <button className={`filter-selector ${filter === 'pending' ? 'active' : 'unactive'}`} onClick={() => getTasksByFilter('pending')}>Pending</button>
                    <button className={`filter-selector ${filter === 'in_progress' ? 'active' : 'unactive'}`} onClick={() => getTasksByFilter('in_progress')}>In Progress</button>
                    <button className={`filter-selector ${filter === 'completed' ? 'active' : 'unactive'}`} onClick={() => getTasksByFilter('completed')}>Completed</button>

                    <button className='global-btn' onClick={() => {
                        setShowTaskForm(true)
                        setTaskId(null)
                    }}>+</button>
                </div>
                <div className='big-main-container'>
                    <ul className='widget-list-item-container'>
                        {
                            todayTasks ?
                                filteredTasks.length ?
                                    filteredTasks.map((task, index) => {
                                        return (
                                            <li key={index} className='widget-list-item' >

                                                <h3>{task.content} </h3>

                                                {/* <p>Date: {task.date}</p> */}

                                                <div className={task.goals.length ? 'linked-goals-container' : ''}>
                                                    {
                                                        task.goals.length ?
                                                            <h4>Related goals:</h4> :
                                                            <></>
                                                    }
                                                    {
                                                        task.goals.length ?
                                                            <div className='linked-goals-items'>
                                                        {task.goals.map((goal, index) => { return <p className='linked-goals-item' key={index}>✨{goal.content}</p> })}
                                                            </div>
                                                            :
                                                            <></>
                                                    }
                                                </div>



                                                <div className='widget-list-item-footer'>
                                                    <div className='widget-list-item-tags'>
                                                        <span className={`task-${priority[task.priority]}`}>{priority[task.priority]}</span>
                                                        <span className={`widget-list-item-status`}>{statusIcon[task.status]}{task.status}</span>
                                                    </div>

                                                    <div className='widget-list-item-btns'>
                                                        <button onClick={() => {
                                                            setShowConfirmDelete(true)
                                                            setTaskId(task.id)
                                                            setTaskName(task.content)
                                                        }}><img src={deleteIcon} alt="delete icon" width={20} style={{ opacity: 0.5, cursor: "pointer" }} /></button>
                                                        <button onClick={() => {
                                                            setShowTaskForm(true)
                                                            setTaskId(task.id)
                                                        }}><img src={editIcon} alt="edit icon" width={20} style={{ opacity: 0.5, cursor: "pointer" }} /></button>
                                                    </div>
                                                </div>

                                            </li>
                                        )
                                    })
                                    :
                                    <h2>No tasks</h2>
                                :
                                <h2>No Tasks</h2>
                        }
                    </ul>

                    <div style={{ width: '50vw' }}>
                        {/* the below, the task form is used for both updating and creating.
                i have passed the date, so that user can navigate using the calender and if they pressed the + they can add at that date

                i have passed getTodayTask and getAllTasks , so that when the user add a task, the task will render on the screen becuase
                the todaytask will change hence the filteredtasks and it will be reflected in the calender too
                
                the task id here, since im not passing it as a param, i passed it as a state so that 
                i can change it and have the form be either for adding when its null or editing an
                existing task. Also its a state mainly because i wanted it to be like a popup windo, keeping the user in the same route/component
                
                lastly showTaskForm , just control if i want it to be visisble or not
                */}
                        <TaskForm showTaskForm={showTaskForm}
                            setShowTaskForm={setShowTaskForm}
                            date={date}
                            getTodayTask={getTodayTask}
                            getAllTasks={getAllTasks}
                            taskId={taskId}
                            setTaskId={setTaskId} />


                        <ConfirmDelete
                            showConfirmDelete={showConfirmDelete}
                            setShowConfirmDelete={setShowConfirmDelete}
                            date={date}
                            getTodayTask={getTodayTask}
                            getAllTasks={getAllTasks}

                            deleteServiceFunction={deleteTaskService}
                            elementId={taskId}
                            setElementId={setTaskId}
                            text={`the task ${taskName}`}
                        />

                        {/* calenderTasks adds all tasks as events in the component

                setDate helps sets the date to whatever date chosen in the calender component so that if you clicked the plus button it will add
                a task to exactly the date you navigated to using the calender
                 */}


                    </div>


                </div>
            </div>
        </div>
    )
}

export default TaskIndex