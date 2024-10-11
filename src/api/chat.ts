import api from './interceptor';

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

export const getChatInteractions = async (): Promise<ChatInteraction[]> => {
    const response = await api.get('chat_app/chat_interactions/');
    return response.data;
};

export const createChatInteraction = async (): Promise<ChatInteraction> => {
    const response = await api.post('chat_app/chat_interactions/');
    return response.data;
};

export const getChatDetails = async (chatInteractionId: number): Promise<Chat[]> => {
    const response = await api.get(`chat_app/chat_interactions/${chatInteractionId}/`);
    return response.data.chats;
};

export const createChat = async (chatInteractionId: number, message: string, file?: File): Promise<Chat> => {
    const formData = new FormData();
    formData.append('chat_content', JSON.stringify({ text: message }));
    formData.append('chat_interaction', chatInteractionId.toString());
    formData.append('is_bot', 'false');

    if (file) {
        console.log(file)
        formData.append('file', file);
    }

    const response = await api.post('chat_app/chats/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const callMLService = async (chatInteractionId: number): Promise<any> => {
    const response = await api.post(`chat_app/ml_service/${chatInteractionId}/`);
    return response.data;
  };