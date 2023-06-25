import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(key) ?? defaultValue);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
