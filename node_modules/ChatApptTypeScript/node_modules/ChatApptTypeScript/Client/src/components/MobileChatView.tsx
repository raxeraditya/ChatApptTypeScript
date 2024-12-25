import React from 'react';
import { useStore } from '../store/useStore';
import MobileChatHeader from './MobileChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const MobileChatView = () => {
  const { selectedUser, selectedGroup, isMobileChat } = useStore();

  if (!isMobileChat || (!selectedUser && !selectedGroup)) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col animate-slide-in">
      <MobileChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default MobileChatView;