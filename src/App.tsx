import React, { useState, useEffect } from "react";
import "./App.css";
import { LanguageProvider } from "./context/LanguageContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { QuickInfo } from "./components/QuickInfo";
import { About } from "./components/About";
import { ReviewsSummary } from "./components/ReviewsSummary";
import { LocationSection } from "./components/LocationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { CataloguePage } from "./components/CataloguePage";
import { MobileFloatingBar } from "./components/MobileFloatingBar";
import { CartProvider } from "./context/CartContext";
import { CheckoutSheet } from "./components/CheckoutSheet";

export const AppContent: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [portalCategory, setPortalCategory] = useState<string>("ALL");
  const [portalQuery, setPortalQuery] = useState<string>("");
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

  // Scroll reveal animation observer
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

    observeElements();
    const t = setTimeout(observeElements, 100);

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

  const handleOpenCataloguePortal = (initialCategory?: string, initialQuery?: string) => {
    setPortalCategory(initialCategory || "ALL");
    setPortalQuery(initialQuery || "");
    navigateTo("catalogue");
  };

  return (
    <div className="app-root">
      {/* 0. Initial Loading Screen */}
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      {/* 1. Sticky Corporate White Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
      />

      <main id="main-content" className={loadingComplete ? "main-content-loaded" : ""}>
        {currentView === "catalogue" ? (
          /* Dedicated Full Interactive Product Catalogue Directory */
          <CataloguePage
            key={`${portalCategory}__${portalQuery}`}
            onBackToHome={() => navigateTo("home", "#hero")}
            initialCategory={portalCategory}
            initialSearchQuery={portalQuery}
          />
        ) : (
          /* Complete Corporate SaaS Landing Experience */
          <>
            {/* 2. Impactful Full-Width Hero Section */}
            <Hero onExploreCatalogue={() => handleOpenCataloguePortal("ALL", "")} />

            {/* 3. Trust & Statistics Strip */}
            <QuickInfo />

            {/* 4. About Us Section (2-Column with Hardware Photo & 3 Feature Cards) */}
            <About />

            {/* 5. Why Choose Us (6-Feature Icon Grid) */}
            <ReviewsSummary />

            {/* 6. Location & Google Map Section */}
            <LocationSection />

            {/* 7. Contact Section (Day Enquiries & Emergency Enquiries) */}
            <ContactSection />
          </>
        )}
      </main>

      {/* 10. Corporate Footer */}
      <Footer onNavigate={navigateTo} />

      {/* 11. Cart & Checkout Kiosk Sheet */}
      <CheckoutSheet />

      {/* 12. Mobile Floating Quick Action Bar */}
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
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;
