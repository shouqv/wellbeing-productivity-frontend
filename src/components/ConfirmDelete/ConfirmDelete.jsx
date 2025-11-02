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
        <div className="popup-overlay">
            <div className="popup-content">
            <form onSubmit={handleSubmit}>
                <div className="popup-header">
                <h2>Are you sure you want to delete {text}?: </h2>
                </div>
                <button className='global-btn' type="submit">Confirm</button>
                <button className='global-btn' type="button" onClick={() => {
                    setElementId(null)
                    setShowConfirmDelete(false)
                }}>Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default ConfirmDelete
