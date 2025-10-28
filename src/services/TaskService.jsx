import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

async function getAllTasksService(date) {
    try {
        if (date) {
            const response = await axios.get(`${BASE_URL}/tasks?date=${date}`)
            return response
        }
        const response = await axios.get(`${BASE_URL}/tasks/`)
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}


async function addTaskService(formData) {
    try {
        const response = await axios.post(`${BASE_URL}/tasks/`, formData)
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function getSingleTaskSercive( taskId) {
    try {
        const response = await axios.get(`${BASE_URL}/tasks/${taskId}/`)
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}


async function updateTaskService(formData , taskId) {
    try {
        const response = await axios.put(`${BASE_URL}/tasks/${taskId}/`, formData)
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}
export { getAllTasksService, updateTaskService, addTaskService, getSingleTaskSercive}