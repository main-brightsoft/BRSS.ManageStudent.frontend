import {baseAxios} from '../common/CoreAxios.tsx';
import { LoginRequest } from "../types/Auth/LoginRequest";
import { LoginResponse } from "../types/Auth/LoginResponse";
import { GoogleLoginRequest } from "../types/Auth/GoogleLoginRequest";
import {errorApiHandler} from "../common/ErrorApiHandler.tsx";

const USER_LOGIN_URL = 'http://localhost:5072/api/auth/login';
const USER_LOGIN_GOOGLE_URL = 'http://localhost:5072/api/Login/google-login';

export const loginUser = async (userData: LoginRequest): Promise<LoginResponse | null> => {
    try {
        const response = await baseAxios.post<LoginResponse>(USER_LOGIN_URL, userData);
        return response.data;
    } catch (error: any) {
        errorApiHandler(error);
    }
};

export const loginGoogle = async (data: GoogleLoginRequest): Promise<LoginResponse | null> => {
    try {
        const response = await baseAxios.post<LoginResponse>(USER_LOGIN_GOOGLE_URL, data);
        return response.data;
    } catch (error: any) {
        errorApiHandler(error);
    }
};

const AuthService = {
    loginUser,
    loginGoogle,
};

export default AuthService;
