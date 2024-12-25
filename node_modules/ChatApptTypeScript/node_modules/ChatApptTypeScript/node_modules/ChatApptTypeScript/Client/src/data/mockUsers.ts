import { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    status: 'online',
    lastSeen: '10:30 AM'
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'offline',
    lastSeen: '9:45 AM'
  },
  {
    id: 3,
    name: 'Tech Group',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    status: 'online'
  }
];