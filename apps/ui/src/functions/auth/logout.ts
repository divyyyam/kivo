import http from "../http";
import axios from "axios";
 
export const logout = async(): Promise<{
    message:string
}> =>{
    try {
        const res = await http.get("/auth/logout",{
            withCredentials:true,
        })
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const status = error.response?.status;
            const message = error.response?.data?.message || error.message || "Failed to logout"
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