import { create } from 'zustand';
import { User } from '../types/user';
import { GroupChat } from '../types/chat';

interface ChatStore {
  selectedUser: User | null;
  selectedGroup: GroupChat | null;
  isMobileChat: boolean;
  groups: GroupChat[];
  setSelectedUser: (user: User | null) => void;
  setSelectedGroup: (group: GroupChat | null) => void;
  setIsMobileChat: (value: boolean) => void;
  addGroup: (group: GroupChat) => void;
}

export const useStore = create<ChatStore>((set) => ({
  selectedUser: null,
  selectedGroup: null,
  isMobileChat: false,
  groups: [],
  setSelectedUser: (user) => set({ selectedUser: user, selectedGroup: null }),
  setSelectedGroup: (group) => set({ selectedGroup: group, selectedUser: null }),
  setIsMobileChat: (value) => set({ isMobileChat: value }),
  addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
}));