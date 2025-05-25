import React, { useState } from "react";
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

// If not using a separate data file:
const educationTimeline = [
    {
        degree: "M.Sc. Data Analytics and Decision Science",
        // school: "RWTH Aachen University",
        place: "Aachen, Germany",
        // year: "2023-2025",
        dateText: "Oct 2023 - Sept 2025",
        logo: rwthLogo,
        grade: "1.5 GPA",
        gradeNum: 1.5,
        scale: "GPA",
        link: "https://www.rwth-aachen.de/",
        description: "Leading technical university in Germany, world-ranked for engineering."
    },
    {
        degree: "B.Tech. Computer Science and Engineering",
        // school: "SOA University",
        place: "Bhubaneswar, India",
        // year: "2015-2019",
        dateText: "Aug 2015 - May 2019",
        logo: soaLogo,
        grade: "98.3% (1.1 GPA)",
        gradeNum: 1.1,
        scale: "%",
        link: "https://www.soa.ac.in/",
        description: "Deemed university recognized for innovation and research."
    },
    {
        degree: "12th (CBSE)",
        // school: "CBSE",
        place: "Jamshedpur, India",
        // year: "2013-2015",
        dateText: "March 2014",
        logo: cbseLogo,
        grade: "86%",
        gradeNum: 2,
        scale: "%",
        link: "https://www.cbse.gov.in/",
        description: "India's central board of secondary education."
    },
    {
        degree: "10th (CBSE)",
        // school: "CBSE",
        place: "Jamshedpur, India",
        // year: "2011-2013",
        dateText: "March 2012",
        logo: cbseLogo,
        grade: "79.8%",
        gradeNum: 2.3,
        scale: "%",
        link: "https://www.cbse.gov.in/",
        description: "India's central board of secondary education."
    },
];

const chartData = [
    { name: "10th", value: 2.3 },
    { name: "12th", value: 2 },
    { name: "B.Tech", value: 1.1 },
    { name: "M.Sc.", value: 1.5 },
];

const tooltipLabels = {
    "10th": "79.8%",
    "12th": "86%",
    "B.Tech": "1.1 GPA",
    "M.Sc.": "1.5 GPA",
};

