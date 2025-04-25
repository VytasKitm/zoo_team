export function search(zodis) {
    if (!zodis) return '';
  
    const sanitized = zodis.trim().toLowerCase();
    return `WHERE LOWER(vardas) LIKE '%${sanitized}%' OR LOWER(rusis) LIKE '%${sanitized}%'`;
}
  