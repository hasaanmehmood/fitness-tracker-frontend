import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Avatar,
} from '@mui/material';
import {
    FitnessCenter,
    TrendingUp,
    Timeline,
    EmojiEvents,
    Group,
    LocalFireDepartment,
} from '@mui/icons-material';

const Landing = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <FitnessCenter sx={{ fontSize: 50, color: '#667eea' }} />,
            title: 'Track Workouts',
            description: 'Log your exercises, sets, reps, and track your progress over time.',
        },
        {
            icon: <TrendingUp sx={{ fontSize: 50, color: '#764ba2' }} />,
            title: 'Monitor Progress',
            description: 'Visualize your fitness journey with detailed statistics and charts.',
        },
        {
            icon: <Timeline sx={{ fontSize: 50, color: '#f093fb' }} />,
            title: 'Set Goals',
            description: 'Define your fitness goals and stay motivated to achieve them.',
        },
        {
            icon: <EmojiEvents sx={{ fontSize: 50, color: '#ffd700' }} />,
            title: 'Achievements',
            description: 'Earn badges and celebrate your milestones along the way.',
        },
        {
            icon: <Group sx={{ fontSize: 50, color: '#4facfe' }} />,
            title: 'Community',
            description: 'Connect with like-minded fitness enthusiasts and share tips.',
        },
        {
            icon: <LocalFireDepartment sx={{ fontSize: 50, color: '#fa709a' }} />,
            title: 'Stay Motivated',
            description: 'Get daily reminders and motivational quotes to keep you going.',
        },
    ];

    const stats = [
        { number: '10K+', label: 'Active Users' },
        { number: '50K+', label: 'Workouts Logged' },
        { number: '100+', label: 'Exercises' },
        { number: '4.8★', label: 'User Rating' },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Animated Background Elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.1,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '2.5rem', md: '4rem' },
                                        fontWeight: 800,
                                        mb: 2,
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    Transform Your
                                    <br />
                                    <span style={{ color: '#ffd700' }}>Fitness Journey</span>
                                </Typography>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 4,
                                        opacity: 0.9,
                                        fontSize: { xs: '1rem', md: '1.5rem' },
                                    }}
                                >
                                    Track workouts, monitor progress, and achieve your fitness goals
                                    with our comprehensive fitness tracking platform.
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={() => navigate('/register')}
                                            sx={{
                                                bgcolor: 'white',
                                                color: '#667eea',
                                                px: 4,
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    bgcolor: '#f0f0f0',
                                                },
                                            }}
                                        >
                                            Get Started Free
                                        </Button>
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={() => navigate('/login')}
                                            sx={{
                                                borderColor: 'white',
                                                color: 'white',
                                                px: 4,
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    bgcolor: 'rgba(255,255,255,0.1)',
                                                },
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                    </motion.div>
                                </Box>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <Box
                                    component="img"
                                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"
                                    alt="Fitness"
                                    sx={{
                                        width: '100%',
                                        borderRadius: 4,
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                    }}
                                />
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{
                        position: 'absolute',
                        bottom: 30,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <Typography sx={{ opacity: 0.7 }}>Scroll to explore</Typography>
                </motion.div>
            </Box>

            {/* Stats Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 800,
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Features Section */}
            <Box sx={{ bgcolor: '#f5f5f5', py: 10 }}>
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            variant="h2"
                            align="center"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '2rem', md: '3rem' },
                            }}
                        >
                            Everything You Need
                        </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            color="text.secondary"
                            sx={{ mb: 6 }}
                        >
                            Powerful features to help you reach your fitness goals
                        </Typography>
                    </motion.div>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Card
                                        sx={{
                                            height: '100%',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                            <Avatar
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    mx: 'auto',
                                                    mb: 2,
                                                    bgcolor: 'transparent',
                                                }}
                                            >
                                                {feature.icon}
                                            </Avatar>
                                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 10,
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                            Ready to Start Your Journey?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            Join thousands of users already transforming their lives
                        </Typography>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/register')}
                                sx={{
                                    bgcolor: 'white',
                                    color: '#667eea',
                                    px: 6,
                                    py: 2,
                                    fontSize: '1.2rem',
                                    fontWeight: 600,
                                    '&:hover': {
                                        bgcolor: '#f0f0f0',
                                    },
                                }}
                            >
                                Start Free Today
                            </Button>
                        </motion.div>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
};

export default Landing;