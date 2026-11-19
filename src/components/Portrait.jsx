// Hero portrait: AVIF with WebP fallback, served from public/images.

// Hero portrait lives in public/ so index.html can preload it under a stable
// URL. AVIF first, WebP as fallback (both keep the cut-out's transparency).
const portraitAvif = `${import.meta.env.BASE_URL}images/daniel-popa-portrait.avif`;

const portraitWebp = `${import.meta.env.BASE_URL}images/daniel-popa-portrait.webp`;

export function Portrait({ className, alt }) {
  return (
    <picture>
      <source srcSet={portraitAvif} type="image/avif" />
      <img
        className={className}
        src={portraitWebp}
        alt={alt}
        width="1056"
        height="1027"
        fetchPriority="high"
      />
    </picture>
  );
}
