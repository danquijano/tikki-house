

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Quotes from "./pages/Quotes";
import AboutTiki from "./pages/AboutTiki";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
 

function App() {
  return ( 
    <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/quotes" element={<Quotes />} />
    <Route path="/nosotros" element={<AboutTiki />} />
     <Route path="/Login" element={<Login />} />
  </Routes>
</Router>
  );
}

export default App;
