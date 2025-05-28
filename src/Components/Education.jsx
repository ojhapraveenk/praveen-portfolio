import React, { useState, useEffect, useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceDot
} from "recharts";
import styles from './Education.module.css';
import rwthLogo from "../assets/logos/rwth_logo.png";
import soaLogo from "../assets/logos/soa_logo.png";
import cbseLogo from "../assets/logos/cbse_logo.png";

/**
 * EDUCATION TIMELINE DATA
 * =====================
 * Configure your education entries here.
 * 
 * CUSTOMIZATION GUIDE:
 * - degree: Display name for the qualification
 * - place: Location where you studied
 * - dateText: Time period (displayed on timeline)
 * - logo: Institution logo image
 * - grade: Grade display text (what users see)
 * - gradeNum: Numerical value for chart plotting (lower = better for German system)
 * - gradeDisplay: What shows in chart tooltip on hover
 * - scale: Type of grading system used
 * - link: Institution website URL
 * - description: Brief description of the institution
 */
const educationTimeline = [
    {
        degree: "M.Sc. Data Analytics and Decision Science",
        institution: "Rheinisch-Westfälische Technische Hochschule(RWTH) Aachen University",
        place: "Aachen, Germany",
        dateText: "Oct 2023 - Sept 2025",
        logo: rwthLogo,
        grade: "1,5 GPA", // Display text
        gradeNum: 1.5, // Chart value
        gradeDisplay: "1,5 GPA", // Tooltip display
        scale: "GPA",
        link: "https://www.rwth-aachen.de/",
        description: "Leading technical university in Germany, world-ranked for engineering."
    },
    {
        degree: "B.Tech. Computer Science and Engineering",
        institution: "Shiksha 'O' Anusandhan(SOA) University",
        place: "Bhubaneswar, India",
        dateText: "Aug 2015 - May 2019",
        logo: soaLogo,
        grade: "1,1 GPA (98.3%)", // Display text
        gradeNum: 1.1, // Chart value (best performance)
        gradeDisplay: "1,1 GPA (98.3%)", // Tooltip display
        scale: "GPA",
        link: "https://www.soa.ac.in/",
        description: "Deemed to be university recognized for innovation and research."
    },
    {
        degree: "Abitur (German Equivalent)", // German equivalent of 12th grade
        place: "Jamshedpur, India",
        institution: "Central Board of Secondary Education (CBSE)",
        dateText: "Apr 2012 - Mar 2014",
        logo: cbseLogo,
        grade: "86%",
        gradeNum: 2.0, // Chart value
        gradeDisplay: "86%", // Tooltip display
        scale: "%",
        link: "https://www.cbse.gov.in/",
        description: "India's central board of secondary education"
    },
    {
        degree: "Schulabschluss (German Equivalent)", // German equivalent of 10th grade
        institution: "Central Board of Secondary Education (CBSE)",
        place: "Jamshedpur, India",
        dateText: "March 2012",
        logo: cbseLogo,
        grade: "79.8%",
        gradeNum: 2.3, // Chart value
        gradeDisplay: "79.8%", // Tooltip display
        scale: "%",
        link: "https://www.cbse.gov.in/",
        description: "India's central board of secondary education"
    },
];

/**
 * CHART DATA CONFIGURATION
 * =======================
 * This data is used for the Academic Progression line chart.
 * 
 * CUSTOMIZATION:
 * - name: X-axis label (keep short for better display)
 * - value: Y-axis value (numerical grade for plotting)
 * - displayValue: What shows in tooltip when hovering
 */
const chartData = [
    { name: "Schulabschluss", value: 2.3, displayValue: "79.8%" },
    { name: "Abitur", value: 2.0, displayValue: "86%" },
    { name: "B.Tech", value: 1.1, displayValue: "1,1 GPA (98.3%)" },
    { name: "M.Sc.", value: 1.5, displayValue: "1,5 GPA" },
];

// Typing animation hook
const useTypingEffect = (text, isActive, speed = 30) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!isActive || !text) {
            setDisplayText('');
            setIsComplete(false);
            return;
        }
        
        setDisplayText('');
        setIsComplete(false);
        
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayText(text.slice(0, index + 1));
                index++;
            } else {
                setIsComplete(true);
                clearInterval(timer);
            }
        }, speed);
        
        return () => clearInterval(timer);
    }, [text, isActive, speed]);

    return { displayText, isComplete };
};

/**
 * MAIN EDUCATION COMPONENT
 * =======================
 */

