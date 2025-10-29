import React from 'react'

function ConfirmDelete({ showConfirmDelete, setShowConfirmDelete, elementId, setElementId, deleteServiceFunction, getAllTasks, getTodayTask, date, getAllGoals , text }) {

    async function handleSubmit(event) {
        event.preventDefault()
        let response = {}
        if (elementId) {
            response = await deleteServiceFunction(elementId)
            if (date && getAllTasks && getTodayTask) {
                getAllTasks()
                getTodayTask(date)
            }
            else if (getAllGoals){
                getAllGoals()
            }
        }

        if (response.status === 204) {
            setElementId(null)
            setShowConfirmDelete(false)
        }


    }

    if (!showConfirmDelete) return null;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Are you sure you want to delete {text}?: </h2>
                <button type="submit">Confirm</button>
                <button type="button" onClick={() => {
                    setElementId(null)
                    setShowConfirmDelete(false)
                }}>Cancel</button>
            </form>
        </div>
    )
}

export default ConfirmDelete
