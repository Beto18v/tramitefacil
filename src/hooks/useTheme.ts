import { useEffect } from 'react';

export type ThemeMode = 'dark';

export function useTheme(): [ThemeMode, () => void] {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tramitefacil_theme', 'dark');
    }
  }, []);

  // No-op toggle because the application is exclusively designed for the dark Esmeralda & Oro palette
  const noopToggle = () => {};

  return ['dark', noopToggle];
}
