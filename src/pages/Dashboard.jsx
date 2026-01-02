import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutAPI } from '../services/api';
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
    Avatar,
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
} from '@mui/icons-material';
import { format } from 'date-fns';

const Dashboard = () => {
    const [workouts, setWorkouts] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIntensity, setSelectedIntensity] = useState('ALL');
    const navigate = useNavigate();

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

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((workout) =>
                workout.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by intensity
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
                return 'success';
            case 'MEDIUM':
                return 'warning';
            case 'HIGH':
                return 'error';
            default:
                return 'default';
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
    };

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
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    My Workouts
                </Typography>
                <Typography color="text.secondary">
                    Track and manage your fitness journey
                </Typography>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={6} sm={3}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Card
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <FitnessCenter sx={{ mr: 1 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        {stats.total}
                                    </Typography>
                                </Box>
                                <Typography>Total Workouts</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Card
                            sx={{
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                color: 'white',
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Timer sx={{ mr: 1 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        {stats.totalMinutes}
                                    </Typography>
                                </Box>
                                <Typography>Total Minutes</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Card
                            sx={{
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                color: 'white',
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <LocalFireDepartment sx={{ mr: 1 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        {stats.totalCalories}
                                    </Typography>
                                </Box>
                                <Typography>Calories Burned</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Card
                            sx={{
                                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                color: 'white',
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <TrendingUp sx={{ mr: 1 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        {stats.avgDuration}
                                    </Typography>
                                </Box>
                                <Typography>Avg Duration</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>

            {/* Filters and Search */}
            <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            {['ALL', 'LOW', 'MEDIUM', 'HIGH'].map((intensity) => (
                                <Chip
                                    key={intensity}
                                    label={intensity}
                                    onClick={() => setSelectedIntensity(intensity)}
                                    color={selectedIntensity === intensity ? 'primary' : 'default'}
                                    sx={{ cursor: 'pointer' }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Create Button */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/workouts/create')}
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        px: 3,
                    }}
                >
                    New Workout
                </Button>
            </Box>

            {/* Workouts List */}
            {filteredWorkouts.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <FitnessCenter sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
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
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                mb: 2,
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {workout.name}
                                            </Typography>
                                            <Chip
                                                label={workout.intensity}
                                                color={getIntensityColor(workout.intensity)}
                                                size="small"
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
                                            }}
                                        >
                                            {workout.description || 'No description'}
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Timer sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {workout.durationMinutes} min
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <LocalFireDepartment
                                                    sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }}
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    {workout.caloriesBurned || 0} cal
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Typography variant="caption" color="text.secondary">
                                            {format(new Date(workout.workoutDate), 'MMM dd, yyyy')}
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => navigate(`/workouts/${workout.id}`)}
                                            >
                                                View
                                            </Button>
                                            <IconButton
                                                size="small"
                                                onClick={() => navigate(`/workouts/edit/${workout.id}`)}
                                            >
                                                <Edit fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDelete(workout.id)}
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
    );
};

export default Dashboard;