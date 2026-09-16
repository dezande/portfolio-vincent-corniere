import { motion } from "framer-motion";
import Pill from "../components/Pill";
import { Star, Sunburst } from "../components/Ornament";
import { profile } from "../data/cv";
import type { ScreenId } from "../components/NavRail";

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Home({ onNavigate }: { onNavigate: (id: ScreenId) => void }) {
  return (
    <div className="home">
      <div className="home-text">
        <motion.div className="billing" variants={rise} initial="hidden" animate="show" custom={0}>
          <Star />
          Paris présente
          <Star />
        </motion.div>

        <motion.h1 variants={rise} initial="hidden" animate="show" custom={1}>
          <span className="first">{profile.firstName}</span>
          <span className="last">{profile.lastName}</span>
        </motion.h1>

        <motion.div className="marquee" variants={rise} initial="hidden" animate="show" custom={2}>
          <Star size={10} />
          {profile.role}
          <Star size={10} />
        </motion.div>

        <motion.p className="intro" variants={rise} initial="hidden" animate="show" custom={3}>
          {profile.intro}
        </motion.p>

        <motion.div className="home-actions" variants={rise} initial="hidden" animate="show" custom={4}>
          <Pill onClick={() => onNavigate("about")}>Entrez en scène</Pill>
        </motion.div>
      </div>

      <motion.div
        className="home-photo"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Sunburst />
        <div className="arch">
          <figure>
            <img src={profile.photo} alt={`${profile.fullName}, ${profile.roleLong}`} />
          </figure>
          <span className="plaque">Depuis 2015</span>
        </div>
      </motion.div>
    </div>
  );
}
