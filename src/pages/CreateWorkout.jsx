import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { workoutAPI } from '../services/api';
import toast from 'react-hot-toast';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    MenuItem,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';

const CreateWorkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        workoutDate: new Date().toISOString().slice(0, 16),
        durationMinutes: '',
        caloriesBurned: '',
        intensity: 'MEDIUM',
        notes: '',
    });

    useEffect(() => {
        if (id) {
            loadWorkout();
        }
    }, [id]);

    const loadWorkout = async () => {
        try {
            const response = await workoutAPI.getById(id);
            const workout = response.data;
            setFormData({
                name: workout.name,
                description: workout.description || '',
                workoutDate: new Date(workout.workoutDate).toISOString().slice(0, 16),
                durationMinutes: workout.durationMinutes || '',
                caloriesBurned: workout.caloriesBurned || '',
                intensity: workout.intensity,
                notes: workout.notes || '',
            });
        } catch (error) {
            toast.error('Failed to load workout');
            navigate('/dashboard');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                durationMinutes: parseInt(formData.durationMinutes),
                caloriesBurned: parseInt(formData.caloriesBurned),
                workoutDate: new Date(formData.workoutDate).toISOString(),
                exercises: [],
            };

            if (id) {
                await workoutAPI.update(id, payload);
                toast.success('Workout updated successfully');
            } else {
                await workoutAPI.create(payload);
                toast.success('Workout created successfully');
            }

            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save workout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                    {id ? 'Edit Workout' : 'Create New Workout'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Workout Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Morning Cardio"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                placeholder="Describe your workout..."
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Workout Date & Time"
                                name="workoutDate"
                                type="datetime-local"
                                value={formData.workoutDate}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Intensity"
                                name="intensity"
                                value={formData.intensity}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="LOW">Low</MenuItem>
                                <MenuItem value="MEDIUM">Medium</MenuItem>
                                <MenuItem value="HIGH">High</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Duration (minutes)"
                                name="durationMinutes"
                                type="number"
                                value={formData.durationMinutes}
                                onChange={handleChange}
                                required
                                inputProps={{ min: 1 }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Calories Burned"
                                name="caloriesBurned"
                                type="number"
                                value={formData.caloriesBurned}
                                onChange={handleChange}
                                inputProps={{ min: 0 }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                placeholder="Any additional notes..."
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<Cancel />}
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<Save />}
                                    disabled={loading}
                                    sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    }}
                                >
                                    {loading ? 'Saving...' : id ? 'Update' : 'Create'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateWorkout;