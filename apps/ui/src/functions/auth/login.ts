import http from "../http";
import { LoginPayload,AuthResponse } from "./types";
import axios from "axios";

export const login = async(payload:LoginPayload):Promise<AuthResponse> => {
    try {
        const res = await http.post(`/auth/login`,payload,{
            withCredentials:true,
        })
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const status = error.response?.status;
            const message = error.response?.data?.message || error.message || "Failed to login"
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