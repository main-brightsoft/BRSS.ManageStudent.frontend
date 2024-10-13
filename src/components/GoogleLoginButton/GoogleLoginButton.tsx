import { useEffect } from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google'; // Import a Google icon

const CustomGoogleLogin = () => {
    const clientId = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

    useEffect(() => {
        // Load the Google API client
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: clientId,
                scope: 'profile email',
            });
        });
    }, []);

    const onGoogleSignIn = () => {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();
        GoogleAuth.signIn().then((user) => {
            const profile = user.getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Email: ' + profile.getEmail());
            // Handle the successful login here (e.g., send user data to your server)
        }).catch((error) => {
            console.error('Login failed: res:', error);
            // Handle login failure here
        });
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />} // Use Google icon
            onClick={onGoogleSignIn}
            style={{
                marginTop: '20px',
            }}
        >
            Login with Google
        </Button>
    );
};

export default CustomGoogleLogin;
