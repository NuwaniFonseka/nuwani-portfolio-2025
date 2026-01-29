import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element enters the viewport during scroll
 * Ensures animations trigger when scrolling from top to bottom
 */
export const useScrollTrigger = (threshold = 0.1, triggerOnce = true) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        // Create observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Trigger animation when element enters viewport
                    if (entry.isIntersecting) {
                        setIsVisible(true);

                        // Stop observing if triggerOnce is true
                        if (triggerOnce && observerRef.current) {
                            observerRef.current.unobserve(element);
                        }
                    } else if (!triggerOnce) {
                        // Reset if element leaves viewport (when triggerOnce is false)
                        setIsVisible(false);
                    }
                });
            },
            {
                threshold: threshold,
                // Trigger slightly before element enters viewport for smoother effect
                rootMargin: '0px 0px -50px 0px',
            }
        );

        // Start observing
        observerRef.current.observe(element);

        // Cleanup
        return () => {
            if (observerRef.current && element) {
                observerRef.current.unobserve(element);
            }
        };
    }, []); // Only run once on mount

    return [ref, isVisible];
};

export default useScrollTrigger;
