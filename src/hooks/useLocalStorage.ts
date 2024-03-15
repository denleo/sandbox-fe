import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  fallBackValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (!item) return fallBackValue;

    return JSON.parse(item) as T;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
