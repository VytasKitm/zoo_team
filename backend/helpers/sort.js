export function sort({ sortBy, order }) {
    const allowedFields = ['vardas', 'rusis', 'svoris'];
    const allowedOrder = ['asc', 'desc'];
  
    if (!allowedFields.includes(sortBy) || !allowedOrder.includes(order?.toLowerCase())) {
      return '';
    }
  
    return `ORDER BY ${sortBy} ${order.toUpperCase()}`;
}
  