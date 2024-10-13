import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                py: 3,
                textAlign: 'center',
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2">
                    © 2024 My App. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
