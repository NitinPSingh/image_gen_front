import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import LeftSidebar from './LeftSidebar';
import RightContainer from './RightContainer';
const Container = styled(Box)`
  display: flex;
  height: 100vh;
`;




const ChatApp: React.FC = () => {
 
  return (
    <Container>
      <LeftSidebar />
      <RightContainer />
 
    </Container>
  );
};

export default ChatApp;
