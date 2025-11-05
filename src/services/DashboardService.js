import axios from "axios";
import { authRequest } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL


async function getDashboardInfoService() {
    try {
        const response = await authRequest({method:'get', url: `${BASE_URL}/dashboard/`})
        return response
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export {getDashboardInfoService}