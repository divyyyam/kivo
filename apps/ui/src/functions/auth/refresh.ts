import axios from "axios";
import http from "../http";
import { AuthResponse } from "./types";

export const refresh = async() : Promise<AuthResponse> =>{
    try {
        const res = await http.post('/auth/refresh',{},{
            withCredentials:true,
        })
        return res.data
    } catch (error) {
        if(axios.isAxiosError(error)){
            const status = error.response?.status;
            const message = error.response?.data?.message || error.message || "Failed to refresh, retry login"
            throw{
                status,
                message
            }
        }
        throw {
            status:500,
            message : "Unexpected error occured, retry login"
        }
    }
}