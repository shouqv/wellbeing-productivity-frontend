import axios from "axios";
import { authRequest } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL

async function getAllGoalsService() {
    try {
        const response = await authRequest({method:'get', url: `${BASE_URL}/goals/`})
        
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}


async function addGoalsService(formData) {
    try {
        const response = await authRequest({method:'post', url: `${BASE_URL}/goals/` , data:formData})
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function updateGoalService(formData , goalId) {
    try {
        const response = await authRequest({method:'put', url: `${BASE_URL}/goals/${goalId}/`, data:formData})
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function getSingleGoalService(goalId) {
    try {
        const response =await authRequest({method:'get', url: `${BASE_URL}/goals/${goalId}/`})
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function deleteSingleGoalService(goalId) {
    try {
        const response = await authRequest({method:'delete', url: `${BASE_URL}/goals/${goalId}/`})
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export {getAllGoalsService ,addGoalsService ,deleteSingleGoalService, updateGoalService , getSingleGoalService }