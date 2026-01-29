import { useEffect, useRef, useState } from 'react';

const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const CustomCursor = ({
    color = '#ffffff',
    ringColor = 'rgba(96, 245, 255, 0.7)',
    points = 6,
    ringSize = 52,
    pointSize = 6,
}) => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const pointsRef = useRef([]);
    const [enabled, setEnabled] = useState(false);
    const mouse = useRef({ x: 0, y: 0 });
    const ringPosition = useRef({ x: 0, y: 0 });
    const pointPositions = useRef([]);
    const dotScale = useRef(1);
    const ringScale = useRef(1);
    const rafRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const evaluate = () => {
            const allow = window.innerWidth >= 720 && !isTouchDevice();
            setEnabled(allow);
        };

        evaluate();
        window.addEventListener('resize', evaluate);
        return () => window.removeEventListener('resize', evaluate);
    }, []);

    useEffect(() => {
        if (!enabled) return undefined;

        pointPositions.current = Array.from({ length: points }, () => ({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        }));

        const handleMouseMove = (event) => {
            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) scale(${dotScale.current})`;
            }
        };

        const animate = () => {
            ringPosition.current.x += (mouse.current.x - ringPosition.current.x) * 0.18;
            ringPosition.current.y += (mouse.current.y - ringPosition.current.y) * 0.18;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0) scale(${ringScale.current})`;
            }

            pointPositions.current = pointPositions.current.map((pos, idx) => {
                const follow = idx === 0 ? ringPosition.current : pointPositions.current[idx - 1];
                const easing = Math.max(0.05, 0.12 - idx * 0.01);
                return {
                    x: pos.x + (follow.x - pos.x) * easing,
                    y: pos.y + (follow.y - pos.y) * easing,
                };
            });

            pointPositions.current.forEach((pos, idx) => {
                const point = pointsRef.current[idx];
                if (point) {
                    point.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
                }
            });

            rafRef.current = window.requestAnimationFrame(animate);
        };

        const activate = () => {
            dotScale.current = 1.4;
            ringScale.current = 1.15;
        };

        const deactivate = () => {
            dotScale.current = 1;
            ringScale.current = 1;
        };

        const hoverTargets = Array.from(document.querySelectorAll('a, button, input, textarea, [data-cursor]'));
        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', activate);
            el.addEventListener('mouseleave', deactivate);
        });

        window.addEventListener('mousemove', handleMouseMove);
        rafRef.current = window.requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.cancelAnimationFrame(rafRef.current);
            hoverTargets.forEach((el) => {
                el.removeEventListener('mouseenter', activate);
                el.removeEventListener('mouseleave', deactivate);
            });
        };
    }, [enabled, points]);

    if (!enabled) return null;

    return (
        <>
            <style>{`
        .cursor-dot,
        .cursor-ring,
        .cursor-point {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          will-change: transform;
          z-index: 9999;
        }

        .cursor-dot {
          width: 10px;
          height: 10px;
          margin-top: -5px;
          margin-left: -5px;
          border-radius: 999px;
          background: ${color};
          transition: scale 0.2s ease, background 0.2s ease;
          filter: drop-shadow(0 0 12px rgba(96, 245, 255, 0.6));
        }

        .cursor-ring {
          width: ${ringSize}px;
          height: ${ringSize}px;
          margin-top: -${ringSize / 2}px;
          margin-left: -${ringSize / 2}px;
          border-radius: 999px;
          border: 1.2px solid ${ringColor};
          transition: scale 0.3s ease, border 0.3s ease, opacity 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .cursor-point {
          width: ${pointSize}px;
          height: ${pointSize}px;
          margin-top: -${pointSize / 2}px;
          margin-left: -${pointSize / 2}px;
          border-radius: 999px;
          background: ${ringColor};
          opacity: 0.7;
        }
      `}</style>

            <div className="cursor-dot" ref={dotRef} />
            <div className="cursor-ring" ref={ringRef} />
            {Array.from({ length: points }).map((_, index) => (
                <div
                    key={`cursor-point-${index}`}
                    className="cursor-point"
                    ref={(el) => {
                        pointsRef.current[index] = el;
                    }}
                />
            ))}
        </>
    );
};

export default CustomCursor;