export default function Education() {
    const [previewIdx, setPreviewIdx] = useState(null);

    // For right-side institution preview (if desired)
    const preview = previewIdx !== null ? educationTimeline[previewIdx] : null;

    // return (
    //     <div className="min-h-screen bg-gradient-to-tr from-[#e3f0ff] to-[#f9fbff] px-4 py-8 flex flex-col items-center">
    //     <h1 className="text-4xl font-bold text-blue-800 mb-4">My Education</h1>
    //     <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10 items-start">
    //         <div className="flex-1">
    //         <ol className="relative border-l-4 border-blue-300 pl-6">
    //             {educationTimeline.map((edu, idx) => (
    //                 <li key={idx} className="mb-12 flex items-start relative">
    //                 <span className="absolute -left-[38px] top-3 w-5 h-5 rounded-full bg-blue-100 border-4 border-blue-500 flex items-center justify-center z-10">
    //                     <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
    //                 </span>
    //                 <div className="w-28 text-xs text-gray-600 pr-4 flex-shrink-0 pt-1 font-semibold text-right">
    //                     {edu.dateText}
    //                 </div>
    //                 <img src={edu.logo} alt={edu.school} className="w-14 h-14 mr-4 rounded-full bg-white border shadow object-contain p-2" />
    //                 <div>
    //                     <span className="block text-lg font-semibold text-blue-900">{edu.degree}</span>
    //                     <span className="block text-md text-gray-700">{edu.school} | {edu.place}</span>
    //                     <span className="block text-sm text-gray-500">{edu.year}</span>
    //                     <span className="block mt-2 text-md font-bold text-blue-700">{edu.grade}</span>
    //                     <a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-sm block mt-1">
    //                     Visit {edu.school}
    //                     </a>
    //                 </div>
    //                 </li>
    //             ))}
    //             </ol>
    //         </div>
    //         {/* Chart */}
    //         <div className="flex-1 flex flex-col items-center">
    //         <span className="text-xl font-semibold mb-3 text-blue-900">Academic Progression</span>
    //         <ResponsiveContainer width="100%" height={260}>
    //             <LineChart data={chartData} margin={{ left: 30, right: 30, top: 10, bottom: 10 }}>
    //             <CartesianGrid stroke="#e0e9f5" />
    //             <XAxis dataKey="name" tick={{ fill: "#165ba8", fontWeight: 700 }} />
    //             <YAxis domain={[0.8, 2.5]} reversed={true}
    //                 tickFormatter={v => v === 1.1 ? "1.1 (Top)" : v}
    //                 tick={{ fill: "#1857b8", fontWeight: 600 }}
    //             />
    //             <Tooltip formatter={value => `${value} (lower = better)`} />
    //             <Line
    //                 type="monotone"
    //                 dataKey="value"
    //                 stroke="#1857b8"
    //                 strokeWidth={3}
    //                 dot={{ r: 8, fill: "#2d70e9" }}
    //                 activeDot={{ r: 12, fill: "#ffbe40", stroke: "#2d70e9", strokeWidth: 3 }}
    //             />
    //             <ReferenceDot x="B.Tech" y={1.1} r={15} fill="#47d6c6" stroke="#333" strokeWidth={2} />
    //             </LineChart>
    //         </ResponsiveContainer>
    //         <span className="mt-2 text-sm text-gray-600">(Lower value = higher achievement, e.g., 1.1 in Engg. is top rank)</span>
    //         </div>
    //     </div>
    //     </div>
    // );

    // return (
    //         <div className="min-h-screen bg-gradient-to-tr from-[#e3f0ff] to-[#f9fbff] px-4 py-8 flex flex-col items-center">
    //         <h1 className="text-4xl font-bold text-blue-800 mb-4">My Education</h1>
    //         <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10 items-start">
    //             {/* Timeline with dates/points */}
    //             <div className="flex-1">
    //             <ol className="relative border-l-4 border-blue-300 pl-10">
    //                 {educationTimeline.map((edu, idx) => (
    //                 <li key={idx} className="mb-12 flex items-start relative">
    //                     {/* Timeline point */}
    //                     <span className="absolute -left-[41px] top-3 w-6 h-6 rounded-full bg-blue-100 border-4 border-blue-500 flex items-center justify-center z-10">
    //                     <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
    //                     </span>
    //                     {/* Date left column */}
    //                     <div className="w-28 text-xs text-gray-600 pr-4 flex-shrink-0 pt-1 font-semibold text-right">
    //                     {edu.dateText}
    //                     </div>
    //                     {/* Logo and content */}
    //                     <img
    //                     src={edu.logo}
    //                     alt={edu.school}
    //                     className="w-14 h-14 mr-4 rounded-full bg-white border shadow object-contain p-2"
    //                     style={{ objectFit: "contain", background: "#fff" }}
    //                     />
    //                     <div>
    //                     <span className="block text-lg font-semibold text-blue-900">
    //                         {edu.degree}
    //                     </span>
    //                     <span className="block text-md text-gray-700">
    //                         {edu.school} | {edu.place}
    //                     </span>
    //                     <span className="block text-sm text-gray-500">{edu.year}</span>
    //                     <span className="block mt-2 text-md font-bold text-blue-700">
    //                         {edu.grade}
    //                     </span>
    //                     {/* Link */}
    //                     <button
    //                         onClick={() => setPreviewIdx(idx)}
    //                         className="text-blue-500 underline text-sm block mt-1 hover:text-blue-700"
    //                     >
    //                         Visit {edu.school}
    //                     </button>
    //                     </div>
    //                 </li>
    //                 ))}
    //             </ol>
    //             </div>
    //             {/* Right-side: Chart or preview */}
    //             <div className="flex-1 flex flex-col items-center min-h-[320px] w-full">
    //             {/* Show chart or institution preview */}
    //             {preview ? (
    //                 <div className="w-full flex flex-col items-center border border-blue-200 bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
    //                 <div className="flex items-center mb-2">
    //                     <img
    //                     src={preview.logo}
    //                     alt={preview.school}
    //                     className="w-14 h-14 mr-4 rounded-full bg-white border shadow object-contain p-2"
    //                     />
    //                     <span className="text-xl font-semibold text-blue-900">{preview.school}</span>
    //                 </div>
    //                 <p className="text-md text-gray-700 mb-2">{preview.description}</p>
    //                 <a
    //                     href={preview.link}
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                     className="text-blue-500 underline text-sm"
    //                 >
    //                     Go to website
    //                 </a>
    //                 <button
    //                     onClick={() => setPreviewIdx(null)}
    //                     className="mt-4 px-4 py-1 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-900 text-xs font-semibold"
    //                 >
    //                     Back to Academic Progression
    //                 </button>
    //                 </div>
    //             ) : (
    //                 <>
    //                 <span className="text-xl font-semibold mb-3 text-blue-900">
    //                     Academic Progression
    //                 </span>
    //                 <ResponsiveContainer width="100%" height={260}>
    //                     <LineChart
    //                     data={chartData}
    //                     margin={{ left: 50, right: 50, top: 40, bottom: 30 }}
    //                     >
    //                     <CartesianGrid stroke="#e0e9f5" />
    //                     <XAxis
    //                         dataKey="name"
    //                         tick={{ fill: "#165ba8", fontWeight: 700 }}
    //                         padding={{ left: 15, right: 15 }}
    //                     />
    //                     <YAxis
    //                         domain={[0.8, 2.5]}
    //                         reversed={true}
    //                         tick={{ fill: "#1857b8", fontWeight: 600 }}
    //                         tickFormatter={v =>
    //                         v === 1.1
    //                             ? "1.1 (Top)"
    //                             : v === 1.5
    //                             ? "1.5"
    //                             : v
    //                         }
    //                         allowDecimals={true}
    //                         padding={{ top: 20, bottom: 20 }}
    //                     />
    //                     <Tooltip
    //                         formatter={(_, __, props) =>
    //                         tooltipLabels[props.payload.name] || props.value
    //                         }
    //                         labelFormatter={label => `Stage: ${label}`}
    //                         contentStyle={{
    //                         background: "#f7faff",
    //                         border: "1px solid #2d70e9",
    //                         borderRadius: "12px",
    //                         color: "#165ba8",
    //                         fontWeight: "bold"
    //                         }}
    //                     />
    //                     <Line
    //                         type="monotone"
    //                         dataKey="value"
    //                         stroke="#1857b8"
    //                         strokeWidth={3}
    //                         dot={{ r: 8, fill: "#2d70e9" }}
    //                         activeDot={{
    //                         r: 12,
    //                         fill: "#ffbe40",
    //                         stroke: "#2d70e9",
    //                         strokeWidth: 3
    //                         }}
    //                     />
    //                     <ReferenceDot
    //                         x="B.Tech"
    //                         y={1.1}
    //                         r={15}
    //                         fill="#47d6c6"
    //                         stroke="#333"
    //                         strokeWidth={2}
    //                     />
    //                     </LineChart>
    //                 </ResponsiveContainer>
    //                 {/* No explanation text as per your requirement */}
    //                 </>
    //             )}
    //             </div>
    //         </div>
    //         </div>
    //     );
    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#e3f0ff] to-[#f9fbff] px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Education Timeline</h1>
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10 items-start">
            {/* Timeline */}
            <div className="flex-1">
            <div className="flex flex-col">
                {educationTimeline.map((edu, idx) => (
                <div key={idx} className="flex flex-row items-start mb-12">
                    {/* Date */}
                    <div className="w-32 text-xs text-gray-600 font-semibold flex-shrink-0 text-right pr-2 pt-2">
                    {edu.dateText}
                    </div>
                    {/* Timeline Line & Dot */}
                    <div className="flex flex-col items-center mr-6 relative">
                    {/* Line */}
                    <div
                        className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-blue-200 ${
                        idx === 0 ? "h-1/2" : "h-full"
                        } z-0`}
                        style={{
                        height:
                            idx === educationTimeline.length - 1
                            ? "50%"
                            : "100%",
                        top:
                            idx === 0
                            ? "50%"
                            : "0",
                        }}
                    ></div>
                    {/* Dot/Logo */}
                    <a
                        href={edu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => {
                        e.preventDefault();
                        setPreviewIdx(idx);
                        }}
                        className="block z-10 rounded-full ring-4 ring-blue-200 hover:ring-blue-500 transition-all duration-200 shadow-lg bg-white"
                    >
                        <img
                        src={edu.logo}
                        alt={edu.degree}
                        className="w-14 h-14 object-contain p-2 rounded-full cursor-pointer"
                        title={`Learn more about ${edu.degree}`}
                        />
                    </a>
                    {/* Lower line for last element */}
                    {idx === educationTimeline.length - 1 && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-blue-200 z-0"></div>
                    )}
                    </div>
                    {/* Info */}
                    <div>
                    <span className="block text-lg font-semibold text-blue-900">
                        {edu.degree}
                    </span>
                    <span className="block text-md text-gray-700">
                        {edu.city}
                    </span>
                    <span className="block mt-2 text-md font-bold text-blue-700">
                        {edu.grade}
                    </span>
                    </div>
                </div>
                ))}
            </div>
            </div>
            {/* Right-side: Chart or Preview */}
            <div className="flex-1 flex flex-col items-center min-h-[320px] w-full">
            {preview ? (
                <div className="w-full flex flex-col items-center border border-blue-200 bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
                <div className="flex items-center mb-2">
                    <img
                    src={preview.logo}
                    alt={preview.degree}
                    className="w-14 h-14 mr-4 rounded-full bg-white border shadow object-contain p-2"
                    />
                    <span className="text-xl font-semibold text-blue-900">{preview.degree}</span>
                </div>
                <p className="text-md text-gray-700 mb-2">{preview.description}</p>
                <a
                    href={preview.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                >
                    Go to website
                </a>
                <button
                    onClick={() => setPreviewIdx(null)}
                    className="mt-4 px-4 py-1 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-900 text-xs font-semibold"
                >
                    Back to Academic Progression
                </button>
                </div>
            ) : (
                <>
                <span className="text-xl font-semibold mb-3 text-blue-900">
                    Academic Progression
                </span>
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart
                    data={chartData}
                    margin={{ left: 50, right: 50, top: 40, bottom: 30 }}
                    >
                    <CartesianGrid stroke="#e0e9f5" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: "#165ba8", fontWeight: 700 }}
                        padding={{ left: 15, right: 15 }}
                    />
                    <YAxis
                        domain={[0.8, 2.5]}
                        reversed={true}
                        tick={{ fill: "#1857b8", fontWeight: 600 }}
                        allowDecimals={true}
                        padding={{ top: 20, bottom: 20 }}
                    />
                    <Tooltip
                        formatter={(value) => value}
                        labelFormatter={label => `Stage: ${label}`}
                        contentStyle={{
                        background: "#f7faff",
                        border: "1px solid #2d70e9",
                        borderRadius: "12px",
                        color: "#165ba8",
                        fontWeight: "bold",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#1857b8"
                        strokeWidth={3}
                        dot={{ r: 8, fill: "#2d70e9" }}
                        activeDot={{
                        r: 12,
                        fill: "#ffbe40",
                        stroke: "#2d70e9",
                        strokeWidth: 3,
                        }}
                    />
                    <ReferenceDot
                        x="B.Tech"
                        y={1.1}
                        r={15}
                        fill="#47d6c6"
                        stroke="#333"
                        strokeWidth={2}
                    />
                    </LineChart>
                </ResponsiveContainer>
                </>
            )}
            </div>
        </div>
        </div>
    );
}