export function sort({sort, order} = {}) {
    const map = {
      vardas:    'vardas',
      rusis: 'rusis',
      svoris:  'svoris '
    };
    const field = map[sort] || 'id';
    const dir   = order === 'desc' ? 'DESC' : 'ASC';
    console.log(`field: ${field}, dir: ${dir}`)
    return `ORDER BY ${field} ${dir}`;
}
  