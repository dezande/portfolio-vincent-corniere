import { Star } from "./Ornament";

/**
 * Emblème d'entreprise dans la charte du site : double cercle doré, initiales gravées,
 * deux étoiles. Ce n'est pas le logo officiel de l'entreprise.
 */
export default function Monogram({ letters }: { letters: string }) {
  return (
    <span className={`monogram${letters.length > 2 ? " long" : ""}`} aria-hidden="true">
      <span className="monogram-letters">{letters}</span>
      <span className="monogram-star top">
        <Star size={9} />
      </span>
      <span className="monogram-star bottom">
        <Star size={9} />
      </span>
    </span>
  );
}
