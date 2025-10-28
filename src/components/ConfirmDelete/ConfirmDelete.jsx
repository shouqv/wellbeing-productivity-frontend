import React from 'react'
import { deleteTaskService } from '../../services/TaskService'
function ConfirmDelete({ showConfirmDelete, setShowConfirmDelete, taskId , getAllTasks, getTodayTask, setTaskId , date }) {

    async function handleSubmit(event) {
        event.preventDefault()
        let response = {}
        if (taskId) {
            response = await deleteTaskService(taskId)
            getAllTasks()
            getTodayTask(date)

        }

        if (response.status === 204 ) {
                    setTaskId(null)
                    setShowConfirmDelete(false)
        }


    }

    if (!showConfirmDelete) return null;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Are you sure you want to delete: </h2>
                <button type="submit">Confirm</button>
                <button type="button" onClick={()=>{
                    setTaskId(null)
                    setShowConfirmDelete(false)
                }}>Cancel</button>
            </form>
        </div>
    )
}

export default ConfirmDelete
