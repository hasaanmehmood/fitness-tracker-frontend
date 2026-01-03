import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Link,
    Grid,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, FitnessCenter } from '@mui/icons-material';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        weight: '',
        height: '',
        fitnessGoal: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateForm = () => {
        const newErrors = {};

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const FITNESS_GOALS = [
        'Weight Loss',
        'Muscle Gain',
        'Maintain Fitness',
        'Improve Endurance',
        'Increase Strength',
        'General Health',
    ];


    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        if (!validateForm()) return;

        setLoading(true);
        try {
            const payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                weight: formData.weight ? parseFloat(formData.weight) : null,
                height: formData.height ? parseFloat(formData.height) : null,
                fitnessGoal: formData.fitnessGoal || null,
            };

            await register(payload);
            navigate('/login');
        } catch (error) {
            if (error.response?.status === 409) {
                setServerError('User already exists with this email or username');
            } else if (error.response?.data?.message) {
                setServerError(error.response.data.message);
            } else {
                setServerError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                overflow: 'hidden',
                py: 7,
            }}
        >
            {/* Background Video */}
            <Box
                component="video"
                autoPlay
                muted
                loop
                playsInline
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -2,
                }}
            >
                <source
                    src="https://assets.mixkit.co/videos/722/722-720.mp4"
                    type="video/mp4"
                />
            </Box>
            {/* CONTENT */}
            <Container maxWidth="md" sx={{ py: 6 }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
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
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        }}
                    >

                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <FitnessCenter sx={{ fontSize: 60, color: 'yellow' }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, mt: 2 }}>
                                Create Account
                            </Typography>
                            <Typography color="text.secondary">
                                Start your fitness journey today
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{
                                            sx: {
                                                color: 'rgba(255,255,255,0.85)',
                                                fontWeight: 500,
                                                '&.Mui-focused': {
                                                    color: '#FACC15',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        error={!!errors.username}
                                        helperText={errors.username}
                                        required
                                        InputLabelProps={{
                                            sx: {
                                                color: 'rgba(255,255,255,0.85)',
                                                fontWeight: 500,
                                                '&.Mui-focused': {
                                                    color: '#FACC15',
                                                },
                                            },
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required
                                        InputLabelProps={{
                                            sx: {
                                                color: 'rgba(255,255,255,0.85)',
                                                fontWeight: 500,
                                                '&.Mui-focused': {
                                                    color: '#FACC15',
                                                },
                                            },
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={!!errors.password}
                                        helperText={errors.password || 'Minimum 8 characters'}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                color: 'rgba(255,255,255,0.85)',
                                                fontWeight: 500,
                                                '&.Mui-focused': {
                                                    color: '#FACC15',
                                                },
                                            },
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Weight (kg)"
                                        name="weight"
                                        type="number"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.1, min: 0 }}
                                        InputLabelProps={{
                                            sx: {
                                                color: 'rgba(255,255,255,0.85)',
                                                fontWeight: 500,
                                                '&.Mui-focused': {
                                                    color: '#FACC15',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Height (cm)"
                                        name="height"
                                        type="number"
                                        value={formData.height}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.1, min: 0 }}
                                        InputLabelProps={{
                                            sx: {
                                                color: 'rgba(255,255,255,0.85)',
                                                fontWeight: 500,
                                                '&.Mui-focused': {
                                                    color: '#FACC15',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        name="fitnessGoal"
                                        value={formData.fitnessGoal}
                                        onChange={handleChange}
                                        SelectProps={{
                                            displayEmpty: true,
                                            renderValue: (selected) =>
                                                selected ? (
                                                    selected
                                                ) : (
                                                    <span style={{ color: 'rgba(255,255,255,0.85)' }}>
          Fitness Goal
        </span>
                                                ),
                                        }}
                                        sx={{
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
                                            '& .MuiSvgIcon-root': {
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {FITNESS_GOALS.map((goal) => (
                                            <MenuItem key={goal} value={goal}>
                                                {goal}
                                            </MenuItem>
                                        ))}
                                    </TextField>




                                </Grid>

                            </Grid>
                            {serverError && (
                                <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                                    {serverError}
                                </Typography>
                            )}

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    bgcolor: '#FACC15',
                                    fontWeight: 600,
                                        '&:hover': {
                                            bgcolor: '#EAB308', // darker golden yellow
                                            boxShadow: '0 14px 45px rgba(250,204,21,0.65)',
                                            transform: 'translateY(-2px)',
                                        },

                                        '&:active': {
                                            transform: 'translateY(0)',
                                            boxShadow: '0 8px 20px rgba(250,204,21,0.4)',
                                        },

                                        '&.Mui-disabled': {
                                            bgcolor: 'rgba(250,204,21,0.5)',
                                            color: '#1F2937',}
                                }}
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    sx={{
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        color: '#FACC15',
                                        '&:hover': {
                                            color: '#EAB308',
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Sign In
                                </Link>

                            </Typography>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Register;