import React, { useState, useEffect  } from "react";
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
        description: "Deemed university recognized for innovation and research."
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
        description: "India's central board of secondary education - equivalent to German Abitur."
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
        description: "India's central board of secondary education - equivalent to German Schulabschluss."
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

/**
 * MAIN EDUCATION COMPONENT
 * =======================
 */

export default function Education() {
    // State to track which education item is being previewed
    const [previewIdx, setPreviewIdx] = useState(null);

    // Get preview data for right panel
    const preview = previewIdx !== null ? educationTimeline[previewIdx] : null;

    // Function to return to academic progression view
    const showAcademicProgression = () => {
        setPreviewIdx(null);
    };

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-[#f7faff] border border-[#2d70e9] rounded-xl p-3 shadow-lg">
                    <p className="text-[#165ba8] font-bold text-sm">
                        {`Stage: ${label}`}
                    </p>
                    <p className="text-[#165ba8] font-bold text-sm">
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

    return (
        <div 
            className="h-screen bg-gradient-to-tr from-[#e3f0ff] to-[#f9fbff] px-6 py-6 flex flex-col items-center overflow-hidden"
            onClick={showAcademicProgression} // Click anywhere to return to chart
        >
            {/* MAIN TITLE */}
            {/* <h1 className="text-5xl font-bold text-blue-800 mb-8">My Education</h1> */}
            
            {/* 
            LAYOUT CUSTOMIZATION:
            - max-w-7xl: Controls maximum width (can use max-w-full for unlimited width)
            - gap-20: Space between left and right panels
            - Removed width restrictions for more flexibility
            */}
            <div className="w-full h-full flex flex-1 overflow-hidden">
                {/* LEFT HALF: TIMELINE - Fixed 50% width */}
                <div className="w-1/2 relative px-8 py-4" onClick={(e) => e.stopPropagation()}>
                    {/* 
                    TIMELINE LAYOUT EXPLANATION:
                    - Fixed center line at 60% from left (adjust TIMELINE_CENTER_X to move line left/right)
                    - Dates positioned to the left of center line
                    - Education info positioned to the right of center line
                    - Logos absolutely positioned on the center line
                    */}
                    
                    {/* CONTINUOUS VERTICAL TIMELINE LINE */}
                    {/* <div 
                        className="absolute top-0 bottom-0 w-1 bg-blue-300 z-0"
                        style={{ left: '60%', top:'9%', height: '76%' }}
                    ></div> */}
                    
                    {/* TIMELINE ITEMS */}
                    <div className="relative h-full">
                        <div 
                            className="absolute top-0 w-1 bg-blue-300 z-0 transition-all duration-2000 ease-out"
                            style={{ 
                                left: '60%', 
                                top: '9%', 
                                height: `${animationProgress}%`,
                                maxHeight: '76%'
                            }}
                        ></div>
                        {educationTimeline.map((edu, idx) => {
                            // Calculate vertical position for each item
                            const itemTop = 80 + (idx * 160); // ITEM_SPACING - Change 160 to adjust spacing between items
                            const TIMELINE_CENTER_X = '61%'; // Keep consistent with line position
                            return (
                                <div
                                    key={idx}
                                    className={`transition-all duration-700 ease-out ${
                                        idx <= animationStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                                >
                                    {/* DATE - Left side of timeline */}
                                    <div 
                                        className="absolute text-right pr-2 text-2xl text-gray-600 font-semibold"
                                        style={{ 
                                            right: `calc(100% - ${TIMELINE_CENTER_X} + 56px)`, // Positions to left of center line
                                            top: `${itemTop + 10}px`, // Align with logo center
                                            width: '1200px' // DATE_WIDTH - Adjust width for longer dates
                                        }}
                                    >
                                        {edu.dateText}
                                    </div>
                                    
                                    {/* INSTITUTION LOGO - Center of timeline */}
                                    <div
                                        className="absolute z-10 rounded-full ring-4 ring-blue-200 hover:ring-blue-500 hover:scale-110 transition-all duration-300 shadow-xl bg-white cursor-pointer -translate-x-1/2 -translate-y-1/2"
                                        style={{ 
                                            left: `calc(100% - ${TIMELINE_CENTER_X} + 186px)`, 
                                            top: `${itemTop + 32}px` // LOGO_SIZE/2 for center alignment
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewIdx(idx);
                                        }}
                                        title={`${edu.institution}`}
                                    >
                                        <img
                                            src={edu.logo}
                                            alt={edu.degree}
                                            className="w-20 h-20 object-contain p-1 rounded-full" // LOGO_SIZE - Adjust w-16 h-16 for size
                                        />
                                    </div>
                                    
                                    {/* EDUCATION INFO - Right side of timeline */}
                                    <div 
                                        className="absolute pl-9"
                                        style={{ 
                                            left: `calc(${TIMELINE_CENTER_X} + 16px)`, // Positions to right of center line
                                            top: `${itemTop}px`,
                                            width: '300px' // INFO_WIDTH - Adjust width for content
                                        }}
                                    >
                                        <span className="block text-xl font-bold text-blue-900 leading-tight">
                                            {edu.degree}
                                        </span>
                                        <span className="block text-lg text-gray-700">
                                            {edu.place}
                                        </span>
                                        <span className="block text-lg font-bold text-blue-700 bg-blue-50 rounded-lg inline-block">
                                            {edu.grade}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* VERTICAL DIVIDER */}
                <div className="w-px bg-blue-100"></div>
                
                {/* RIGHT HALF: CHART OR PREVIEW - Fixed 50% width */}
                <div 
                    className="w-1/2 flex flex-col items-center px-8 py-4"
                    onClick={(e) => e.stopPropagation()} // Prevent background click when clicking right panel
                >
                    {preview ? (
                        /* INSTITUTION PREVIEW CARD */
                        <div className="w-full max-w-lg flex flex-col items-center border border-blue-200 bg-white rounded-2xl shadow-lg p-8 h-fit">
                            {/* Institution Header */}
                            <div className="flex items-center mb-6">
                                <img
                                    src={preview.logo}
                                    alt={preview.degree}
                                    className="w-16 h-16 mr-1 rounded-full bg-white border shadow object-contain p-2"
                                />
                                <span className="text-2xl font-semibold text-blue-900 text-center flex-1">
                                    {preview.degree}
                                </span>
                            </div>
                            
                            <div className="text-1xl font-semibold text-blue-500 text-center flex-1">
                                {preview.institution}
                            </div>
                            
                            {/* Institution Description */}
                            <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                {preview.description}
                            </p>
                            
                            {/* Grade Display */}
                            <div className="bg-blue-50 rounded-lg p-4 mb-6 w-full text-center">
                                <span className="text-xl font-bold text-blue-700">
                                    Grade: {preview.grade}
                                </span>
                            </div>
                            
                            {/* External Link */}
                            <a
                                href={preview.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700 underline text-lg mb-6 transition-colors"
                            >
                                Visit Institution Website
                            </a>
                            
                            {/* Back Button */}
                            <button
                                onClick={showAcademicProgression}
                                className="mt-2 px-8 py-3 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-900 text-lg font-semibold transition-colors"
                            >
                                ← Back to Academic Progression
                            </button>
                        </div>
                    ) : (
                        /* ACADEMIC PROGRESSION CHART */
                        <div className="w-full flex flex-col items-center h-full">
                            <span className="text-3xl font-semibold mb-6 text-blue-900">
                                Academic Progression
                            </span>
                            
                            {/* 
                            CHART CUSTOMIZATION OPTIONS:
                            - height: Change the number in height for chart height
                            - width: Use fixed width or "100%" for responsive
                            - margin: Adjust spacing around chart
                            - colors: Modify stroke, fill colors below
                            - domain: Y-axis range [min, max] - currently [0.8, 2.5]
                            */}
                            <div className="flex-1 w-full flex items-center justify-center">
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
                            
                            {/* Chart Legend/Note */}
                            {/* <p className="text-sm text-gray-600 mt-4 text-center max-w-lg">
                                📈 Academic performance over time (lower values indicate better grades in German system)
                            </p> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}