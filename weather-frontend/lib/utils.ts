export const convertTemp = (temp: number, unit: 'C' | 'F') => {
    if (unit === 'F') return (temp * 9/5) + 32;
    return temp;
  };
  