import React from 'react'
import ChatInteractions from './ChatInteractions';
import { Box, Button } from '@mui/material';
import { useAuthContext } from '../../contexts/AuthContext';
import styled from '@emotion/styled';

const Sidebar = styled(Box)`
  width: 300px;
  border-right: 1px solid #ccc;
  background-color: #333;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

`;

export default function LeftSidebar() {

  const {logout} = useAuthContext()

  return (
  <Sidebar>
    <ChatInteractions />
    <Button onClick={logout} variant='contained' color="error">Logout</Button>
  </Sidebar>
  )
}
