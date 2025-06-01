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
import mobileStyles from './MobileEducation.module.css';
import rwthLogo from "../assets/logos/rwth_logo.png";
import soaLogo from "../assets/logos/soa_logo.png";
import cbseLogo from "../assets/logos/cbse_logo.png";

const educationTimeline = [
    {
        degree: "M.Sc. Data Analytics and Decision Science",
        institution: "Rheinisch-Westfälische Technische Hochschule (RWTH) Aachen University",
        place: "Aachen, Germany",
        dateText: "Oct 2023 - Sept 2025",
        logo: rwthLogo,
        grade: "1,5 GPA",
        gradeNum: 1.5,
        gradeDisplay: "1,5 GPA",
        scale: "GPA",
        link: "https://www.rwth-aachen.de/",
        description: "Leading technical university in Germany, world-ranked for engineering."
    },
    {
        degree: "B.Tech. Computer Science and Engineering",
        institution: "Shiksha 'O' Anusandhan (SOA) University",
        place: "Bhubaneswar, India",
        dateText: "Aug 2015 - May 2019",
        logo: soaLogo,
        grade: "1,1 GPA (98.3%)",
        gradeNum: 1.1,
        gradeDisplay: "1,1 GPA (98.3%)",
        scale: "GPA",
        link: "https://www.soa.ac.in/",
        description: "Deemed to be university recognized for innovation and research."
    },
    {
        degree: "Abitur (German Equivalent)",
        place: "Jamshedpur, India",
        institution: "Central Board of Secondary Education (CBSE)",
        dateText: "Apr 2012 - Mar 2014",
        logo: cbseLogo,
        grade: "86%",
        gradeNum: 2.0,
        gradeDisplay: "86%",
        scale: "%",
        link: "https://www.cbse.gov.in/",
        description: "India's central board of secondary education"
    },
    {
        degree: "Schulabschluss (German Equivalent)",
        institution: "Central Board of Secondary Education (CBSE)",
        place: "Jamshedpur, India",
        dateText: "March 2012",
        logo: cbseLogo,
        grade: "79.8%",
        gradeNum: 2.3,
        gradeDisplay: "79.8%",
        scale: "%",
        link: "https://www.cbse.gov.in/",
        description: "India's central board of secondary education"
    },
];

const chartData = [
    { name: "Schulabschluss", value: 2.3, displayValue: "79.8%" },
    { name: "Abitur", value: 2.0, displayValue: "86%" },
    { name: "B.Tech", value: 1.1, displayValue: "1,1 GPA (98.3%)" },
    { name: "M.Sc.", value: 1.5, displayValue: "1,5 GPA" },
];

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