export default function Education() {
    // State to track which education item is being previewed
    const [previewIdx, setPreviewIdx] = useState(null);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Get preview data for right panel
    const preview = previewIdx !== null ? educationTimeline[previewIdx] : null;
    
    // Typing animation for institution description
    const institutionTyping = useTypingEffect(
        preview?.description || '', 
        previewIdx !== null, 
        25
    );

    // Calculate dynamic timeline height based on logo positions
    const timelineHeight = useMemo(() => {
        const logoCount = educationTimeline.length;
        const logoSpacing = 160; // pixels between logos
        const firstLogoOffset = 80; // top offset of first logo
        const logoSize = 80; // logo height
        
        return firstLogoOffset + ((logoCount - 1) * logoSpacing) + (logoSize / 2);
    }, [educationTimeline.length]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Function to return to academic progression view
    const showAcademicProgression = () => {
        setPreviewIdx(null);
    };

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className={styles['chart-tooltip']}>
                    <p className={styles['tooltip-stage']}>
                        {`Stage: ${label}`}
                    </p>
                    <p className={styles['tooltip-grade']}>
                        {`Grade: ${data.displayValue}`}
                    </p>
                </div>
            );
        }
        return null;
    };
    
    const [animationStep, setAnimationStep] = useState(-1);
    const [animationProgress, setAnimationProgress] = useState(0);

    useEffect(() => {
        if (animationStep < educationTimeline.length - 1) {
            const timer = setInterval(() => {
            setAnimationStep(prev => prev < educationTimeline.length - 1 ? prev + 1 : prev);
            }, 400);
            return () => clearInterval(timer);
        }
    }, [animationStep, educationTimeline.length]);

    // Animation logic for vertical line progress
    useEffect(() => {
        // Grow line smoothly from 0 to 76 (or 100, adjust to your needs)
        if (animationProgress < 76) {
        const timer = setInterval(() => {
            setAnimationProgress(prev => (prev < 76 ? prev + 2 : 76));
        }, 20);
        return () => clearInterval(timer);
        }
    }, [animationProgress]);

    const handleTimelineItemClick = (idx) => {
        if (isMobile) {
            setPreviewIdx(idx);
        } else {
            setPreviewIdx(idx);
        }
    };

    return (
        <div 
            className={styles['education-container']}
            onClick={showAcademicProgression} // Click anywhere to return to chart
        >
            {/* MAIN TITLE */}
            {/* <h1 className="text-5xl font-bold text-blue-800 mb-8">My Education</h1> */}
            
            <div className={styles['education-content']}>
                {/* LEFT HALF: TIMELINE */}
                <div className={styles['timeline-section']} onClick={(e) => e.stopPropagation()}>
                    {/* UNIFIED TIMELINE TRACK */}
                    <div className={styles['timeline-container']}>
                        {/* Timeline Track - Contains both line and logos */}
                        <div 
                            className={styles['timeline-track']}
                            style={{ height: `${timelineHeight}px` }}
                        >
                            {/* Animated Timeline Line */}
                            <div 
                                className={styles['timeline-line']}
                                style={{ 
                                    height: `${(animationProgress / 116) * 100}%`
                                }}
                            ></div>
                            
                            {/* Timeline Logos - Automatically centered on line */}
                            {educationTimeline.map((edu, idx) => {
                                const logoTop = 80 + (idx * 120); // Same spacing as before
                                return (
                                    <div
                                        key={`logo-${idx}`}
                                        className={`${styles['timeline-logo-container']} ${
                                            idx <= animationStep ? styles['logo-visible'] : styles['logo-hidden']
                                        } ${hoveredIdx === idx ? styles['logo-hovered'] : ''}`}
                                        style={{ top: `${logoTop}px` }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleTimelineItemClick(idx);
                                        }}
                                        onMouseEnter={() => !isMobile && setHoveredIdx(idx)}
                                        onMouseLeave={() => !isMobile && setHoveredIdx(null)}
                                        title={`${edu.institution}`}
                                    >
                                        <img
                                            src={edu.logo}
                                            alt={edu.degree}
                                            className={styles['logo-image']}
                                        />
                                        <div className={styles['logo-pulse']}></div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Timeline Content - Dates and Info positioned relative to track */}
                        {educationTimeline.map((edu, idx) => {
                            const itemTop = 80 + (idx * 120);
                            return (
                                <div
                                    key={`content-${idx}`}
                                    className={`${styles['timeline-item']} ${
                                        idx <= animationStep ? styles['timeline-item-visible'] : styles['timeline-item-hidden']
                                    } ${hoveredIdx === idx ? styles['timeline-item-hovered'] : ''}`}
                                >
                                    {/* DATE - Left side of timeline */}
                                    <div 
                                        className={styles['timeline-date']}
                                        style={{ top: `${itemTop + 30}px` }}
                                    >
                                        {edu.dateText}
                                    </div>
                                    
                                    {/* EDUCATION INFO - Right side of timeline */}
                                    <div 
                                        className={styles['timeline-info']}
                                        style={{ top: `${itemTop + 10}px` }}
                                    >
                                        <span className={styles['degree-title']}>
                                            {edu.degree}
                                        </span>
                                        <span className={styles['edu-place']}>
                                            {edu.place}
                                        </span>
                                        <span className={styles['edu-grade']}>
                                            {edu.grade}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* VERTICAL DIVIDER */}
                <div className={styles['divider']}></div>
                
                {/* RIGHT HALF: CHART OR PREVIEW */}
                <div 
                    className={styles['chart-section']}
                    onClick={(e) => e.stopPropagation()}
                >
                    {preview ? (
                        /* INSTITUTION PREVIEW CARD */
                        <div className={styles['preview-card']}>
                            {/* Institution Header */}
                            <div className={styles['preview-header']}>
                                <img
                                    src={preview.logo}
                                    alt={preview.degree}
                                    className={styles['preview-logo']}
                                />
                                <span className={styles['preview-degree']}>
                                    {preview.degree}
                                </span>
                            </div>
                            
                            <div className={styles['preview-institution']}>
                                {preview.institution}
                            </div>
                            
                            {/* Institution Description with Typing Animation */}
                            <div className={styles['preview-description']}>
                                {institutionTyping.displayText}
                                {!institutionTyping.isComplete && (
                                    <span className={styles['typing-cursor']}></span>
                                )}
                            </div>
                            
                            {/* Grade Display */}
                            <div className={styles['preview-grade']}>
                                <span>Grade: {preview.grade}</span>
                            </div>
                            
                            {/* External Link */}
                            <a
                                href={preview.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['preview-link']}
                            >
                                Visit Institution Website
                            </a>
                            
                            {/* Back Button */}
                            <button
                                onClick={showAcademicProgression}
                                className={styles['back-button']}
                            >
                                ← Back to Academic Progression
                            </button>
                        </div>
                    ) : (
                        /* ACADEMIC PROGRESSION CHART */
                        <div className={styles['chart-container']}>
                            <span className={styles['chart-title']}>
                                Academic Progression
                            </span>
                            
                            <div className={styles['chart-wrapper']}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={chartData}
                                        margin={{ left: 80, right: 80, top: 40, bottom: 60 }}
                                    >
                                        {/* Chart Grid */}
                                        <CartesianGrid stroke="#e0e9f5" strokeDasharray="3 3" />
                                        
                                        {/* X-Axis (Education Stages) */}
                                        <XAxis
                                            dataKey="name"
                                            tick={{ fill: "#165ba8", fontWeight: 700, fontSize: 14 }}
                                            padding={{ left: 20, right: 20 }}
                                            interval={0} // Show all labels
                                        />
                                        
                                        {/* Y-Axis (Grades - reversed so lower numbers appear higher) */}
                                        <YAxis
                                            domain={[0.8, 2.5]} // Y-axis range
                                            reversed={true} // Lower grades (better) appear higher
                                            tick={{ fill: "#1857b8", fontWeight: 600, fontSize: 13 }}
                                            allowDecimals={true}
                                            padding={{ top: 20, bottom: 20 }}
                                            ticks={[1.1, 1.5, 2.0, 2.3]} // Only show these specific values
                                        />
                                        
                                        {/* Custom Tooltip */}
                                        <Tooltip content={<CustomTooltip />} />
                                        
                                        {/* Main Line */}
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#1857b8" // Line color
                                            strokeWidth={4} // Line thickness
                                            dot={{ r: 10, fill: "#2d70e9" }} // Regular dots
                                            activeDot={{
                                                r: 15, // Hover dot size
                                                fill: "#ffbe40", // Hover dot color
                                                stroke: "#2d70e9",
                                                strokeWidth: 3,
                                            }}
                                        />
                                        
                                        {/* Highlight Best Performance (B.Tech) */}
                                        <ReferenceDot
                                            x="B.Tech"
                                            y={1.1}
                                            r={18}
                                            fill="#47d6c6" // Highlight color
                                            stroke="#333"
                                            strokeWidth={3}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}