import Faq from "./components/Faq";
import Footer from "./components/Footer";
import History from "./components/History"
import Home from "./components/Home"
import NavBar from "./components/Nav"
import Testimonials from "./components/Testimonials"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


function App() {

  return (
    <>
      <NavBar />
      <Home />
      <Testimonials />
      <History />
      <Faq />
      <Footer />
      
    </>
  )
}

export default App
