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

export {getAllTasksService}