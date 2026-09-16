/**
 * Ornements vectoriels d'inspiration Art nouveau / Art déco,
 * repris des affiches de magiciens du début du XXe siècle.
 * Tous héritent de `currentColor` pour suivre la palette.
 */

/** Filet central : losange encadré de volutes, sous les titres de section. */
export function Divider({ width = 220 }: { width?: number }) {
  return (
    <svg className="orn-divider" viewBox="0 0 220 20" width={width} height={20} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M0 10 H78" />
        <path d="M142 10 H220" />
        <path d="M78 10 c6 -7 14 -7 20 0 c-6 7 -14 7 -20 0 z" />
        <path d="M142 10 c-6 -7 -14 -7 -20 0 c6 7 14 7 20 0 z" />
      </g>
      <path d="M110 2 L118 10 L110 18 L102 10 Z" fill="currentColor" />
      <circle cx="86" cy="10" r="1.6" fill="currentColor" />
      <circle cx="134" cy="10" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Fleuron d'angle du cadre doré. `flip` oriente la pièce dans les quatre coins. */
export function Corner({ flipX = false, flipY = false }: { flipX?: boolean; flipY?: boolean }) {
  return (
    <svg
      className="orn-corner"
      viewBox="0 0 90 90"
      width={90}
      height={90}
      aria-hidden="true"
      focusable="false"
      style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M2 34 C2 16 16 2 34 2" />
        <path d="M2 48 C2 24 24 2 48 2" opacity=".55" />
        <path d="M34 2 c10 0 16 6 16 14 c0 7 -5 12 -12 12 c-6 0 -10 -4 -10 -9 c0 -4 3 -7 7 -7" />
        <path d="M2 34 c0 10 6 16 14 16 c7 0 12 -5 12 -12 c0 -6 -4 -10 -9 -10 c-4 0 -7 3 -7 7" />
      </g>
      <circle cx="45" cy="45" r="2.6" fill="currentColor" />
    </svg>
  );
}

/** Soleil rayonnant Art déco, placé derrière le portrait. */
export function Sunburst({ rays = 36 }: { rays?: number }) {
  const spokes = Array.from({ length: rays }, (_, i) => {
    const a = (i * 360) / rays;
    // Un rayon sur deux est plus court : c'est ce qui donne le battement des affiches.
    const len = i % 2 === 0 ? 100 : 78;
    return <rect key={i} x="99.2" y={100 - len} width="1.6" height={len - 16} transform={`rotate(${a} 100 100)`} />;
  });
  return (
    <svg className="orn-sun" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <g fill="currentColor">{spokes}</g>
      <circle cx="100" cy="100" r="15" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="100" cy="100" r="21" fill="none" stroke="currentColor" strokeWidth="0.8" opacity=".6" />
    </svg>
  );
}

/** Petite étoile à quatre branches, utilisée comme puce et comme ponctuation. */
export function Star({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="currentColor" />
    </svg>
  );
}
