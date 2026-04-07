import { MessageBannerRef, MessageBannerType } from "@/utils/Types";
import { createContext, useRef, ReactNode } from "react";
import ErrorBanner from "@/components/FeedbackBanner";

export interface BannerContextType {
  setBannerMessage: (message: string, type?: MessageBannerType, duration?: number) => void;
}

export const BannerContext = createContext<BannerContextType | null>(null);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const bannerRef = useRef<MessageBannerRef>(null);

  const setBannerMessage = (message: string, type?: MessageBannerType, duration?: number) => {
    bannerRef.current?.trigger(message, type, duration);
  };

  return (
    <BannerContext.Provider value={{ setBannerMessage }}>
      <ErrorBanner ref={bannerRef} />
      {children}
    </BannerContext.Provider>
  );
};
