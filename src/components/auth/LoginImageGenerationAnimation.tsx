import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface Content {
  text: string;
  image: string;
}

const contentArray: Content[] = [
  {
    text: 'A photorealistic image of an astronaut riding a horse',
    image: 'https://images.ctfassets.net/kftzwdyauwt9/5GOIjwbUjLZHoGhX6q5oQg/d2984681d2a9466b71b7ca7632a8481c/Anastronautridingahorseinaphotorealisticstyle0.jpg?w=640&q=90&fm=webp',
  },
  {
    text: 'A cat on a wooden rocking chair napping in the sunlight.',
    image: 'https://images.ctfassets.net/kftzwdyauwt9/4xRSuCnoKAT9ZGfMYFcRZ1/50e5e29dfef68113f6123e512b49ca14/cat-nap.png?w=1920&q=90&fm=webp',
  },
  {
    text: 'An expressive oil painting of a chocolate chip cookie being dipped in a glass of milk.',
    image: 'https://images.ctfassets.net/kftzwdyauwt9/1LhyQ3RdyPfvqqHJxEfcYe/78e9693b3e5e9ec1711c7a8e69a97e4e/dalle_3_cookie.jpg?w=1920&q=90&fm=webp',
  },
];

const LoginImageGenerationAnimation: React.FC = () => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const currentContent = contentArray[currentContentIndex];

  // Typing animation effect
  useEffect(() => {
    let charIndex = 0;
    let typingTimeout: NodeJS.Timeout;
    let clearTimeoutx: NodeJS.Timeout;

    const typeText = () => {
      if (charIndex < currentContent.text.length - 1) {
        setDisplayedText((prev) => prev + currentContent.text[charIndex]);
        setOpacity(charIndex / ( currentContent.text.length));
        charIndex++;
        typingTimeout = setTimeout(typeText, 50);
      } else {
        setIsTyping(false);
        clearTimeoutx = setTimeout(() => {
          setDisplayedText('');
          setCurrentContentIndex((prevIndex) => (prevIndex + 1) % contentArray.length);
          setIsTyping(true);
        }, 3000);
      }
    };
    setOpacity(0);
    setDisplayedText(currentContent.text[0]);
    charIndex = 0;
    setIsTyping(true);
    typingTimeout = setTimeout(typeText, 50);

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(clearTimeoutx);
    };
  }, [currentContent]);

  return (
    <Container>
      <TextContainer>
        {displayedText}
      </TextContainer>
      <ImageContainer>
        {opacity>0.1 && <Image src={currentContent.image} alt="Illustrative" opacity={opacity-0.1} /> }
      </ImageContainer>
    </Container>
  );
};

// Styled Components using Emotion
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
  min-height: 100vh;
  flex-direction: column;
  color: #fff;
  gap:20px;
  padding: 0px 20px;
`;

const ImageContainer = styled.div`
  width: 400px;
  height: 300px;
  margin-bottom: 20px;
`;

const Image = styled.img<{ opacity: number }>`
opacity: ${(props) => props.opacity};
transition: opacity 0.5s ease-in-out;
object-fit: cover;
border-radius: 10px;
width: 100%;
height: 100%;
`;

const TextContainer = styled.div`
  font-size: 20px;
  font-family: cursive;
  text-align: left;

`;

export default LoginImageGenerationAnimation;
