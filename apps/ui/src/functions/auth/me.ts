import http from "../http";
import axios from "axios";
import { AuthResponse } from "./types";

export const me = async(): Promise<AuthResponse> =>{
    try {
        const res = await http.get("/auth/me",{
            withCredentials:true,
        })
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const status = error.response?.status;
            const message = error.response?.data?.message || error.message || "Failed to fetch user data"
            throw {
                status,
                message
            }
        }
        throw {
            status:500,
            message:"Unexpected error"
        }
    }
}