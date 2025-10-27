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

export {getAllGoalsService}