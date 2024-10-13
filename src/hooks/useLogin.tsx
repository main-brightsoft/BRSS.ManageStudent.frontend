// useLogin.ts
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { login } from "../store/AuthSlice";
import { LoginRequest } from "../types/Auth/LoginRequest";
import { CredentialResponse } from "@react-oauth/google";

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const [formData, setFormData] = useState<LoginRequest>({
        userName: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginUser(formData);
    };

    const loginUser = async (formData: LoginRequest) => {
        setLoading(true);
        setError("");

        try {
            const responseLogin = await AuthService.loginUser(formData);
            if (responseLogin) {
                localStorage.setItem("token", responseLogin.token);
                localStorage.setItem("user", JSON.stringify(responseLogin.user));
                dispatch(login());
                navigate("/home");
            }
        } catch (err: any) {
            setError(err.message || "Login failed. Please try again.");
            showSnackbar(error);
        } finally {
            setLoading(false);
        }
    };

    const loginGoogle = async (tokenId: string) => {
        setLoading(true);
        setError("");

        const googleLoginRequest = { idToken: tokenId };
        try {
            const responseLogin = await AuthService.loginGoogle(googleLoginRequest);
            if (responseLogin) {
                localStorage.setItem("token", responseLogin.token);
                localStorage.setItem("user", JSON.stringify(responseLogin.user));
                dispatch(login());
                navigate("/home"); // Replace with your home path
            }
        } catch (err: any) {
            setError(err.messages || "Google login failed. Please try again.");
            showSnackbar(error);
        } finally {
            setLoading(false);
        }
    };

    const onGoogleSuccess = async (response: CredentialResponse) => {
        const tokenId = response.credential;
        if (tokenId) {
            await loginGoogle(tokenId);
        } else {
            handleSnackbarClose();
            setSnackbarMessage("Google login failed: missing credential.");
        }
    };

    const onGoogleFailure = () => {
        handleSnackbarClose();
        setSnackbarMessage("Google login failed. Please try again.");
    };

    const showSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        onGoogleSuccess,
        onGoogleFailure,
        loginUser,
        loginGoogle,
        loading,
        snackbarOpen,
        snackbarMessage,
        handleSnackbarClose,
    };
};

export default useLogin;