// Mobile Education Component
const MobileEducation = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [modalPreview, setModalPreview] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const preview = modalPreview !== null ? educationTimeline[modalPreview] : null;
    const institutionTyping = useTypingEffect(
        preview?.description || '', 
        modalPreview !== null, 
        25
    );

    useEffect(() => {
        setIsLoaded(true);
        
        // Animate timeline items one by one
        const animateItems = () => {
            educationTimeline.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleItems(prev => [...prev, index]);
                }, index * 300); // 300ms delay between each item
            });
        };

        const timer = setTimeout(animateItems, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleTimelineClick = (idx) => {
        setModalPreview(idx);
    };

    const closeModal = () => {
        setModalPreview(null);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className={mobileStyles['chart-tooltip']}>
                    <p className={mobileStyles['tooltip-stage']}>
                        {`Stage: ${label}`}
                    </p>
                    <p className={mobileStyles['tooltip-grade']}>
                        {`Grade: ${data.displayValue}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    const tickAlias = {
        1.1: '1,1',
        1.5: '1,5',
        2.0: '2,0',
        2.3: '2,3'
    };
    
    const tickFormatter = (value) => tickAlias[value] || value;
    
    return (
        <div className={mobileStyles.mobileContainer}>
            {/* Timeline Section */}
            <div className={mobileStyles.timelineSection}>
                <h2 className={mobileStyles.sectionTitle}>My Education Journey</h2>
                
                <div className={mobileStyles.timelineContainer}>
                    {/* Central Timeline Line */}
                    <div className={mobileStyles.timelineLine}></div>
                    
                    {/* Timeline Items */}
                    {educationTimeline.map((edu, idx) => {
                        const universityName = (() => {
                            const match = edu.institution.match(/\(([^)]+)\)\s*(.*)$/);
                            if (match) {
                            return `${match[1]} ${match[2]}`.trim();
                            }
                            return edu.institution;
                        })();
                        
                        return (                        
                            <div
                                key={idx}
                                className={`${mobileStyles.timelineItem} ${
                                    visibleItems.includes(idx) ? mobileStyles.visible : mobileStyles.hidden
                                } ${idx % 2 === 0 ? mobileStyles.left : mobileStyles.right}`}
                                onClick={() => handleTimelineClick(idx)}
                            >
                                {/* Logo */}
                                <div className={mobileStyles.logoContainer}>
                                    <img 
                                        src={edu.logo} 
                                        alt={edu.institution}
                                        className={mobileStyles.logoImage}
                                    />
                                </div>

                                {/* Content */}
                                <div className={mobileStyles.timelineContent}>
                                    <div className={mobileStyles.timelineDate}>{edu.dateText}</div>
                                    <h3 className={mobileStyles.degreeTitle}>{edu.degree}</h3>
                                    <div className={mobileStyles.institution}>{universityName}</div>
                                    <div className={mobileStyles.place}>{edu.place}</div>
                                    <div className={mobileStyles.grade}>{edu.grade}</div>
                                </div>
                            </div>
                        );
        })}
                </div>
            </div>

            {/* Chart Section */}
            <div className={mobileStyles.chartSection}>
                <h2 className={mobileStyles.sectionTitle}>Academic Progression</h2>
                
                <div className={mobileStyles.chartContainer}>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart
                            data={chartData}
                            margin={{ left: 40, right: 40, top: 20, bottom: 40 }}
                        >
                            <CartesianGrid stroke="#e0e9f5" strokeDasharray="3 3" />
                            
                            <XAxis
                                dataKey="name"
                                tick={{ fill: "#165ba8", fontWeight: 700, fontSize: 12 }}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            
                            <YAxis
                                domain={[0.8, 2.5]}
                                reversed={true}
                                tick={{ fill: "#1857b8", fontWeight: 600, fontSize: 11 }}
                                allowDecimals={true}
                                ticks={[1.1, 1.5, 2.0, 2.3]}
                                tickFormatter={tickFormatter}
                            />
                            
                            <Tooltip content={<CustomTooltip />} />
                            
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#1857b8"
                                strokeWidth={3}
                                dot={{ r: 6, fill: "#2d70e9" }}
                                activeDot={{
                                    r: 10,
                                    fill: "#ffbe40",
                                    stroke: "#2d70e9",
                                    strokeWidth: 2,
                                }}
                            />
                            
                            <ReferenceDot
                                x="B.Tech"
                                y={1.1}
                                r={12}
                                fill="#47d6c6"
                                stroke="#333"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Modal Preview */}
            {modalPreview !== null && (
                <div className={mobileStyles.modalOverlay} onClick={closeModal}>
                    <div className={mobileStyles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={mobileStyles.closeButton} onClick={closeModal}>
                            ×
                        </button>
                        
                        <div className={mobileStyles.modalHeader}>
                            <img
                                src={preview.logo}
                                alt={preview.degree}
                                className={mobileStyles.modalLogo}
                            />
                            <h3 className={mobileStyles.modalDegree}>{preview.degree}</h3>
                        </div>
                        
                        <div className={mobileStyles.modalInstitution}>
                            {preview.institution}
                        </div>
                        
                        <div className={mobileStyles.modalDescription}>
                            {institutionTyping.displayText}
                            {!institutionTyping.isComplete && (
                                <span className={mobileStyles.typingCursor}></span>
                            )}
                        </div>
                        
                        <div className={mobileStyles.modalGrade}>
                            <span>Grade: {preview.grade}</span>
                        </div>
                        
                        <a
                            href={preview.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={mobileStyles.modalLink}
                        >
                            Visit Institution Website
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

// Desktop Education Component (your existing design)
const DesktopEducation = () => {
    const [previewIdx, setPreviewIdx] = useState(null);
    const [hoveredIdx, setHoveredIdx] = useState(null);

    const preview = previewIdx !== null ? educationTimeline[previewIdx] : null;
    
    const institutionTyping = useTypingEffect(
        preview?.description || '', 
        previewIdx !== null, 
        25
    );

    const timelineHeight = useMemo(() => {
        const logoCount = educationTimeline.length;
        const logoSpacing = 160;
        const firstLogoOffset = 80;
        const logoSize = 80;
        
        return firstLogoOffset + ((logoCount - 1) * logoSpacing) + (logoSize / 2);
    }, [educationTimeline.length]);

    const showAcademicProgression = () => {
        setPreviewIdx(null);
    };

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

    useEffect(() => {
        if (animationProgress < 76) {
        const timer = setInterval(() => {
            setAnimationProgress(prev => (prev < 76 ? prev + 2 : 76));
        }, 20);
        return () => clearInterval(timer);
        }
    }, [animationProgress]);

    const handleTimelineItemClick = (idx) => {
        setPreviewIdx(idx);
    };

    const tickAlias = {
        1.1: '1,1',
        1.5: '1,5',
        2.0: '2,0',
        2.3: '2,3'
    };
    
    const tickFormatter = (value) => tickAlias[value] || value;

    return (
        <div 
            className={styles['education-container']}
            onClick={showAcademicProgression}
        >
            <div className={styles['education-content']}>
                {/* LEFT HALF: TIMELINE */}
                <div className={styles['timeline-section']} onClick={(e) => e.stopPropagation()}>
                    <div className={styles['timeline-container']}>
                        <div 
                            className={styles['timeline-track']}
                            style={{ height: `${timelineHeight}px` }}
                        >
                            <div 
                                className={styles['timeline-line']}
                                style={{ 
                                    height: `${(animationProgress / 116) * 100}%`
                                }}
                            ></div>
                            
                            {educationTimeline.map((edu, idx) => {
                                const logoTop = 80 + (idx * 120);
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
                                        onMouseEnter={() => setHoveredIdx(idx)}
                                        onMouseLeave={() => setHoveredIdx(null)}
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
                        
                        {educationTimeline.map((edu, idx) => {
                            const itemTop = 80 + (idx * 120);
                            return (
                                <div
                                    key={`content-${idx}`}
                                    className={`${styles['timeline-item']} ${
                                        idx <= animationStep ? styles['timeline-item-visible'] : styles['timeline-item-hidden']
                                    } ${hoveredIdx === idx ? styles['timeline-item-hovered'] : ''}`}
                                >
                                    <div 
                                        className={styles['timeline-date']}
                                        style={{ top: `${itemTop + 30}px` }}
                                    >
                                        {edu.dateText}
                                    </div>
                                    
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
                
                <div className={styles['divider']}></div>
                
                {/* RIGHT HALF: CHART OR PREVIEW */}
                <div 
                    className={styles['chart-section']}
                    onClick={(e) => e.stopPropagation()}
                >
                    {preview ? (
                        <div className={styles['preview-card']}>
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
                            
                            <div className={styles['preview-description']}>
                                {institutionTyping.displayText}
                                {!institutionTyping.isComplete && (
                                    <span className={styles['typing-cursor']}></span>
                                )}
                            </div>
                            
                            <div className={styles['preview-grade']}>
                                <span>Grade: {preview.grade}</span>
                            </div>
                            
                            <a
                                href={preview.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['preview-link']}
                            >
                                Visit Institution Website
                            </a>
                            
                            <button
                                onClick={showAcademicProgression}
                                className={styles['back-button']}
                            >
                                ← Back to Academic Progression
                            </button>
                        </div>
                    ) : (
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
                                        <CartesianGrid stroke="#e0e9f5" strokeDasharray="3 3" />
                                        
                                        <XAxis
                                            dataKey="name"
                                            tick={{ fill: "#165ba8", fontWeight: 700, fontSize: 14 }}
                                            padding={{ left: 20, right: 20 }}
                                            interval={0}
                                        />
                                        
                                        <YAxis
                                            domain={[0.8, 2.5]}
                                            reversed={true}
                                            tick={{ fill: "#1857b8", fontWeight: 600, fontSize: 13 }}
                                            allowDecimals={true}
                                            padding={{ top: 20, bottom: 20 }}
                                            ticks={[1.1, 1.5, 2.0, 2.3]}
                                            tickFormatter={tickFormatter}
                                        />
                                        
                                        <Tooltip content={<CustomTooltip />} />
                                        
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#1857b8"
                                            strokeWidth={4}
                                            dot={{ r: 10, fill: "#2d70e9" }}
                                            activeDot={{
                                                r: 15,
                                                fill: "#ffbe40",
                                                stroke: "#2d70e9",
                                                strokeWidth: 3,
                                            }}
                                        />
                                        
                                        <ReferenceDot
                                            x="B.Tech"
                                            y={1.1}
                                            r={18}
                                            fill="#47d6c6"
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
};

// Main Education Component with Device Detection
export default function Education() {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        
        checkDevice();
        setIsLoaded(true);
        
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    if (!isLoaded) {
        return (
            <div style={{ 
                height: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #e3f0ff 0%, #f9fbff 100%)'
            }}>
                <div style={{ color: '#6b7280' }}>Loading...</div>
            </div>
        );
    }

    return isMobile ? <MobileEducation /> : <DesktopEducation />;
}