import tatasteelimg from "../assets/logos/tatasteel.png";
import boschimg from "../assets/logos/bosch.png";
import co2img from "../assets/logos/co2.png";
import dhlimg from "../assets/logos/dhl.png";
import bankimg from "../assets/logos/bank.png";
import soalogo from "../assets/logos/soa_logo.png";
import rwthlogo from "../assets/logos/rwth_logo.png";
import lhindlogo from "../assets/logos/lhind_logo.png";

export const timelineRoles = [
  {
    id: "lhind",
    title: "IT Consultant",
    org: "Lufthansa Industry Solutions",
    location: "Frankfurt, Germany",
    dates: "11/2025-02/2026",
    logo: lhindlogo,
    tags: ["PM", "DA"],
    bullets: [
      "Analysis, design, and implementation of process mining solutions based on the Celonis Intelligence Platform.",
      "Mapping, structuring, and evaluating business processes within airline operations in close coordination with specialized departments.",
      "Extraction, transformation, and modeling (ETL) of process data from ERP and third-party systems (e.g., SAP) for utilization in Celonis.",
      "Identification of efficiency potential, lead-time deviations, maverick buying, compliance risks, and automation opportunities.",
      "Creation of dashboards, analyses, and management reports to support decision-making at both operational and strategic levels.",
      "Facilitating workshops, training sessions, and enablement measures for specialist staff and executives.",
      "Ensuring data quality, adherence to governance standards, and documentation of implemented solutions."
    ]
  },
  {
    id: "bosch-thesis",
    title: "Master Thesis",
    org: "Bosch",
    location: "Stuttgart, Germany",
    dates: "03/2025-08/2025",
    tags: ["PM", "DA"],
    logo: boschimg,
    bullets: [
      "Built an automated benchmarking framework for 10+ LLMs to support AI-ready process mapping, using iterative feedback loops for BPMN activity mapping.",
      "Benchmarked LLM mapping accuracy against manually validated gold standards, delivering advanced evaluation metrics (precision, recall, F1) and achieving 20% improvement in workflow processing speed.",
      "Enabled end-to-end process mining conformance analysis by linking LLM-generated mappings with token-based replay metrics, supporting dynamic dashboards and business-ready validation."
    ]
  },
  {
    id: "bosch-intern",
    title: "Data Engineering in Process Mining Intern",
    org: "Bosch",
    location: "Stuttgart, Germany",
    dates: "09/2024-02/2025",
    tags: ["PM", "DA"],
    logo: boschimg,
    bullets: [
      "Streamlined Celonis platform tasks (data pool backups, job health checks) with 60% faster execution and automated regex-based outlier detection for access anomalies, cutting manual audit effort by 80%.",
      "Designed a Streamlit application that automated process conformance checks across Signavio and Celonis; enabled structured activity mapping workflows used in 3+ pilot use cases during the PoC phase.",
      "Launched a gamified leaderboard using LLM-scored commits to boost versioning, increasing developer engagement by 45%, and automated weekly adoption tracking via Celonis ML Workbench and Action Flow.",
      "Documented and standardised test management in Azure DevOps, ran workshops for 10+ developers, and aligned UAT execution with the TEST MANAGEMENT 4.0 framework using reusable templates and clear roles."
    ]
  },
  {
    id: "bosch-ws",
    title: "Working Student",
    org: "Bosch",
    location: "Aachen, Germany (Remote)",
    dates: "11/2023-08/2024",
    tags: ["PM"],
    logo: boschimg,
    bullets: [
      "Optimised Celonis transformation queries and data model loading, cutting use case runtime and memory usage by 40%.",
      "Streamlined Celonis platform tasks (data pool backups, job health checks) with 60% faster execution and automated regex-based outlier detection for access anomalies, cutting manual audit effort by 80%.",
      "Built automated permission reporting Views from the Knowledge Model, enabling quick detection of false permissions and improving reporting accuracy by 75%.",
      "Assessed process maturity, data availability, and standardisation levels to determine suitability for optimisation, automation, or AI-driven solutions across multiple process mining use cases.",
      "Planned and delivered a 6-day Celonis enablement program for cross-functional participants (3 IT and 2 management), including exercises, templates, and a structured rollout approach to support adoption."
    ]
  },
  {
    id: "bosch-senior",
    title: "Senior Associate Consultant",
    org: "Bosch Global Software Solutions",
    location: "Bangalore, India",
    dates: "07/2022-08/2023",
    logo: boschimg,
    tags: ["PM"],
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
    tags: ["PM"],
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
    tags: ["PM"],
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
    tags: ["DA"],
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
