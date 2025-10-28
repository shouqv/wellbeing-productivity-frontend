import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'

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

function TaskForm({ date, show, taskId }) {
    if (!show) return null;
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

    async function handleSubmit(event) {
        event.preventDefault()
        // Send a POST request to our backend with all of the form data as JSON
        let response = {}
        if (taskId) {

        } else {
            response 
        }

        console.log(response)
        if (response.status === 201 || response.status === 200) {
            // close the model
        }
    }

    // becuase the date is updated in the TaskIndex, but here it had the initial date value which is Today
    // so to update it while the date is changing i used the below useeffect
    useEffect(() => {
        setFormData({ ...formData, date: date})
    }, [date]);

    return (
        <div>
            <h1>{'Add A New Task'}</h1>
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