import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    CloudUpload,
    Menu as MenuIcon,
} from '@mui/icons-material';

const AnimatedCounter = ({ end, suffix = '', duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);

    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const Landing = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
        { number: 50, suffix: 'K+', label: 'Active Users', color: '#C98986' },
        { number: 1, suffix: 'M+', label: 'Workouts Logged', color: '#4ECDC4' },
        { number: 500, suffix: '+', label: 'Exercise Library', color: 'rgba(155, 155, 127, 0.75)' },
        { number: 4.9, suffix: '★', label: 'App Rating', color: '#6BCF7F' },
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    color: '#f3f4f6',
                    backgroundColor: 'rgba(15, 23, 42, 0.25) !important',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderBottom: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.35)',

                    zIndex: 9999,
                }}
            >
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <FitnessCenter sx={{ fontSize: 32, color: '#ffff7f', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'rgba(255,255,255,0.9)' }}>
                            FitTrack
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                        <Button sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Features</Button>
                        <Button sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Pricing</Button>
                        <Button sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>About</Button>
                    </Box>
                    <Box sx={{ ml: 3, display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/login')}
                            sx={{
                                borderColor: '#FFFF7F',
                                color: '#FFFF7F',
                                fontWeight: 600,
                                '&:hover': {
                                    borderColor: '#FFFF7F',
                                    bgcolor: 'rgba(255, 255, 127, 0.15)', // yellow tint
                                },
                            }}
                        >
                            Sign In
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => navigate('/register')}
                            sx={{
                                bgcolor: 'rgba(255, 255, 127, 0.75)',
                                color: '#000',
                                fontWeight: 600,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.45)', // added transparency
                                    color: '#FFFF7F',
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

            <Box
                ref={heroRef}
                sx={{
                    position: 'relative',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
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
                    }}
                >
                    <source
                        src="https://assets.mixkit.co/videos/42898/42898-720.mp4"
                        type="video/mp4"
                    />
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.4)',
                    }}
                />

                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
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
                                    <span style={{ color: 'rgba(255, 255, 127, 0.75)' }}>Journey Starts</span>
                                    <br />
                                    Here.
                                </Typography>

                                <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, fontWeight: 400 }}>
                                    Track workouts, monitor progress, achieve your goals.
                                    The most powerful fitness tracking app designed for your success.
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button
                                        component={motion.button}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        variant="contained"
                                        size="large"
                                        onClick={() => navigate('/register')}
                                        sx={{
                                            bgcolor: 'rgba(255, 255, 127, 0.75)',
                                            color: '#1F2937',
                                            px: 5,
                                            py: 2,
                                            fontSize: '1.2rem',
                                            fontWeight: 700,
                                            boxShadow: '0 8px 32px rgba(255,217,61,0.4)',
                                            '&:hover': { bgcolor: 'rgba(255, 255, 127, 0.75)' },
                                        }}
                                    >
                                        Start
                                    </Button>


                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <motion.div
                initial={{ backgroundColor: '#ffffff' }}
                whileInView={{ backgroundColor: '#000000' }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                viewport={{ amount: 0.4 }} // trigger when 30% visible
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        py: 8,
                        mt: -8,
                        pt: 12,
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="stretch"
                    >
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
                                            <AnimatedCounter
                                                end={stat.number}
                                                suffix={stat.suffix}
                                            />
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {stat.label}
                                        </Typography>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>



                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                mb: 2,
                                color: 'rgba(255,255,127,0.95)', // Firefox fallback
                                background: `
                                        linear-gradient(
                                            135deg,
                                            rgba(255,255,127,1) 0%,
                                            rgba(220,220,70,0.8) 60%,
                                            rgba(180,180,40,0.65) 100%
                                        )
                                    `,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Powerful Features
                        </Typography>
                        <Typography variant="h6" color="grey">
                            Everything you need to crush your fitness goals
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, rotateY: -45, scale: 0.8 }}
                                    whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: -15,
                                        rotateZ: 2,
                                        transition: { duration: 0.3 }
                                    }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <Card
                                        sx={{
                                            height: '100%',
                                            borderTop: `4px solid ${feature.color}`,
                                            transition: 'all 0.3s',
                                            transform: 'perspective(1000px)',
                                            '&:hover': {
                                                boxShadow: `0 20px 40px ${feature.color}40`,
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 4 }}>
                                            <motion.div
                                                animate={{
                                                    y: [0, -10, 0],
                                                    rotate: [0, 5, 0, -5, 0]
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
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
                                            </motion.div>
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


            <Container maxWidth="lg" sx={{ py: 12 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography color="grey" variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
                        Loved by Thousands!
                    </Typography>
                    <Typography variant="h6" color="grey">
                        See what our users say about FitTrack
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative', minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: currentTestimonial === index ? 1 : 0,
                                scale: currentTestimonial === index ? 1 : 0.8,
                                x: currentTestimonial === index ? 0 : 100
                            }}
                            transition={{ duration: 0.5 }}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                maxWidth: 600,
                            }}
                        >
                            <Card
                                sx={{
                                    borderLeft: `4px solid ${testimonial.color}`,
                                    p: 4,
                                }}
                            >
                                <CardContent>
                                    <Typography sx={{ mb: 3, fontSize: '1.3rem', lineHeight: 1.8, fontStyle: 'italic' }}>
                                        "{testimonial.text}"
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar src={testimonial.image} sx={{ width: 64, height: 64 }} />
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                                                {testimonial.name}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {testimonial.role}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                    {testimonials.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrentTestimonial(index)}
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: currentTestimonial === index ? '#667eea' : '#D1D5DB',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                        />
                    ))}
                </Box>
            </Container>
            </motion.div>
            <Box
                sx={{
                    position: 'relative',
                    py: 12,
                    color: 'white',

                    textAlign: 'center',
                    overflow: 'hidden',
                }}
            >
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
                        zIndex: 0,
                    }}
                >
                    <source
                        src="https://videos.pexels.com/video-files/30875209/30875209-hd_1920_1080_30fps.mp4"
                        type="video/mp4"
                    />
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        zIndex: 0,
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
                            Ready to Transform?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            Join 50,000+ users already crushing their fitness goals
                        </Typography>
                        <Button
                            component={motion.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={{
                                bgcolor: 'rgba(255, 255, 127, 0.75)',
                                color: '#1F2937',
                                px: 6,
                                py: 2,
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                boxShadow: '0 8px 32px rgba(255,217,61,0.4)',
                                '&:hover': { bgcolor: 'rgba(255, 255, 127, 0.75)' },
                            }}
                        >
                            Start Your Free Trial
                        </Button>
                    </motion.div>
                </Container>
            </Box>

            <Box sx={{ bgcolor: '#1F2937', color: 'white', py: 6 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <FitnessCenter sx={{ fontSize: 32, color: '#ffff7f  ', mr: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                    FitTrack
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
                            © 2024 FitTrack. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Landing;