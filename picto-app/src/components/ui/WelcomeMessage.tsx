import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../css/ImageUploader.css";

interface WelcomeMessageProps {
  text: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  textShadow?: string;
}

const StyledWelcomeMessage = styled.div<Omit<WelcomeMessageProps, "text">>`
  color: ${(props) => props.color || "white"};
  font-size: ${(props) => props.fontSize || "1rem"};
  font-family: ${(props) => props.fontFamily || "Arial, sans-serif"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  text-shadow: ${(props) => props.textShadow || "none"};
  position: relative;
  margin-bottom: 2rem;
`;

const WelcomeMessage: React.FC<WelcomeMessageProps> = (props) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < props.text.length) {
        setDisplayedText(props.text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [props.text]);

  return (
    <StyledWelcomeMessage {...props}>
      {displayedText}
      {isTypingComplete && <span className="cursor">|</span>}
    </StyledWelcomeMessage>
  );
};

export default React.memo(WelcomeMessage);
