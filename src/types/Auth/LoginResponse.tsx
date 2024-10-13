import {UserResponse} from "../User/UserResponse.tsx";

export interface LoginResponse {
    user: UserResponse,
    token: string
}