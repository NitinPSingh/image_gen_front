import React from 'react';
import {styled} from '@mui/system';
import {Box} from '@mui/material';
import ChatContent from './ChatContent';
import ChatInputForm from './ChatInput';

const ChatSection = styled(Box)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ChatHistory = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  padding: 20px;
  overflow-y: auto;
  background-color: #333;
`;

export default function RightContainer() {

    return (
        <ChatSection>
                <React.Fragment>
            <ChatHistory>
                <ChatContent/>
            </ChatHistory>
            <ChatInputForm/>
            </React.Fragment>


        </ChatSection>
    )
}
