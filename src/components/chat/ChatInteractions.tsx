import { Button, List, ListItemText } from '@mui/material';
import React from 'react';
import ListItem from '@mui/material/ListItem';
import { useChat } from '../../contexts/ChatContext';

export default function ChatInteractions() {
  const { chatInteractions, handleCurrentChatInteractions, currentChatInteractions, createNewInteraction } = useChat();

  return (
    <React.Fragment>
      <div>
      <Button onClick={createNewInteraction} variant='contained'  sx={{width:'100%',color:'white',backgroundColor:'#f50057'}}>New Chat</Button>
    <List sx={{overflowY:'auto',height:'85vh'}}>
      {chatInteractions.slice().reverse().map((interaction) => (
        <ListItem
          key={interaction.id}
          button
          onClick={() => handleCurrentChatInteractions(interaction)}
          selected={currentChatInteractions?.id === interaction.id}
          sx={{
            cursor: 'pointer',
            backgroundColor: currentChatInteractions?.id === interaction.id ? '#3f51b5' : 'transparent', 
            color: '#ffffff', 
            '&:hover': {
              backgroundColor: currentChatInteractions?.id === interaction.id ? '#303f9f' : '#f5f5f5', 
            },
            marginBottom: '5px',  
          }}
        >
          <ListItemText primary={new Date(interaction.timestamp).toLocaleString()} />
        </ListItem>
      ))}
    </List>
    </div>
    </React.Fragment>
  );
}
