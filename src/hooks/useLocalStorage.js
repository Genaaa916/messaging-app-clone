import { useEffect, useState } from "react";

const prefix = "messaging-app-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = prefix + key;
  const [value, setValue] = useState(() => {
    const json = localStorage.getItem(prefixedKey);
    if (json != null && json !== "") {
      return JSON.parse(json);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value !== "") {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    } else {
      localStorage.removeItem(prefixedKey);
    }
  }, [prefixedKey, value]);

  return [value, setValue];
}
