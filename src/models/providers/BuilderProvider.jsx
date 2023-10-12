import React, { createContext, useContext, useState, useEffect } from "react";

const BuilderContext = createContext();

export function useBuilder() {
  return useContext(BuilderContext);
}

export function BuilderProvider({ children }) {
  const [builderData, setBuilderData] = useState({
    storedBgImage: "",
    storedBgCarouselImgs: [],
  });

  const updateStoredBgImage = (newBgImage) => {
    setBuilderData((prevData) => ({
      ...prevData,
      storedBgImage: newBgImage,
    }));
  };

  const updateStoredBgCarouselImgs = (newCarouselImgs) => {
    setBuilderData((prevData) => ({
      ...prevData,
      storedBgCarouselImgs: newCarouselImgs,
    }));
  };

  

  useEffect(() => {
    
  }, []);

  return (
    <BuilderContext.Provider value={{ builderData, updateStoredBgImage, updateStoredBgCarouselImgs }}>
      {children}
    </BuilderContext.Provider>
  );
}
