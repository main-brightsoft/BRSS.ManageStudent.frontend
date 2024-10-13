import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { logout, selectIsLoggedIn } from "../../store/AuthSlice";
import PathConstants from "../../routes/PathConstants";

const Header: React.FC = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiresAt");
        localStorage.removeItem("user");
        dispatch(logout());
        handleClose();
        navigate(PathConstants.LOGIN);
    };

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Branding */}
                <Typography
                    variant="h6"
                    component={Link}
                    to={PathConstants.HOME}
                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                >
                    Manage Students
                </Typography>

                {/* Navigation Links */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Button color="inherit" component={Link} to={PathConstants.STUDENTS}>
                        Students List
                    </Button>
                    <Button color="inherit" component={Link} to={PathConstants.CLASSES}>
                        Classes List
                    </Button>
                </Box>

                {/* Account Menu */}
                {isLoggedIn ? (
                    <>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem component={Link} to={PathConstants.USERS_PROFILE}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Button color="inherit" component={Link} to={PathConstants.LOGIN}>
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to={PathConstants.REGISTER}>
                            Sign Up
                        </Button>
                    </Box>
                )}

                {/* Mobile Menu Toggle */}
                <IconButton
                    color="inherit"
                    edge="end"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={handleMobileMenuToggle}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <Box sx={{ display: { xs: 'block', md: 'none' }, px: 2 }}>
                    <Button color="inherit" component={Link} to={PathConstants.STUDENTS}>
                        Students List
                    </Button>
                    <Button color="inherit" component={Link} to={PathConstants.CLASSES}>
                        Classes List
                    </Button>
                    {isLoggedIn ? (
                        <>
                            <Button color="inherit" component={Link} to={PathConstants.USERS_PROFILE}>
                                Profile
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to={PathConstants.LOGIN}>
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to={PathConstants.REGISTER}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            )}
        </AppBar>
    );
};

export default Header;
