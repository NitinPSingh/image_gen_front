
import { styled } from '@mui/system';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useChat } from '../../contexts/ChatContext';
import ImagePreview from '../imageviewer';
import { useAuthContext } from '../../contexts/AuthContext';

const Message = styled(Paper)`
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%;
`;

const UserMessage = styled(Box)`
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse; 
  gap: 10px;
  width: 100%;
`;

const BotMessage = styled(Box)`
  display: flex;
  align-items: flex-start;
  flex-direction: row; 
  gap: 10px;
  width: 100%;
`;

const BotAvatar = styled(Avatar)`
  background-color: #3f51b5;
`;

const UserAvatar = styled(Avatar)`
  background-color: #f50057;
`;

export default function ChatContent() {
    const { chats } = useChat();
    const scrollDown = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        scrollDown.current?.scrollIntoView({ behavior: 'smooth' });
    },[chats])

  return (
    <React.Fragment>
      {chats.length==0 && <div style={{margin:'auto',color:'white',fontSize:'24px'}}>Hi , Start chating with bot</div>}
    {chats.map((chat) =>
        chat.is_bot ? (
          <BotMessage key={chat.id}>
            <BotAvatar>
              <SmartToyIcon />
            </BotAvatar>
            <Message>
              {chat.files?.map((file) => (
                <ImagePreview key={file.id} uri={file.file} w={'300px'} h={'300px'} />
              ))}
            </Message>
          </BotMessage>
        ) : (
          <UserMessage key={chat.id}>
            <UserAvatar>
              <PersonIcon />
            </UserAvatar>
            <Message>
              <Typography>{chat?.chat_content?.text}</Typography>
              {chat.files?.map((file) => (
                <ImagePreview key={file.id} uri={file.file} w={'300px'} h={'300px'} />
              ))}
            </Message>
          </UserMessage>
        
        )
      )}
      <div ref={scrollDown}></div>

        </React.Fragment>
  )
}
