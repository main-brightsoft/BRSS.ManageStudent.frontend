// Login.tsx
import "./Login.scss";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
    Box
} from "@mui/material";
import useLogin from "../../../hooks/useLogin";

const GOOGLE_CLIENT_ID = "422640634405-9vicn8burnaopoog4pjc4rbmm32tdq7f.apps.googleusercontent.com";

const Login = () => {
    const {
        formData,
        handleChange,
        handleSubmit,
        onGoogleSuccess,
        onGoogleFailure,
        loading,
        snackbarOpen,
        snackbarMessage,
        handleSnackbarClose,
    } = useLogin();

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={onGoogleSuccess}
                        onError={onGoogleFailure}
                    />
                </GoogleOAuthProvider>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
