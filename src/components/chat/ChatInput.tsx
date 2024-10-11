import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, TextField, Button } from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useChat } from '../../contexts/ChatContext';
import FileChip from './FileChips';


const ChatInput = styled(Box)`
  display: flex;
  padding: 20px;
  border-top: 1px solid #ccc;
  height: 40px;
`;

export default function ChatInputForm() {
    const {  createNewChat, currentChatInteractions } = useChat();
    const [inputMessage, setInputMessage] = useState('');
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [loading,setLoading] = useState<boolean>(false)
  
    const handleSendMessage = async () => {
      if (currentChatInteractions && (inputMessage || attachedFile)) {
        const query = inputMessage
        const file = attachedFile
        setInputMessage('');
        setAttachedFile(null);
        await createNewChat(currentChatInteractions.id, query, setLoading, file);

      }
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setAttachedFile(event.target.files[0]);
      }
    };
  
    const handleRemoveFile = () => {
      setAttachedFile(null); 
    };

  return (
    <ChatInput>
    {attachedFile && <FileChip file={attachedFile} onRemove={handleRemoveFile} />}
    <TextField
        fullWidth
        variant="outlined"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your message..."
        sx={{
            height: '40px',
            '& .MuiOutlinedInput-root': {
            height: '100%',
            '& input': {
                height: '100%',
                padding: '10px 14px', // Adjust padding to fit the height
                boxSizing: 'border-box'
            }
            }
        }}
        />

      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" style={{height:"100%"}}>
        <Button component="span" variant="contained" style={{ marginLeft: 10,height:"100%" }}>
          <AttachFileIcon />
        </Button>
      </label>
      <Button variant="contained" disabled={loading} color="primary" onClick={handleSendMessage} style={{ marginLeft: 10 }}>
        <SendIcon />
      </Button>
    </ChatInput>
  )
}
