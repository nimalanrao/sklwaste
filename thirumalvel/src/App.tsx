import React, { useState, useEffect } from "react";
import "./App.css";
import { LanguageProvider } from "./context/LanguageContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ShiftsSection } from "./components/ShiftsSection";
import { QuickInfo } from "./components/QuickInfo";
import { About } from "./components/About";
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

  // Ultra-optimized scroll blur-fade animation observer (GPU accelerated, 0 AI slop)
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentView, loadingComplete]);

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

      {/* 1. Header & Navigation (Liquid Glass with Top English / Malay Switcher) */}
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

            {/* 2.5. Dedicated 24/7 Store Shifts & Direct Contact Section */}
            <ShiftsSection />

            {/* 3. Quick Information Section */}
            <QuickInfo />

            {/* 4. About Section */}
            <About />

            {/* 5. Combined Location & Authentic Google Reviews Section */}
            <LocationSection />

            {/* 8. Contact & Storefront Assistance Section */}
            <ContactSection />
          </>
        )}
      </main>

      {/* 9. Footer */}
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
