export interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

interface TokenData {
  userId: string;
  userName: string;
  profilePhoto: string;
  email: string;
  gender: string;
}

export interface ApiResponse {
  message: string;
  tokendata: TokenData;
}
