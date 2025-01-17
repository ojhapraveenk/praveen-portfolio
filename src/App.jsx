import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Footer from './Components/Footer';
import Contact from './Components/Contact';
import Credit from "./Components/Credit";
import Learn from "./Components/Learn";
import Portfolio from "./Components/Portfolio";
import './App.css';
import contactImg from '../src/assets/section.jpg'
import Blog from "./Components/Blog";
function App() {
  return (
    <Router>
      {/* Navbar is always displayed */}
      <Navbar />

      {/* Main content area */}
      <Routes>
        <Route path="/" element={<Section/>}/>
        <Route path="/section" element={<Section/>}/>
        <Route path="/learn" element={<Learn />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact/>} />

        {/* Add more routes as needed */}
      </Routes>

    

      <Credit />
    </Router>
  );
}

export default App;
