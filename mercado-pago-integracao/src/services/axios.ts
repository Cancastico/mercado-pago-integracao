import axios from "axios"
import * as dotenv from 'dotenv'
dotenv.config();

export const AxiosNode = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_IP,
    headers: {
        "Content-Type": "application/json",
    },
});