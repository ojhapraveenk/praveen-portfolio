import React, { useState } from "react";
import "./SkillsTrain.css";
import pythonLogo from '../assets/logos/python.png';
import streamlitLogo from '../assets/logos/streamlit.png';
import sqlLogo from '../assets/logos/sql.png';
import celonisLogo from '../assets/logos/celonis.png';
import dockerLogo from '../assets/logos/docker.png';
import gitLogo from '../assets/logos/git.png';
import grafanaLogo from '../assets/logos/grafana.png';
import mlLogo from '../assets/logos/ml.png';
import pmLogo from '../assets/logos/pm.png';
import flaskLogo from '../assets/logos/flask.svg';
import bashLogo from '../assets/logos/bash.svg';
import pandasLogo from '../assets/logos/pandas.svg';
import numpyLogo from '../assets/logos/numpy.svg';
import pycelonisLogo from '../assets/logos/pycelonis.png';
import pm4pyLogo from '../assets/logos/pm4py.png';

const processDomains = [
    "Order 2 Cash",
    "Affiliate 2 Business",
    "Purchase 2 Pay",
    "Bill 2 Cash",
];
const skills = [
    { icon: pythonLogo, label: "Python", type: "img"},
    { icon: pandasLogo, label: "Pandas", type: "img" },
    { icon: numpyLogo, label: "Numpy", type: "img" },
    { icon: sqlLogo, label: "SQL", type: "img" },
    { icon: celonisLogo, label: "Celonis", type: "img" },
    { icon: pmLogo, label: "OCPM", type: "img" },
    { icon: pycelonisLogo, label: "PyCelonis", type: "img" },
    { icon: pm4pyLogo, label: "PM4Py", type: "img" },
    { icon: mlLogo, label: "Machine Learning", type: "img" },
    { icon: gitLogo, label: "Git", type: "img" },
    { icon: bashLogo, label: "Bash", type: "img" },
    // { icon: "📈", label: "scikit-learn" },
    // { icon: "🔬", label: "TensorFlow" },
    // { icon: "📊", label: "Seaborn" },
    { icon: streamlitLogo, label: "Streamlit", type: "img" },
    { icon: dockerLogo, label: "Docker", type: "img" },
    { icon: flaskLogo, label: "Flask", type: "img" },
    { icon: grafanaLogo, label: "Grafana", type: "img" },
    // { icon: "🧩", label: "GurobiPy" },
    {
        icon: "🛠️",
        label: "Process Domain Expertise",
        type: "emoji",
        tooltip: processDomains.join(", "),
    },
];

function SkillsTrain() {
    const [hovered, setHovered] = useState(null);
    const skillItems = [...skills, ...skills];

    return (
        <div className="skills-train-outer">
            <div className="skills-train-track">
                {skillItems.map((skill, idx) => {
                    const isProcessChip = skill.label === "Process Domain Expertise";
                    const uniqueKey = idx + '-' + skill.label;
                    const isHovered = hovered === uniqueKey;
                    return (
                        <div
                            className={`skill-chip${hovered === uniqueKey ? " hovered" : ""}`}
                            key={uniqueKey}
                            onMouseEnter={() => skill.tooltip && setHovered(uniqueKey)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ position: "relative" }}
                        >
                            <span className="skill-icon">
                                {skill.type === "img"
                                ? <img src={skill.icon} alt={skill.label} />
                                : skill.icon
                                }
                            </span>
                            <span className="skill-label">{skill.label}</span>
                            {isProcessChip && hovered === idx && (
                                <span className="skill-tooltip">
                                    Order 2 Cash, Affiliate 2 Business, Purchase 2 Pay, Bill 2 Cash, Invoice 2 Pay
                                </span>
                            )}
                            {skill.tooltip && hovered === uniqueKey && (
                                <span className="skill-tooltip">{skill.tooltip}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SkillsTrain;