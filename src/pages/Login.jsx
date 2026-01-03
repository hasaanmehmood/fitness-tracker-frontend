import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Link,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, FitnessCenter } from '@mui/icons-material';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(credentials);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Background Video */}
            <Box
                component="video"
                autoPlay
                muted
                loop
                playsInline
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -2,

                }}
            >
                <source
                    src="https://assets.mixkit.co/videos/2984/2984-720.mp4"
                    type="video/mp4"
                />
            </Box>

            <Container maxWidth="sm" sx={{ py: 19 }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
                        }}
                    >
                        {/* Header */}
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <FitnessCenter sx={{ fontSize: 56, color: '#FACC15' }} />
                            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: 'white' }}>
                                Welcome Back
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                Sign in to continue your fitness journey
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <TextField
                                fullWidth
                                margin="normal"
                                placeholder="Username"
                                value={credentials.username}
                                onChange={(e) =>
                                    setCredentials({ ...credentials, username: e.target.value })
                                }
                                required
                                sx={inputStyles}
                            />

                            {/* Password */}
                            <TextField
                                fullWidth
                                margin="normal"
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={credentials.password}
                                onChange={(e) =>
                                    setCredentials({ ...credentials, password: e.target.value })
                                }
                                required
                                sx={inputStyles}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? (
                                                    <VisibilityOff sx={{ color: 'white' }} />
                                                ) : (
                                                    <Visibility sx={{ color: 'white' }} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Submit */}
                            <Button
                                fullWidth
                                type="submit"
                                size="large"
                                disabled={loading}
                                sx={{
                                    mt: 3,
                                    py: 1.6,
                                    fontWeight: 800,
                                    color: '#1F2937',
                                    bgcolor: '#FACC15',
                                    boxShadow: '0 10px 30px rgba(250,204,21,0.45)',
                                    '&:hover': {
                                        bgcolor: '#EAB308',
                                        boxShadow: '0 14px 40px rgba(250,204,21,0.6)',
                                    },
                                }}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>

                        {/* Footer */}
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                Don&apos;t have an account?{' '}
                                <Link
                                    component={RouterLink}
                                    to="/register"
                                    sx={{
                                        fontWeight: 700,
                                        color: '#FACC15',
                                        textDecoration: 'none',
                                        '&:hover': { textDecoration: 'underline' },
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

const inputStyles = {
    '& .MuiOutlinedInput-root': {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.25)',
        '& fieldset': {
            borderColor: 'rgba(255,255,255,0.4)',
        },
        '&:hover fieldset': {
            borderColor: '#FACC15',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FACC15',
        },
    },
};

export default Login;
