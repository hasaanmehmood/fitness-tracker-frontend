import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workoutAPI } from '../services/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    Container,
    Paper,
    Typography,
    Box,
    Button,
    Chip,
    Grid,
    Card,
    CardContent,
    Divider,
} from '@mui/material';
import {
    ArrowBack,
    Edit,
    Delete,
    Timer,
    LocalFireDepartment,
    FitnessCenter,
    CalendarToday,
} from '@mui/icons-material';
import { format } from 'date-fns';

const WorkoutDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWorkout();
    }, [id]);

    const loadWorkout = async () => {
        try {
            const response = await workoutAPI.getById(id);
            setWorkout(response.data);
        } catch (error) {
            toast.error('Failed to load workout');
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                await workoutAPI.delete(id);
                toast.success('Workout deleted');
                navigate('/dashboard');
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

    if (loading || !workout) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => navigate('/dashboard')}
                    >
                        Back
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => navigate(`/workouts/edit/${id}`)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>

                {/* Main Content */}
                <Paper elevation={3} sx={{ p: 4 }}>
                    {/* Title and Intensity */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 3,
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {workout.name}
                        </Typography>
                        <Chip
                            label={workout.intensity}
                            color={getIntensityColor(workout.intensity)}
                            size="large"
                        />
                    </Box>

                    {/* Description */}
                    {workout.description && (
                        <Typography color="text.secondary" sx={{ mb: 3, fontSize: 18 }}>
                            {workout.description}
                        </Typography>
                    )}

                    <Divider sx={{ my: 3 }} />

                    {/* Stats Grid */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={6} sm={3}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Timer sx={{ mr: 1 }} />
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        {workout.durationMinutes}
                                    </Typography>
                                    <Typography>Minutes</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    color: 'white',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocalFireDepartment sx={{ mr: 1 }} />
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        {workout.caloriesBurned || 0}
                                    </Typography>
                                    <Typography>Calories</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                    color: 'white',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <FitnessCenter sx={{ mr: 1 }} />
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        {workout.exercises?.length || 0}
                                    </Typography>
                                    <Typography>Exercises</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                    color: 'white',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <CalendarToday sx={{ mr: 1 }} />
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                        {format(new Date(workout.workoutDate), 'MMM dd, yyyy')}
                                    </Typography>
                                    <Typography>
                                        {format(new Date(workout.workoutDate), 'h:mm a')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* Notes */}
                    {workout.notes && (
                        <>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Notes
                            </Typography>
                            <Paper
                                elevation={0}
                                sx={{ p: 2, bgcolor: '#f5f5f5', mb: 3, borderRadius: 2 }}
                            >
                                <Typography>{workout.notes}</Typography>
                            </Paper>
                        </>
                    )}

                    {/* Exercises */}
                    {workout.exercises && workout.exercises.length > 0 && (
                        <>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Exercises
                            </Typography>
                            <Grid container spacing={2}>
                                {workout.exercises.map((exercise, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant="h6" sx={{ mb: 1 }}>
                                                    {exercise.exerciseName}
                                                </Typography>
                                                {exercise.sets && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        {exercise.sets} sets × {exercise.reps} reps
                                                        {exercise.weight && ` @ ${exercise.weight}kg`}
                                                    </Typography>
                                                )}
                                                {exercise.durationSeconds && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Duration: {exercise.durationSeconds}s
                                                    </Typography>
                                                )}
                                                {exercise.distance && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Distance: {exercise.distance}km
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </Paper>
            </motion.div>
        </Container>
    );
};

export default WorkoutDetail;