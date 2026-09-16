import { Divider } from "./Ornament";

/** Titre de section façon affiche : sur-titre, titre dont le dernier mot est doré, filet orné. */
export default function PageHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  const words = title.split(" ");
  const last = words.pop();
  return (
    <header className="page-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>
        {words.join(" ")} <span className="gold">{last}</span>
      </h2>
      <Divider />
    </header>
  );
}
