import React from 'react';
import styled from '@emotion/styled';
import LoginImageGenerationAnimation from './LoginImageGenerationAnimation';
import LoginRegister from './LoginRegister';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:#333;
  height: 100vh;
  padding: 0 1rem;
`;

const Section = styled.div`
  flex: 1;
  margin: 10px;
`;

export default function Auth() {
  return (
    <Container>
      <Section>
        <LoginImageGenerationAnimation />
      </Section>
      <Section>
        <LoginRegister />
      </Section>
    </Container>
  );
}
