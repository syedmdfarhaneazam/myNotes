import { createContext, useContext } from "react";

// Define color palette options
export const colorPalettes = {
  default: ["#000000", "#333333", "#666666", "#999999"],
  primary: ["#1A535C", "#4ECDC4", "#F7FFF7", "#FF6B6B"],
  warm: ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D"],
  cool: ["#5F0F40", "#9A031E", "#FB8B24", "#E36414"],
  pastel: ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF"],
  vibrant: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"],
  earth: ["#582F0E", "#7F4F24", "#936639", "#A68A64"],
  jewel: ["#480CA8", "#4895EF", "#4CC9F0", "#560BAD"],
};

// Create the context
export const ColorPaletteContext = createContext();

// Create a provider component
export const ColorPaletteProvider = ({ children }) => {
  return (
    <ColorPaletteContext.Provider value={{ colorPalettes }}>
      {children}
    </ColorPaletteContext.Provider>
  );
};

// Custom hook to use the color palette context
export const useColorPalette = () => {
  const context = useContext(ColorPaletteContext);
  if (!context) {
    throw new Error(
      "useColorPalette must be used within a ColorPaletteProvider",
    );
  }
  return context;
};
