export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  avatar?: string;
}

export interface AssistantState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export type MessageSender = 'user' | 'assistant'; 
