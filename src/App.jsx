import Checkout from "./components/Checkout";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import History from "./components/History"
import Home from "./components/Home"
import NavBar from "./components/Nav"
import Testimonials from "./components/Testimonials"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Policy from "./components/Policy";
import Terms from "./components/Terms";
import Cancel from "./components/Cancel";


function App() {

  return (
    <>
      
      <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Testimonials />
            <History />
            <Faq />
        
          <Footer width={85} />
          </>
        } />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
