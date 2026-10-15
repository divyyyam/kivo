import http from "../http";
import axios from "axios";
import { AuthResponse, RegisterPayload } from "./types";

export const register = async(payload:RegisterPayload): Promise<AuthResponse> =>{
    try {
        const res = await http.post(`/auth/register`,payload,{
            withCredentials:true,
        });
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const status = error.response?.status;
            const message = error.response?.data?.message || error.message || "Failed to register";
            throw {
                status,message
            }
        }
        throw {
            status:500,
            message: "Unexpected error"
        }
    }

}