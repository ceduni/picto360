import { useContext } from "react";
import { BannerContext } from "@/contexts/BannerContext";

export const useBanner = () => {
  const context = useContext(BannerContext);

  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }

  return context;
};
