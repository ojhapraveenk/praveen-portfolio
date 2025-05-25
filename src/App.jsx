import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Footer from './Components/Footer';
import Contact from './Components/Contact';
import Credit from "./Components/Credit";
import Education from "./Components/Education";
import Portfolio from "./Components/Portfolio";
import './App.css';
// import contactImg from '../src/assets/section.jpg'
import contactImg from '../src/assets/profile_photo.jpg'
import Blog from "./Components/Blog";
import SkillsTrain from "./Components/SkillsTrain";
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact/>} />
        
        {/* Add more routes as needed */}
      </Routes>
      {/* <SkillsTrain/>

      <Credit /> */}
    </Router>
  );
}

export default App;
