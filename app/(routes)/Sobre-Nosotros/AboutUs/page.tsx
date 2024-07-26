import Navbar from "../MainPage/Navbar";
import Footer from "../MainPage/Footer";
import AboutUs from "./aboutus";
import { CartProvider } from "../../../Productos/CartContext";

export default function About() {
  return (
    <CartProvider>
    <main>
    
        <Navbar />
        <AboutUs />
        <Footer />
      
    </main>
    </CartProvider>
  );
}
