import { useEffect, useState } from "react";

function useLocalStorge<T extends object = object>(initialValue: T, key: string) {
  // Определяем функцию получения данных из localStorage
  const getValue = () => {
    const storge = localStorage.getItem(key);
    if (storge) {
      return JSON.parse(storge);
    }
    return initialValue;
  };
  // Используем состояние и инициализируем результатом рфботы функции getValue.
  const [value, setValue] = useState(getValue);

  // Отсеживаем изменение состояния и записываем в localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorge;
