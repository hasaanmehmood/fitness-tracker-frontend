import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import toast from 'react-hot-toast';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    Avatar,
    Divider,
    CircularProgress,
} from '@mui/material';
import { Save, PhotoCamera } from '@mui/icons-material';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        weight: '',
        height: '',
        fitnessGoal: '',
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await userAPI.getProfile();
            console.log('Profile loaded:', response.data); // Debug
            setProfile(response.data);
            setFormData({
                fullName: response.data.fullName || '',
                weight: response.data.weight || '',
                height: response.data.height || '',
                fitnessGoal: response.data.fitnessGoal || '',
            });
        } catch (error) {
            console.error('Load profile error:', error);
            toast.error('Failed to load profile');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // FIX: Convert to proper types
            const payload = {
                fullName: formData.fullName,
                weight: formData.weight ? parseFloat(formData.weight) : null,
                height: formData.height ? parseFloat(formData.height) : null,
                fitnessGoal: formData.fitnessGoal || null,
            };

            console.log('Updating profile with:', payload); // Debug

            await userAPI.updateProfile(payload);
            toast.success('Profile updated successfully');
            await loadProfile(); // Reload to show updated data
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Only JPG, PNG, and GIF files are allowed');
            return;
        }

        setUploading(true);
        try {
            console.log('Uploading file:', file.name, file.type, file.size); // Debug

            const response = await userAPI.uploadProfileImage(file);
            console.log('Upload response:', response.data); // Debug

            toast.success('Profile image updated');
            await loadProfile(); // Reload to show new image
        } catch (error) {
            console.error('Upload error:', error);
            console.error('Error response:', error.response?.data); // Debug
            toast.error(error.response?.data?.error || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    if (!profile) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                    My Profile
                </Typography>

                {/* Profile Image */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            mx: 'auto',
                            mb: 2,
                            fontSize: 48,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                        src={profile.profileImage}
                    >
                        {profile.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={uploading ? <CircularProgress size={20} /> : <PhotoCamera />}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload Photo'}
                        <input
                            type="file"
                            hidden
                            accept="image/jpeg,image/jpg,image/png,image/gif"
                            onChange={handleImageUpload}
                        />
                    </Button>
                    <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                        Max 5MB. JPG, PNG, or GIF
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Account Info */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Account Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                value={profile.username}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={profile.email}
                                disabled
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Profile Form */}
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Personal Information
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
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
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="BMI"
                                value={
                                    formData.weight && formData.height
                                        ? (
                                            parseFloat(formData.weight) /
                                            Math.pow(parseFloat(formData.height) / 100, 2)
                                        ).toFixed(1)
                                        : '-'
                                }
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Fitness Goal"
                                name="fitnessGoal"
                                value={formData.fitnessGoal}
                                onChange={handleChange}
                                placeholder="e.g., Weight Loss, Muscle Gain, Endurance"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                                    disabled={loading}
                                    sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        px: 4,
                                    }}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Profile;