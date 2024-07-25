export function getSafeImageUrl(src: string): string {
    const placeholderImage = '/placeholder-image.png';
    if (!src || typeof src !== 'string') return placeholderImage;
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    if (src.startsWith('/')) return src;
    if (!/^[a-zA-Z0-9-_/]+\.(jpg|jpeg|png|gif|webp)$/.test(src)) return placeholderImage;
    return `/${src}`;
  }