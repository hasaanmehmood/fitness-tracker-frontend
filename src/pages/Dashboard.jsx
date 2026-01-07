import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutAPI } from '../services/api';
import { userAPI } from '../services/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    CircularProgress,
    LinearProgress,
} from '@mui/material';
import {
    Add,
    Search,
    Delete,
    Edit,
    FitnessCenter,
    LocalFireDepartment,
    Timer,
    TrendingUp,
    CalendarMonth,
    EmojiEvents,
} from '@mui/icons-material';
import { format } from 'date-fns';



const Dashboard = () => {
    const [workouts, setWorkouts] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIntensity, setSelectedIntensity] = useState('ALL');
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await userAPI.getProfile();
            setProfile(response.data);
        } catch (error) {
            console.error('Load profile error:', error);
            toast.error('Failed to load profile');
        }
    };
    const navigate = useNavigate();

    const colors = {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFD93D',
        success: '#6BCF7F',
        purple: '#A78BFA',
        pink: '#FB7185',
    };

    useEffect(() => {
        loadWorkouts();
    }, []);

    useEffect(() => {
        filterWorkouts();
    }, [searchQuery, selectedIntensity, workouts]);



    const loadWorkouts = async () => {
        try {
            const response = await workoutAPI.getAll();
            setWorkouts(response.data);
            setFilteredWorkouts(response.data);
        } catch (error) {
            toast.error('Failed to load workouts');
        } finally {
            setLoading(false);
        }
    };


    const filterWorkouts = () => {
        let filtered = workouts;

        if (searchQuery) {
            filtered = filtered.filter((workout) =>
                workout.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedIntensity !== 'ALL') {
            filtered = filtered.filter(
                (workout) => workout.intensity === selectedIntensity
            );
        }

        setFilteredWorkouts(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                await workoutAPI.delete(id);
                toast.success('Workout deleted');
                loadWorkouts();
            } catch (error) {
                toast.error('Failed to delete workout');
            }
        }
    };

    const getIntensityColor = (intensity) => {
        switch (intensity) {
            case 'LOW':
                return colors.success;
            case 'MEDIUM':
                return colors.accent;
            case 'HIGH':
                return colors.primary;
            default:
                return colors.secondary;
        }
    };

    // Calculate statistics
    const stats = {
        total: workouts.length,
        totalMinutes: workouts.reduce((sum, w) => sum + (w.durationMinutes || 0), 0),
        totalCalories: workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
        avgDuration: workouts.length > 0
            ? Math.round(workouts.reduce((sum, w) => sum + (w.durationMinutes || 0), 0) / workouts.length)
            : 0,
        thisWeek: workouts.filter(w => {
            const workoutDate = new Date(w.workoutDate);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return workoutDate >= weekAgo;
        }).length,
        streak: 5, // Calculate actual streak
    };

    const weeklyGoal = 150; // minutes per week
    const weeklyProgress = (stats.totalMinutes / weeklyGoal) * 100;


    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                }}
            >
                <CircularProgress size={60} sx={{ color: colors.primary }} />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', pb: 6 }}>
            <Container maxWidth="xl" sx={{ pt: 4 }}>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: '#1F2937' }}>
                        {profile?.username ? `${profile.username.charAt(0).toUpperCase() + profile.username.slice(1)}'s Dashboard` : 'My Dashboard'}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Track your progress and stay motivated! 💪
                    </Typography>
                </Box>

                {/* Statistics Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                            <Card
                                sx={{
                                    background: `linear-gradient(135deg, ${colors.primary} 0%, #E85555 100%)`,
                                    color: 'white',
                                    height: '100%',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <FitnessCenter sx={{ fontSize: 40 }} />
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h3" sx={{ fontWeight: 900 }}>
                                                {stats.total}
                                            </Typography>
                                            <Typography variant="body2">Workouts</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                        Total logged
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                            <Card
                                sx={{
                                    background: `linear-gradient(135deg, ${colors.secondary} 0%, #3CB8B0 100%)`,
                                    color: 'white',
                                    height: '100%',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Timer sx={{ fontSize: 40 }} />
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h3" sx={{ fontWeight: 900 }}>
                                                {stats.totalMinutes}
                                            </Typography>
                                            <Typography variant="body2">Minutes</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                        Total time
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                            <Card
                                sx={{
                                    background: `linear-gradient(135deg, ${colors.accent} 0%, #FFC929 100%)`,
                                    color: '#1F2937',
                                    height: '100%',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <LocalFireDepartment sx={{ fontSize: 40 }} />
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h3" sx={{ fontWeight: 900 }}>
                                                {stats.totalCalories}
                                            </Typography>
                                            <Typography variant="body2">Calories</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="caption">
                                        Burned total
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                            <Card
                                sx={{
                                    background: `linear-gradient(135deg, ${colors.success} 0%, #5BB86F 100%)`,
                                    color: 'white',
                                    height: '100%',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <TrendingUp sx={{ fontSize: 40 }} />
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h3" sx={{ fontWeight: 900 }}>
                                                {stats.avgDuration}
                                            </Typography>
                                            <Typography variant="body2">Minutes</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                        Avg duration
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                            <Card
                                sx={{
                                    background: `linear-gradient(135deg, ${colors.purple} 0%, #9178E8 100%)`,
                                    color: 'white',
                                    height: '100%',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <CalendarMonth sx={{ fontSize: 40 }} />
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h3" sx={{ fontWeight: 900 }}>
                                                {stats.thisWeek}
                                            </Typography>
                                            <Typography variant="body2">This Week</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                        Weekly workouts
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                            <Card
                                sx={{
                                    background: `linear-gradient(135deg, ${colors.pink} 0%, #F85D7A 100%)`,
                                    color: 'white',
                                    height: '100%',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <EmojiEvents sx={{ fontSize: 40 }} />
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h3" sx={{ fontWeight: 900 }}>
                                                {stats.streak}
                                            </Typography>
                                            <Typography variant="body2">Day Streak</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                        Keep it up!
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* Weekly Goal Progress */}
                <Card sx={{ mb: 4, borderLeft: `4px solid ${colors.primary}` }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Weekly Goal
                                </Typography>
                                <Typography color="text.secondary">
                                    {stats.totalMinutes} / {weeklyGoal} minutes
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: colors.primary }}>
                                {Math.min(weeklyProgress, 100).toFixed(0)}%
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={Math.min(weeklyProgress, 100)}
                            sx={{
                                height: 10,
                                borderRadius: 5,
                                bgcolor: '#E5E7EB',
                                '& .MuiLinearProgress-bar': {
                                    background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.pink} 100%)`,
                                    borderRadius: 5,
                                },
                            }}
                        />
                    </CardContent>
                </Card>

                {/* Filters and Search */}
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Search workouts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    bgcolor: 'white',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: colors.primary,
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                {['ALL', 'LOW', 'MEDIUM', 'HIGH'].map((intensity) => (
                                    <Chip
                                        key={intensity}
                                        label={intensity}
                                        onClick={() => setSelectedIntensity(intensity)}
                                        sx={{
                                            bgcolor: selectedIntensity === intensity ? colors.primary : 'white',
                                            color: selectedIntensity === intensity ? 'white' : '#1F2937',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: selectedIntensity === intensity ? colors.primary : '#F3F4F6',
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Create Button */}
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Recent Workouts
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => navigate('/workouts/create')}
                        sx={{
                            bgcolor: colors.primary,
                            px: 3,
                            py: 1.5,
                            fontWeight: 700,
                            '&:hover': { bgcolor: '#E85555' },
                        }}
                    >
                        New Workout
                    </Button>
                </Box>

                {/* Workouts List */}
                {filteredWorkouts.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <FitnessCenter sx={{ fontSize: 100, color: '#D1D5DB', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            {searchQuery || selectedIntensity !== 'ALL'
                                ? 'No workouts found'
                                : 'No workouts yet. Create your first workout!'}
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {filteredWorkouts.map((workout, index) => (
                            <Grid item xs={12} sm={6} md={4} key={workout.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card
                                        sx={{
                                            height: '100%',
                                            borderLeft: `4px solid ${getIntensityColor(workout.intensity)}`,
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                boxShadow: `0 8px 24px ${getIntensityColor(workout.intensity)}40`,
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    mb: 2,
                                                }}
                                            >
                                                <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                                                    {workout.name}
                                                </Typography>
                                                <Chip
                                                    label={workout.intensity}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: getIntensityColor(workout.intensity),
                                                        color: 'white',
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    mb: 2,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    minHeight: 40,
                                                }}
                                            >
                                                {workout.description || 'No description'}
                                            </Typography>

                                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <Timer sx={{ fontSize: 18, color: colors.secondary }} />
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {workout.durationMinutes} min
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <LocalFireDepartment sx={{ fontSize: 18, color: colors.accent }} />
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {workout.caloriesBurned || 0} cal
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                                                {format(new Date(workout.workoutDate), 'MMM dd, yyyy • h:mm a')}
                                            </Typography>

                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => navigate(`/workouts/${workout.id}`)}
                                                    sx={{
                                                        borderColor: colors.primary,
                                                        color: colors.primary,
                                                        flex: 1,
                                                        fontWeight: 600,
                                                        '&:hover': { borderColor: colors.primary, bgcolor: `${colors.primary}10` },
                                                    }}
                                                >
                                                    View
                                                </Button>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => navigate(`/workouts/edit/${workout.id}`)}
                                                    sx={{ color: colors.secondary }}
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDelete(workout.id)}
                                                    sx={{ color: colors.primary }}
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default Dashboard;