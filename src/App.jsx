import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Contact from './Components/Contact';
import Credit from "./Components/Credit";
import Education from "./Components/Education";
import Testimonials from "./Components/Testimonials";
import './App.css';
// import contactImg from '../src/assets/section.jpg'
import contactImg from '../src/assets/profile_photo.jpg'
import SkillsTrain from "./Components/SkillsTrain";
import Projects from "./Components/ProjectsPage";
function App() {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const mode = params.get('mode') || 'data-analyst'; // default as you prefer
  return (
    <Router>
      {/* Navbar is always displayed */}
      <Navbar />

      {/* Main content area */}
      <Routes>
        <Route path="/" element={<Section/>}/>
        <Route path="/section" element={<Section/>}/>
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact/>} />
        
        {/* Add more routes as needed */}
      </Routes>
      {/* <SkillsTrain/>

      <Credit /> */}
    </Router>
  );
}

export default App;