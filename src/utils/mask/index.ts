export const removeMaskPhone = (number: string): string => {
  number = number.replace(/(\()/, '');
  number = number.replace(/(\))/, '');
  number = number.replace(/(-)/, '');

  return number;
};
