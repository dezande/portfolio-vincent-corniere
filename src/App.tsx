import { useCallback, useEffect, useState } from "react";
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
import { parsePath, pathFor, titleFor, type Route } from "./lib/routes";

export default function App() {
  const { theme, toggle } = useTheme();
  // L'adresse du navigateur est la source de vérité : on la lit au chargement…
  const [route, setRoute] = useState<Route>(() => parsePath(window.location.pathname));
  const { screen, company: projectCompany } = route;

  // …on la réécrit à chaque changement de page (push) ou de filtre (replace)…
  const go = useCallback((next: Route, mode: "push" | "replace" = "push") => {
    const url = pathFor(next);
    if (url !== window.location.pathname) window.history[mode === "push" ? "pushState" : "replaceState"](null, "", url);
    setRoute(next);
  }, []);

  // …et on suit les boutons Précédent / Suivant.
  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Adresse canonique (ex. /projets sans barre finale → /projets/) et titre d'onglet.
  useEffect(() => {
    const url = pathFor(route);
    if (url !== window.location.pathname) window.history.replaceState(null, "", url);
    document.title = titleFor(route, `${profile.fullName} — ${profile.role}`);
  }, [route]);

  function navigate(id: ScreenId) {
    // Depuis le menu, l'écran Projets s'ouvre sur toutes les entreprises.
    go({ screen: id, company: null });
  }

  function openCompanyProjects(company: string) {
    go({ screen: "projects", company });
  }

  function changeProjectCompany(company: string | null) {
    // Changer de filtre met à jour l'adresse sans empiler l'historique.
    go({ screen: "projects", company }, "replace");
  }

  function render() {
    switch (screen) {
      case "home":
        return <Home onNavigate={navigate} />;
      case "about":
        return <About />;
      case "resume":
        return <Resume />;
      case "companies":
        return <Companies onOpenProjects={openCompanyProjects} />;
      case "projects":
        return <Projects company={projectCompany} onCompanyChange={changeProjectCompany} />;
      case "contact":
        return <Contact />;
    }
  }

  return (
    <div className="app">
      <a className="skip-link" href="#screen">
        Aller au contenu
      </a>

      <NavRail active={screen} onChange={navigate} />

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
