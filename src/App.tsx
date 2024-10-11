import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';

import Auth from './components/auth';
import { ChatProvider } from './contexts/ChatContext';
import ChatInteraction from './components/chat';



const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<PrivateRoute><ChatInteraction /></PrivateRoute>} />
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;