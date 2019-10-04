export const flatToUnique = (prev,act) => [...prev, ...act.filter(node => prev.indexOf(node ) === -1)]
