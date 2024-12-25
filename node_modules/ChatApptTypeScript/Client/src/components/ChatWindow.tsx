import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { useStore } from '../store/useStore';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import GroupChatHeader from './chat/GroupChatHeader';
import UserChatHeader from './chat/UserChatHeader';

const ChatWindow = () => {
  const { selectedUser, selectedGroup } = useStore();

  if (!selectedUser && !selectedGroup) {
    return (
      <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="hidden md:flex flex-col flex-1 h-full">
      {selectedGroup ? (
        <GroupChatHeader group={selectedGroup} />
      ) : (
        <UserChatHeader user={selectedUser!} />
      )}
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatWindow;