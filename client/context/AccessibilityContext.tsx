import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilitySettings {
  darkMode: boolean;
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReduceMotion: () => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  darkMode: false,
  highContrast: false,
  largeText: false,
  reduceMotion: false,
};

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("reddit-accessibility-settings");
      if (stored) {
        try {
          return { ...defaultSettings, ...JSON.parse(stored) };
        } catch (e) {
          console.error("Failed to parse accessibility settings:", e);
        }
      }

      // Check system preferences
      const systemDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const systemReduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      return {
        ...defaultSettings,
        darkMode: systemDarkMode,
        reduceMotion: systemReduceMotion,
      };
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(
      "reddit-accessibility-settings",
      JSON.stringify(settings),
    );

    // Apply classes to document
    const { darkMode, highContrast, largeText, reduceMotion } = settings;

    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.classList.toggle("high-contrast", highContrast);
    document.documentElement.classList.toggle("large-text", largeText);
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);

    // Update CSS custom properties for high contrast
    if (highContrast) {
      document.documentElement.style.setProperty(
        "--wireframe-bg",
        darkMode ? "0 0% 0%" : "0 0% 100%",
      );
      document.documentElement.style.setProperty(
        "--wireframe-text-primary",
        darkMode ? "0 0% 100%" : "0 0% 0%",
      );
      document.documentElement.style.setProperty(
        "--wireframe-border",
        darkMode ? "0 0% 100%" : "0 0% 0%",
      );
      document.documentElement.style.setProperty(
        "--wireframe-surface-primary",
        darkMode ? "0 0% 10%" : "0 0% 95%",
      );
    } else {
      // Reset to normal contrast values
      if (darkMode) {
        document.documentElement.style.setProperty("--wireframe-bg", "0 0% 9%");
        document.documentElement.style.setProperty(
          "--wireframe-text-primary",
          "0 0% 95%",
        );
        document.documentElement.style.setProperty(
          "--wireframe-border",
          "0 0% 15%",
        );
        document.documentElement.style.setProperty(
          "--wireframe-surface-primary",
          "0 0% 12%",
        );
      } else {
        document.documentElement.style.setProperty(
          "--wireframe-bg",
          "0 0% 100%",
        );
        document.documentElement.style.setProperty(
          "--wireframe-text-primary",
          "0 0% 15%",
        );
        document.documentElement.style.setProperty(
          "--wireframe-border",
          "0 0% 85%",
        );
        document.documentElement.style.setProperty(
          "--wireframe-surface-primary",
          "0 0% 98%",
        );
      }
    }
  }, [settings]);

  const toggleDarkMode = () => {
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleLargeText = () => {
    setSettings((prev) => ({ ...prev, largeText: !prev.largeText }));
  };

  const toggleReduceMotion = () => {
    setSettings((prev) => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value: AccessibilityContextType = {
    settings,
    toggleDarkMode,
    toggleHighContrast,
    toggleLargeText,
    toggleReduceMotion,
    resetSettings,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
