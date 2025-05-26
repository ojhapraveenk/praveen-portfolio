import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Contact from './Components/Contact';
import Education from "./Components/Education";
import Testimonials from "./Components/Testimonials";
import './App.css';
import Projects from "./Components/ProjectsPage";
function App() {
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
    </Router>
  );
}

export default App;