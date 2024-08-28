export function formatFullDescription(description: string | string[]): string[] {
    // Si es un array, lo unimos en un solo string
    const text = Array.isArray(description) ? description.join('\n') : description;
    
    // Eliminamos los saltos de línea innecesarios y los espacios extra
    const cleanText = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Dividimos el texto en secciones basadas en los títulos (que terminan con ":")
    const sections = cleanText.split(/(?=\*\s*\w+:)/).filter(Boolean);
    
    return sections.map(section => {
      // Eliminamos los asteriscos extra y espacios al inicio de cada sección
      section = section.replace(/^\*\s*/, '');
      
      // Dividimos cada sección en título y contenido
      const [title, ...contentParts] = section.split(':');
      const content = contentParts.join(':').trim();
      
      if (content) {
        // Si hay contenido, formateamos con el título en negrita
        return `**${title.trim()}:** ${content}`;
      } else {
        // Si no hay contenido (solo título), lo devolvemos tal cual
        return section.trim();
      }
    });
  }