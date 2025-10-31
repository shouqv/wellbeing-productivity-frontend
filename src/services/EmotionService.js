import axios from "axios";
import { authRequest } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL

async function addEmotionService(formData) {
    try {
        // const response = await axios.post(`${BASE_URL}/emotions/` , formData)
        const response = await authRequest({method:'post', url: `${BASE_URL}/emotions/`, data:formData })
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}
async function checkEmotionSubmissionService() {
    try {
        // const response = await axios.get(`${BASE_URL}/emotions/check/` )
        const response = await authRequest({method:'get', url: `${BASE_URL}/emotions/check/` })
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export {addEmotionService ,checkEmotionSubmissionService }