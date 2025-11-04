import axios from "axios";
import { authRequest } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL

async function getAllTasksService(date) {
    try {
        if (date) {
            const response = await authRequest({method:'get', url: `${BASE_URL}/tasks?date=${date}`})
            return response
        }
        const response = await authRequest({method:'get', url: `${BASE_URL}/tasks/`})
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}


async function addTaskService(formData) {
    try {
        const response = await authRequest({method:'post', url: `${BASE_URL}/tasks/`, data: formData})
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function getSingleTaskSercive( taskId) {
    try {
        const response =  await authRequest({method:'get', url: `${BASE_URL}/tasks/${taskId}/`})
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}


async function updateTaskService(formData , taskId) {
    try {
        const response = await authRequest({method:'put', url: `${BASE_URL}/tasks/${taskId}/` , data:formData})
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}
async function deleteTaskService( taskId) {
    try {
        const response = await authRequest({method:'delete', url: `${BASE_URL}/tasks/${taskId}/` })
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}



async function linkTaslToGoalService(taskId , goalId){
        try {
        const response = await authRequest({method:'patch', url: `${BASE_URL}/tasks/${taskId}/link-goal/${goalId}/` })
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function unLinkTaslToGoalService(taskId , goalId){
        try {
        const response = await authRequest({method:'patch', url: `${BASE_URL}/tasks/${taskId}/unlink-goal/${goalId}/` })
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}
export { getAllTasksService, updateTaskService, addTaskService, getSingleTaskSercive , deleteTaskService , linkTaslToGoalService , unLinkTaslToGoalService}