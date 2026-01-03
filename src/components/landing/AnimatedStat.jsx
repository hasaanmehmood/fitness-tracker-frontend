import React, { useEffect, useRef } from 'react';

const AnimatedStat = ({ value, suffix = '' }) => {
    const ref = useRef(null);

    useEffect(() => {
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        const animate = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const current = Math.floor(progress * value);

            if (ref.current) {
                ref.current.textContent = `${current}${suffix}`;
            }

            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [value, suffix]);

    return <span ref={ref}>0{suffix}</span>;
};

export default AnimatedStat;
