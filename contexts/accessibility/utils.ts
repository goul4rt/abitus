import { type AccessibilitySettings } from "./types";

export const getFontFamilyValue = (fontFamily: string): string => {
  switch (fontFamily) {
    case "dyslexic":
      return "'OpenDyslexic', sans-serif";
    case "sans-serif":
      return "Arial, Helvetica, sans-serif";
    case "serif":
      return "Georgia, 'Times New Roman', serif";
    case "default":
    default:
      return "var(--font-sans)";
  }
};

export const applyAccessibilityStyles = (
  settings: AccessibilitySettings
): void => {
  const root = document.documentElement;
  const body = document.body;

  // Font size
  root.classList.remove(
    "text-size-small",
    "text-size-medium",
    "text-size-large",
    "text-size-extra-large"
  );
  root.classList.add(`text-size-${settings.fontSize}`);

  // Contrast
  root.classList.remove(
    "contrast-normal",
    "contrast-high",
    "contrast-inverted"
  );
  root.classList.add(`contrast-${settings.contrast}`);

  // Font family
  body.style.fontFamily = getFontFamilyValue(settings.fontFamily);
  body.classList.remove(
    "font-default",
    "font-dyslexic",
    "font-sans-serif",
    "font-serif"
  );
  body.classList.add(`font-${settings.fontFamily}`);

  // Line spacing
  root.style.setProperty("--line-spacing", settings.lineSpacing.toString());

  // Motion
  if (settings.reduceMotion) {
    root.classList.add("reduce-motion");
  } else {
    root.classList.remove("reduce-motion");
  }
};
