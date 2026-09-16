import { motion } from "framer-motion";
import PageHead from "../components/PageHead";
import { Divider } from "../components/Ornament";
import { Icon } from "../lib/icons";
import { interests } from "../data/cv";

export default function Interests() {
  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Hors de la scène" title="Centres d'intérêt" />

      <div className="interests">
        {interests.map((it, i) => (
          <motion.article
            key={it.title}
            className="interest card-deco"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="interest-medal" aria-hidden="true">
              <Icon name={it.icon} />
            </span>
            <h3>{it.title}</h3>
            <Divider width={120} />
            {it.text && <p>{it.text}</p>}
          </motion.article>
        ))}
      </div>
    </div>
  );
}
