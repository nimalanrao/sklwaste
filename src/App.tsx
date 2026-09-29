import React, { useState, useEffect } from "react";
import "./App.css";
import { LanguageProvider } from "./context/LanguageContext";
import { LoadingScreen } from "./components/LoadingScreen";
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
import { CataloguePage } from "./components/CataloguePage";

export const AppContent: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "catalogue">(() => {
    if (typeof window !== "undefined" && window.location.hash === "#catalogue") {
      return "catalogue";
    }
    return "home";
  });

  // Handle URL hash changes for Back/Forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#catalogue") {
        setCurrentView("catalogue");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCurrentView("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (view: "home" | "catalogue", hash?: string) => {
    setCurrentView(view);
    if (view === "catalogue") {
      window.location.hash = "#catalogue";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (hash) {
        window.location.hash = hash;
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 50);
      } else {
        window.location.hash = "#hero";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="app-root">
      {/* 0. Brand Loading Screen Animation */}
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      {/* 1. Header & Navigation (with Top English / Malay Switcher and Catalogue Link) */}
      <Header 
        currentView={currentView}
        onNavigate={navigateTo}
      />

      <main id="main-content" className={loadingComplete ? "main-content-loaded" : ""}>
        {currentView === "catalogue" ? (
          /* Dedicated Product Catalogue Page */
          <CataloguePage 
            onBackToHome={() => navigateTo("home", "#hero")}
          />
        ) : (
          /* Main Store Overview Landing Sections */
          <>
            {/* 2. Hero Section */}
            <Hero />

            {/* 3. Quick Information Section */}
            <QuickInfo />

            {/* 4. About Section */}
            <About />

            {/* 5. Hardware & Products Section (with Link to Catalogue) */}
            <HardwareEnquiries 
              onOpenCatalogue={() => navigateTo("catalogue")}
            />

            {/* 6. Gallery Section with Interactive Lightbox */}
            <Gallery />

            {/* 7. Reviews & Reputation Section */}
            <ReviewsSummary />

            {/* 8. Location & Directions Section */}
            <LocationSection />

            {/* 9. Contact Section */}
            <ContactSection />
          </>
        )}
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
