import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavRail, { type ScreenId } from "./components/NavRail";
import { Corner, Star } from "./components/Ornament";
import { Icon } from "./lib/icons";
import Home from "./sections/Home";
import About from "./sections/About";
import Resume from "./sections/Resume";
import Companies from "./sections/Companies";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import { useTheme } from "./hooks/useTheme";
import { profile } from "./data/cv";

export default function App() {
  const { theme, toggle } = useTheme();
  const [screen, setScreen] = useState<ScreenId>("home");

  function render() {
    switch (screen) {
      case "home":
        return <Home onNavigate={setScreen} />;
      case "about":
        return <About />;
      case "resume":
        return <Resume />;
      case "companies":
        return <Companies />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
    }
  }

  return (
    <div className="app">
      <a className="skip-link" href="#screen">
        Aller au contenu
      </a>

      <NavRail active={screen} onChange={setScreen} />

      <div className="stage">
        <AnimatePresence mode="wait">
          <motion.main
            key={screen}
            id="screen"
            className="screen"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {render()}
          </motion.main>
        </AnimatePresence>

        <footer className="footer">
          <Star size={9} />
          <span>© {new Date().getFullYear()}</span>
          <span className="gold">{profile.fullName}</span>
          <span className="long">· Tous droits réservés</span>
          <Star size={9} />
        </footer>
      </div>

      <div className="tools">
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === "dark" ? "Passer en version papier (claire)" : "Passer en version nuit (sombre)"}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} aria-hidden="true" />
        </button>
      </div>

      {/* Décor d'affiche : double filet doré, fleurons d'angle, grain du papier */}
      <div className="frame" aria-hidden="true">
        <span className="c-tl"><Corner /></span>
        <span className="c-tr"><Corner flipX /></span>
        <span className="c-bl"><Corner flipY /></span>
        <span className="c-br"><Corner flipX flipY /></span>
      </div>
      <div className="grain" aria-hidden="true" />
    </div>
  );
}
