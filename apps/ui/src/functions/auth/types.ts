export interface RegisterPayload {
    email:string;
    password:string;
    username:string;
}

export interface AuthResponse {
    id:string;
    username:string;
    email:string;
    createdAt:string;
}

export interface LoginPayload {
    email:string;
    password:string;
}