import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

async function getAllGoalsService() {
    try {
        const response = await axios.get(`${BASE_URL}/goals/`)
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}


async function addGoalsService(formData) {
    try {
        const response = await axios.post(`${BASE_URL}/goals/`,formData )
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function updateGoalService(formData , goalId) {
    try {
        const response = await axios.put(`${BASE_URL}/goals/${goalId}/`, formData)
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function getSingleGoalService(goalId) {
    try {
        const response = await axios.get(`${BASE_URL}/goals/${goalId}/`)
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function deleteSingleGoalService(goalId) {
    try {
        const response = await axios.delete(`${BASE_URL}/goals/${goalId}/`)
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export {getAllGoalsService ,addGoalsService ,deleteSingleGoalService, updateGoalService , getSingleGoalService }