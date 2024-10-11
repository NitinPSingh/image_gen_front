import React from 'react';
import { styled } from '@mui/system';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ImagePreview from '../imageviewer';

const ChipContainer = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin-right: 10px;
  max-width: 200px;
  border: 1px solid black;
  border-radius: 10px;
`;

const FileName = styled(Typography)`
  flex-grow: 1;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface FileChipProps {
  file: File;
  onRemove: () => void;
}

const FileChip: React.FC<FileChipProps> = ({ file, onRemove }) => {
  const fileUrl = URL.createObjectURL(file); 
  return (
    <ChipContainer>
      <ImagePreview uri={fileUrl} w="35px" h="35px" />
      <FileName>{file.name}</FileName>
      <IconButton size="small" onClick={onRemove}>
        <CancelIcon fontSize="small" />
      </IconButton>
    </ChipContainer>
  );
};

export default FileChip;
