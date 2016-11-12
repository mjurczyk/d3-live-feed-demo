export function TextNumber(value = 0) {
  const stringified = value.toString();
  
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/gm, '.');
};
