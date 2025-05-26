import tatasteelimg from "../assets/logos/tatasteel.png";
import boschimg from "../assets/logos/bosch.png";
import co2img from "../assets/logos/co2.png";
import dhlimg from "../assets/logos/dhl.png";
import bankimg from "../assets/logos/bank.png";
import soalogo from "../assets/logos/soa_logo.png";
import rwthlogo from "../assets/logos/rwth_logo.png";
// src/data/projects.js

export const timelineRoles = [
  {
    id: "bosch-thesis",
    title: "Master Thesis",
    org: "Bosch",
    location: "Stuttgart, Germany",
    dates: "03/2025-08/2025",
    logo: boschimg,
    bullets: [
      "LLM benchmarking pipeline: integrated Signavio & Celonis, automated activity mapping, visualized results.",
      "Enabled token-accuracy analysis, boosting evaluation speed by 40%."
    ]
  },
  {
    id: "bosch-intern",
    title: "Data Engineering in Process Mining Intern",
    org: "Bosch",
    location: "Stuttgart, Germany",
    dates: "09/2024-02/2025",
    logo: boschimg,
    bullets: [
      "Automated process conformance checks across Signavio and Celonis.",
      "Deployed regex-driven outlier detection for access anomalies (95% accuracy).",
      "Accelerated process mining deployment by transforming parquet data for BI and KPI analysis."
    ]
  },
  {
    id: "bosch-ws",
    title: "Working Student",
    org: "Bosch",
    location: "Aachen, Germany (WFH)",
    dates: "11/2023-08/2024",
    logo: boschimg,
    bullets: [
      "Optimized Celonis queries, reducing use case run time by 40%.",
      "Built automated permission reports, improving reporting accuracy by 75%.",
      "Trained and mentored cross-functional teams in process mining best practices."
    ]
  },
  {
    id: "bosch-senior",
    title: "Senior Associate Consultant",
    org: "Bosch Global Software Solutions",
    location: "Bangalore, India",
    dates: "07/2022-08/2023",
    logo: boschimg,
    bullets: [
      "Led process performance tuning, reducing B2C runtime from 24 to 10 hours for 32M records.",
      "Developed innovative views for P2P process, won 1st place in department hackathon.",
      "Conducted workshops on performance optimization and script versioning."
    ]
  },
  {
    id: "bosch-se",
    title: "Software Engineer",
    org: "Bosch Global Software Solutions",
    location: "Bangalore, India",
    dates: "07/2020-06/2022",
    logo: boschimg,
    bullets: [
      "Orchestrated process flow transition from Sales Order to Purchase Order across 7 systems.",
      "Developed reusable O2C task templates, reducing manual scripting effort by 30%.",
      "Migrated use cases to cloud-based Celonis (IBC), ensuring seamless transition."
    ]
  },
  {
    id: "bosch-associate",
    title: "Associate Software Engineer",
    org: "Bosch Global Software Solutions",
    location: "Bangalore, India",
    dates: "09/2019-06/2020",
    logo: boschimg,
    bullets: [
      "Supported Celonis AR use case setup, uploading and prepping 30M+ records for analysis.",
      "Aided in migrating data from Oracle SQL to SAP HANA for enterprise-scale process mining."
    ]
  },
  {
    id: "tatasteel-intern",
    title: "Data Analyst Intern",
    org: "Tata Steel",
    location: "Jamshedpur, India",
    dates: "2018",
    logo: tatasteelimg,
    bullets: [
      "Developed employee turnover prediction models to help HR design targeted retention strategies.",
      "Analyzed attrition factors, implemented feature engineering, and supported model deployment.",
    ]
  }
];

