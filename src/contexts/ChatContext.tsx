import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { getChatInteractions, createChat, getChatDetails, callMLService, createChatInteraction } from '../api/chat';
import { useAuthContext } from './AuthContext';

interface ChatInteraction {
  id: number;
  timestamp: string;
}

interface Chat {
  id: number;
  chat_content: {
    text: string;
  };
  is_bot: boolean;
  files: ChatFile[];
}

interface ChatFile {
  id: number;
  file: string;
}

interface ChatContextType {
  chatInteractions: ChatInteraction[];
  chats: Chat[];
  currentChatInteractions: ChatInteraction | undefined;
  fetchChatInteractions: () => Promise<void>;
  fetchChats: (chatInteractionId: number) => Promise<void>;
  createNewChat: (chatInteractionId: number, message: string, setLoading: (loading: boolean) => void, file?: File ) => Promise<void>;
  handleCurrentChatInteractions: (chatInteraction:ChatInteraction) => void;
  createNewInteraction: () => Promise<void>;
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatInteractions, setChatInteractions] = useState<ChatInteraction[]>([]);
  const [currentChatInteractions,setCurrentChatInteractions] = useState<ChatInteraction>(); 
  const [chats, setChats] = useState<Chat[]>([]);
  const { user } = useAuthContext()

  
  const fetchChatInteractions = async () => {
    try {
      const interactions = await getChatInteractions();
      if(interactions.length==0) await createChatInteraction();
      else {
      setChatInteractions(interactions);
      setCurrentChatInteractions(interactions[0]);}
    } catch (error) {
      console.error('Failed to fetch chat interactions:', error);
    }
  };

  
  const fetchChats = async () => {
    if (!currentChatInteractions) {
      console.error('No current chat interaction available.');
      return;
    }
  
    try {
      const chatDetails = await getChatDetails(currentChatInteractions.id);
      setChats(chatDetails);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    }
  };

  
   const createNewChat = async (
    chatInteractionId: number,
    message: string,
    setLoading: (loading: boolean) => void,
    file: File | undefined  
  ) => {
    setLoading(true);  
    try {
      const newChat = await createChat(chatInteractionId, message, file || undefined);
      setChats((prevChats) => [...prevChats, newChat]);
  
      const mlChat = await callMLService(chatInteractionId);
      setChats((prevChats) => [...prevChats, mlChat]);
    } catch (error) {
      console.error('Failed to create new chat or call ML service:', error);
    } finally {
      setLoading(false);  
    }
  };
  

  const handleCurrentChatInteractions = (chatInteraction: ChatInteraction) => {
    setCurrentChatInteractions(chatInteraction)
  }
  
  const createNewInteraction = async () => {
    const interaction = await createChatInteraction();
    setChatInteractions((p)=>[...p,interaction]);
    setCurrentChatInteractions(interaction);
    
  }

  useEffect(() => {
    fetchChatInteractions();  
  }, [user]);

  useEffect(() => {
    fetchChats();  
  }, [currentChatInteractions]);
  console.log(currentChatInteractions)
  return (
    <ChatContext.Provider value={{ chatInteractions, chats, currentChatInteractions, handleCurrentChatInteractions, fetchChatInteractions, fetchChats, createNewChat , createNewInteraction }}>
      {children}
    </ChatContext.Provider>
  );
};
