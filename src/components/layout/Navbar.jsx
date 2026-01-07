import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
} from '@mui/material';
import {
    FitnessCenter,
    AccountCircle,
    Dashboard,
    ExitToApp,
} from '@mui/icons-material';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
        navigate('/');
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: `
      linear-gradient(
        180deg,
        rgba(255,255,255,0.08),
        rgba(255,255,255,0.02)
      ),
      rgba(15, 23, 42, 0.15)
    `,
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',

                borderBottom: '1px solid rgba(255,255,255,0.18)',

                boxShadow: `
      0 1px 0 rgba(255,255,255,0.15),
      0 12px 30px rgba(0,0,0,0.35)
    `,
            }}
        >

        <Toolbar sx={{ minHeight: 72 }}>
                {/* Logo */}
                <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => navigate('/dashboard')}
                >
                    <FitnessCenter
                        sx={{
                            fontSize: 28,
                            mr: 1.5,
                            color: 'yellow', // cyan accent
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '-0.3px',
                            color: '#A9A9A9',
                        }}
                    >
                        Fitness Tracker
                    </Typography>
                </Box>

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        startIcon={<Dashboard />}
                        onClick={() => navigate('/dashboard')}
                        sx={{
                            color: '#A9A9A9',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 2,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.08)',
                            },
                        }}
                    >
                        Dashboard
                    </Button>

                    {/* Avatar Menu */}
                    <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: 'rgba(255,255,255,0.2)'
                            }}
                            src={user?.profileImage ? `http://localhost:8080${user.profileImage}` : ''}
                            imgProps={{ crossOrigin: 'anonymous' }}
                        >
                            {user?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                background: 'rgba(15, 23, 42, 0.85)',
                                backdropFilter: 'blur(14px)',
                                WebkitBackdropFilter: 'blur(14px)',
                                borderRadius: 3,
                                border: '1px solid rgba(255,255,255,0.12)',
                                color: '#E5E7EB',
                                minWidth: 180,
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                navigate('/profile');
                            }}
                            sx={{
                                gap: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                },
                            }}
                        >
                            <AccountCircle fontSize="small" />
                            Profile
                        </MenuItem>

                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                gap: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                },
                            }}
                        >
                            <ExitToApp fontSize="small" />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
