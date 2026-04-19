import { create } from 'zustand';

interface SdAppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  // Here we can store global states like "is 3D model loaded sequence finished"
  isAppReady: boolean;
  setAppReady: (ready: boolean) => void;
}

export const useSdAppStore = create<SdAppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => {
    // Also update the document class for Tailwind
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    set({ theme });
  },
  isAppReady: false,
  setAppReady: (ready) => set({ isAppReady: ready }),
}));
