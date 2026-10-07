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
import { MobileFloatingBar } from "./components/MobileFloatingBar";

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

  // Ultra-optimized scroll blur-fade animation observer (GPU accelerated, 60fps/120fps mobile)
  useEffect(() => {
    let currentObserver: IntersectionObserver | null = null;

    const observeElements = () => {
      const elements = document.querySelectorAll(".scroll-reveal:not(.is-revealed)");
      if (!elements.length) return;

      if (currentObserver) {
        currentObserver.disconnect();
      }

      currentObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.add("is-revealed");
              
              // Ultra-optimization: Drop GPU blur filter once transition finishes to keep 120Hz scrolling crisp
              const handleDone = () => {
                target.classList.add("is-revealed-done");
                target.removeEventListener("transitionend", handleDone);
              };
              target.addEventListener("transitionend", handleDone);
              setTimeout(() => target.classList.add("is-revealed-done"), 850);

              currentObserver?.unobserve(target);
            }
          });
        },
        {
          rootMargin: "0px 0px -30px 0px",
          threshold: 0.08,
        }
      );

      elements.forEach((el) => currentObserver?.observe(el));
    };

    // Initial check
    observeElements();

    // Small delay to ensure any rendered DOM elements are observed
    const t = setTimeout(observeElements, 100);

    // Watch for dynamic DOM changes (e.g. Catalogue filters, search)
    const mutationObs = new MutationObserver(() => {
      observeElements();
    });

    const mainEl = document.getElementById("main-content");
    if (mainEl) {
      mutationObs.observe(mainEl, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(t);
      currentObserver?.disconnect();
      mutationObs.disconnect();
    };
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

      {/* 10. Apple-Quality Floating Quick Action Dock on Mobile */}
      <MobileFloatingBar 
        currentView={currentView}
        onNavigate={navigateTo}
      />
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
