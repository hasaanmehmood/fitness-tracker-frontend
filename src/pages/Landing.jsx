import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Avatar,
    AppBar,
    Toolbar,
    IconButton,
} from '@mui/material';
import {
    FitnessCenter,
    TrendingUp,
    Restaurant,
    EmojiEvents,
    People,
    Speed,
    Security,
    CloudUpload,
    Menu as MenuIcon,
} from '@mui/icons-material';



const Landing = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const features = [
        {
            icon: <FitnessCenter sx={{ fontSize: 50 }} />,
            title: 'Smart Workout Tracking',
            description: 'Log exercises, sets, reps, and weight with our intuitive interface.',
            color: '#FF6B6B',
        },
        {
            icon: <TrendingUp sx={{ fontSize: 50 }} />,
            title: 'Progress Analytics',
            description: 'Visualize your fitness journey with detailed charts and statistics.',
            color: '#4ECDC4',
        },
        {
            icon: <Restaurant sx={{ fontSize: 50 }} />,
            title: 'Nutrition Planning',
            description: 'Track calories, macros, and maintain a balanced diet.',
            color: '#FFD93D',
        },
        {
            icon: <EmojiEvents sx={{ fontSize: 50 }} />,
            title: 'Achievement System',
            description: 'Earn badges and stay motivated with gamified fitness goals.',
            color: '#6BCF7F',
        },
        {
            icon: <People sx={{ fontSize: 50 }} />,
            title: 'Community Support',
            description: 'Connect with fitness enthusiasts and share your progress.',
            color: '#A78BFA',
        },
        {
            icon: <CloudUpload sx={{ fontSize: 50 }} />,
            title: 'Cloud Sync',
            description: 'Access your data anywhere, anytime with secure cloud storage.',
            color: '#FB7185',
        },
    ];

    const stats = [
        { number: '50K+', label: 'Active Users', color: '#FF6B6B' },
        { number: '1M+', label: 'Workouts Logged', color: '#4ECDC4' },
        { number: '500+', label: 'Exercise Library', color: '#FFD93D' },
        { number: '4.9★', label: 'App Rating', color: '#6BCF7F' },
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Fitness Enthusiast',
            image: 'https://i.pravatar.cc/150?img=1',
            text: 'This app transformed my fitness journey! The analytics help me stay on track.',
            color: '#FF6B6B',
        },
        {
            name: 'Mike Chen',
            role: 'Personal Trainer',
            image: 'https://i.pravatar.cc/150?img=12',
            text: 'I recommend this to all my clients. The workout tracking is incredibly detailed.',
            color: '#4ECDC4',
        },
        {
            name: 'Emily Rodriguez',
            role: 'Marathon Runner',
            image: 'https://i.pravatar.cc/150?img=5',
            text: 'The progress tracking keeps me motivated. Best fitness app I have used!',
            color: '#A78BFA',
        },
    ];

    return (
        <Box sx={{ overflow: 'hidden' }}>
            {/* Navigation */}
            <AppBar
                position="fixed"
                enableColorOnDark
                color="transparent"
                sx={{
                    color: '#f3f4f6',
                    backgroundColor: 'rgba(15, 23, 42, 0.25) !important',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderBottom: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.35)',

                }}
            >

            <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <FitnessCenter sx={{ fontSize: 32, color: 'yellow', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#f3f4f6' }}>
                            FitTrack.
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                        <Button sx={{ color: '#f3f4f6', fontWeight: 600 }}>Features</Button>
                        <Button sx={{ color: '#f3f4f6', fontWeight: 600 }}>Pricing</Button>
                        <Button sx={{ color: '#f3f4f6', fontWeight: 600 }}>About</Button>
                    </Box>
                    <Box sx={{ ml: 3, display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/login')}
                            sx={{
                                borderColor: '#FFD93D',
                                color: '#FFD93D',
                                fontWeight: 600,
                                borderWidth: 2,
                                '&:hover': {
                                    borderColor: '#FFC929',
                                    bgcolor: 'rgba(255,217,61,0.15)',
                                    borderWidth: 2,
                                },
                            }}
                        >
                            Sign In
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => navigate('/register')}
                            sx={{
                                bgcolor: '#FFD93D',
                                color: '#1F2937',
                                fontWeight: 700,
                                boxShadow: '0 6px 24px rgba(255,217,61,0.45)',
                                '&:hover': {
                                    bgcolor: '#FFC929',
                                    boxShadow: '0 10px 32px rgba(255,217,61,0.6)',
                                },
                            }}
                        >
                            Get Started
                        </Button>

                    </Box>
                    <IconButton sx={{ ml: 2, display: { xs: 'flex', md: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                ref={heroRef}
                sx={{
                    minHeight: '100vh',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',

                }}
            >


            <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(15px)',

                    }}
                />

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                    }}
                >
                    <source
                        src="https://assets.mixkit.co/videos/42898/42898-720.mp4"
                        type="video/mp4"
                    />
                </video>

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                style={{ y, opacity }}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: '3rem', md: '5rem' },
                                        fontWeight: 900,
                                        color: 'white',
                                        lineHeight: 1.1,
                                        mb: 3,
                                    }}
                                >
                                    Your Fitness
                                    <br />
                                    <span style={{ color: '#FFD93D' }}>Journey Starts</span>
                                    <br />
                                    Here.
                                </Typography>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: 'rgba(255,255,255,0.9)',
                                        mb: 4,
                                        fontWeight: 400,
                                    }}
                                >
                                    Track workouts, monitor progress, achieve your goals.
                                    The most powerful fitness tracking app designed for your success.
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={() => navigate('/register')}
                                            sx={{
                                                bgcolor: '#FFD93D',
                                                color: '#1F2937',
                                                px: 5,
                                                py: 2,
                                                fontSize: '1.2rem',
                                                fontWeight: 700,
                                                boxShadow: '0 8px 32px rgba(255,217,61,0.4)',
                                                '&:hover': {
                                                    bgcolor: '#FFC929',
                                                    transform: 'translateY(-2px)',
                                                },
                                            }}
                                        >
                                            Start Free Trial
                                        </Button>
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={() => ('/about')}
                                            sx={{
                                                borderColor: 'white',
                                                color: 'white',
                                                px: 5,
                                                py: 2,
                                                fontSize: '1.2rem',
                                                fontWeight: 700,
                                                borderWidth: 2,
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    bgcolor: 'rgba(255,255,255,0.1)',
                                                    borderWidth: 2,
                                                },
                                            }}
                                        >
                                            Watch Demo
                                        </Button>
                                    </motion.div>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 4, mt: 5, alignItems: 'center' }}>
                                    <Box>
                                        <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>
                                            50K+
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                            Active Users
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>
                                            4.9★
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                            App Rating
                                        </Typography>
                                    </Box>
                                </Box>
                            </motion.div>
                        </Grid>


                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Container maxWidth="lg" sx={{ py: 8, mt: -8, position: 'relative', zIndex: 2 }}>
                <Grid container spacing={3}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card
                                    sx={{
                                        bgcolor: stat.color,
                                        color: 'white',
                                        textAlign: 'center',
                                        p: 3,
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
                                        {stat.number}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600 }}>{stat.label}</Typography>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Features Section */}
            <Box sx={{ bgcolor: '#F9FAFB', py: 12 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                mb: 2,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Powerful Features
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Everything you need to crush your fitness goals
                        </Typography>
                    </Box>

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
                                            borderTop: `4px solid ${feature.color}`,
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                boxShadow: `0 20px 40px ${feature.color}40`,
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 4 }}>
                                            <Box
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 3,
                                                    bgcolor: `${feature.color}20`,
                                                    color: feature.color,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mb: 3,
                                                }}
                                            >
                                                {feature.icon}
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
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

            {/* Testimonials */}
            <Container maxWidth="lg" sx={{ py: 12 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
                        Loved by Thousands
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        See what our users say about FitTrack
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {testimonials.map((testimonial, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        borderLeft: `4px solid ${testimonial.color}`,
                                        p: 3,
                                    }}
                                >
                                    <CardContent>
                                        <Typography sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                                            "{testimonial.text}"
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar src={testimonial.image} sx={{ width: 56, height: 56 }} />
                                            <Box>
                                                <Typography sx={{ fontWeight: 700 }}>
                                                    {testimonial.name}
                                                </Typography>
                                                <Typography color="text.secondary" variant="body2">
                                                    {testimonial.role}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 12,
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
                        Ready to Transform?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                        Join 50,000+ users already crushing their fitness goals
                    </Typography>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={{
                                bgcolor: '#FFD93D',
                                color: '#1F2937',
                                px: 6,
                                py: 2,
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                boxShadow: '0 8px 32px rgba(255,217,61,0.4)',
                                '&:hover': { bgcolor: '#FFC929' },
                            }}
                        >
                            Start Your Free Trial
                        </Button>
                    </motion.div>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#1F2937', color: 'white', py: 6 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <FitnessCenter sx={{ fontSize: 32, color: 'yellow', mr: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                    FitTrack.
                                </Typography>
                            </Box>
                            <Typography color="rgba(255,255,255,0.7)">
                                Your ultimate fitness tracking companion
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>Product</Typography>
                            <Typography color="rgba(255,255,255,0.7)" sx={{ mb: 1 }}>Features</Typography>
                            <Typography color="rgba(255,255,255,0.7)" sx={{ mb: 1 }}>Pricing</Typography>
                            <Typography color="rgba(255,255,255,0.7)">Support</Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>Company</Typography>
                            <Typography color="rgba(255,255,255,0.7)" sx={{ mb: 1 }}>About</Typography>
                            <Typography color="rgba(255,255,255,0.7)" sx={{ mb: 1 }}>Blog</Typography>
                            <Typography color="rgba(255,255,255,0.7)">Careers</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>Stay Updated</Typography>
                            <Typography color="rgba(255,255,255,0.7)">
                                Subscribe to our newsletter for fitness tips and updates
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ textAlign: 'center', mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography color="rgba(255,255,255,0.5)">
                            © 2026 FitTrack. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Landing;