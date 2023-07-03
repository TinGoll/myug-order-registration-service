export const getStorgeData = <T extends object = object>(initialValue: T, key: string): T => {
  const storge = localStorage.getItem(key);
  if (storge) {
    return JSON.parse(storge);
  }
  return initialValue;
};

export const setStorgeData = <T extends object = object>(value: T, key: string): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
