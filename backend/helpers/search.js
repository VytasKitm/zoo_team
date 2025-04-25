export function search({q} = {}) {
    if (!q) {
        return { clause: '', params: [] }; 
    }
      const term = `%${q}%`;
      return {
        clause: 'WHERE (vardas LIKE ? OR rusis LIKE ?)',
        params: [term, term],
      };
}
  