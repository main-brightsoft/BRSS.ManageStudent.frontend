import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{ flexGrow: 1, py: 3 }}
            >
                <Container maxWidth="lg">
                    {children}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