export const academicProjects = [
  {
    id: "co2-forecast",
    title: "CO2 Emissions Forecasting for EU Countries",
    section: "academic",
    featured: true,
    uni: "RWTH Aachen",
    uniLogo: rwthlogo,
    summary: "Developed a machine learning pipeline to predict national CO2 emissions across EU countries, benchmarking multiple ML models and visualizing results in Grafana.",
    details: [
      "Replicated and extended a 2024 Scientific Reports paper for the EU context.",
      "Benchmarked GBM, SVR, LSTM, and ensemble models using Docker, Grafana, and PostgreSQL.",
    ],
    tech: ["Python", "scikit-learn", "TensorFlow", "XGBoost", "Grafana", "Docker", "PostgreSQL"],
    image: co2img,
    links: [
      { label: "GitLab Repo", url: "https://git.rwth-aachen.de/ojha.praveenk/forecasting_co2_emissions.git" }
    ]
  },
  {
    id: "conformance-insights",
    title: "Automatic Conformance Checking Insights",
    section: "academic",
    featured: true,
    uni: "RWTH Aachen",
    uniLogo: rwthlogo,
    summary: "CLI tool for automatic process conformance insights from Celonis data models, enabling deeper process mining and optimization.",
    details: [
      "Developed a command-line software for computing insights from event logs.",
      "Enabled process model optimization and conformance decisions."
    ],
    tech: ["Python", "pm4py", "PyCelonis"],
    // image: require("../assets/projects/conformance.png"),
    links: [
      { label: "GitLab Repo", url: "https://git.rwth-aachen.de/stamchry/automatic-conformance-checking-insights.git" }
    ]
  },
  {
    id: "dhl-optimization",
    title: "Optimization of Transport Planning",
    section: "academic",
    featured: true,
    uni: "RWTH Aachen",
    uniLogo: rwthlogo,
    summary: "Optimized parcel transportation for DHL, designing algorithms for routes, scheduling, and loading with gurobipy and cplex.",
    details: [
      "Optimized overnight delivery network across 37 centers.",
      "Solved scheduling, routing, and loading using advanced mathematical modeling."
    ],
    tech: ["Python", "gurobipy", "cplex", "pandas"],
    image: dhlimg,
    links: [
      { label: "GitLab Repo", url: "https://git.rwth-aachen.de/ojha.praveenk/optimization-of-transport-planning-and-inbound-processing-in-package-centre" }
    ]
  },
  {
    id: "bank-marketing",
    title: "Bank Marketing Campaign",
    section: "academic",
    uni: "RWTH Aachen",
    uniLogo: rwthlogo,
    summary: "Developed a predictive model for customer term deposit subscription, handling 45k+ data points.",
    details: [
      "Binary classification using numpy, pandas, matplotlib, seaborn.",
      "Aimed to support targeted marketing strategies for financial institutions."
    ],
    tech: ["Python", "numpy", "pandas", "matplotlib", "seaborn"],
    image: bankimg,
    links: [
      { label: "GitLab Repo", url: "https://git.rwth-aachen.de/ojha.praveenk/bank-marketing-campaign.git" }
    ]
  },
  {
    id: "eco-forecast",
    title: "EcoForecast: Green Energy Surplus Prediction",
    section: "academic",
    uni: "RWTH Aachen",
    uniLogo: rwthlogo,
    summary: "Hackathon project to predict hourly green energy surplus for 9 European countries, using energy and consumption data.",
    details: [
      "Ranked 13th out of 237 teams in the challenge.",
      "Analyzed wind, solar, and geothermal data."
    ],
    tech: ["Python", "ML"],
    // image: require("../assets/projects/ecoforecast.png"),
  },
  {
    id: "vehicle-speed",
    title: "Vehicle Speed Detection Using Video",
    section: "academic",
    uni: "SOA University",
    uniLogo: soalogo,
    summary: "Final year project: developed vision software for speed violation detection on highways via live video.",
    details: [
      "Object detection from highway cameras.",
      "Automated identification of vehicles exceeding speed limits."
    ],
    tech: ["Python", "OpenCV"],
    // image: require("../assets/projects/vehicle.png"),
  },
];
