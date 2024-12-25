export interface GroupChat {
  id: string;
  name: string;
  avatar: string;
  members: string[];
  lastMessage?: {
    content: string;
    sender: string;
    timestamp: string;
  };
  createdBy: string;
  createdAt: string;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
}