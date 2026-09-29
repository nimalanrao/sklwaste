import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { QuickInfo } from "./components/QuickInfo";
import { About } from "./components/About";
import { HardwareEnquiries } from "./components/HardwareEnquiries";
import { Gallery } from "./components/Gallery";
import { ReviewsSummary } from "./components/ReviewsSummary";
import { LocationSection } from "./components/LocationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  return (
    <div className="app-root">
      {/* 1. Header & Navigation */}
      <Header />

      <main id="main-content">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Quick Information Section */}
        <QuickInfo />

        {/* 4. About Section */}
        <About />

        {/* 5. Hardware & Products Section (Enquiries Focus) */}
        <HardwareEnquiries />

        {/* 6. Gallery Section with Interactive Lightbox */}
        <Gallery />

        {/* 7. Reviews & Reputation Section */}
        <ReviewsSummary />

        {/* 8. Location & Directions Section */}
        <LocationSection />

        {/* 9. Contact Section */}
        <ContactSection />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
};

export default App;
