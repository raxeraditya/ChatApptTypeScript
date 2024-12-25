import React, { useState } from 'react';
import { Search, MoreVertical, Users } from 'lucide-react';
import ChatItem from './ChatItem';
import CreateGroupChat from './chat/CreateGroupChat';
import { useStore } from '../store/useStore';
import { mockUsers } from '../data/mockUsers';
import { GroupChat } from '../types/chat';

const ChatList = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const { 
    selectedUser, 
    selectedGroup,
    groups,
    setSelectedUser, 
    setSelectedGroup,
    setIsMobileChat,
    addGroup 
  } = useStore();

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    if (window.innerWidth < 768) {
      setIsMobileChat(true);
    }
  };

  const handleGroupSelect = (group: GroupChat) => {
    setSelectedGroup(group);
    if (window.innerWidth < 768) {
      setIsMobileChat(true);
    }
  };

  const handleCreateGroup = (name: string, memberIds: string[]) => {
    const newGroup: GroupChat = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      members: memberIds,
      createdBy: '1', // Current user ID
      createdAt: new Date().toISOString(),
      lastMessage: {
        content: 'Group created',
        sender: 'System',
        timestamp: new Date().toISOString(),
      },
    };
    addGroup(newGroup);
  };

  return (
    <div className="w-full md:w-1/3 border-r dark:border-gray-700 h-full">
      <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold dark:text-white">Chats</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateGroup(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Create group chat"
            >
              <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search chats"
            className="w-full p-2 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-140px)]">
        {/* Groups */}
        {groups.map((group) => (
          <div 
            key={group.id}
            onClick={() => handleGroupSelect(group)}
            className={`cursor-pointer ${selectedGroup?.id === group.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <ChatItem
              name={group.name}
              lastMessage={group.lastMessage?.content || 'No messages yet'}
              time={new Date(group.lastMessage?.timestamp || group.createdAt).toLocaleTimeString()}
              avatar={group.avatar}
              unread={0}
              isOnline={true}
              isGroup={true}
              memberCount={group.members.length}
            />
          </div>
        ))}

        {/* Direct Chats */}
        {mockUsers.map((user) => (
          <div 
            key={user.id}
            onClick={() => handleUserSelect(user)}
            className={`cursor-pointer ${selectedUser?.id === user.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <ChatItem
              name={user.name}
              lastMessage="Hey, how are you?"
              time={user.lastSeen || 'Online'}
              avatar={user.avatar}
              unread={2}
              isOnline={user.status === 'online'}
            />
          </div>
        ))}
      </div>

      {showCreateGroup && (
        <CreateGroupChat
          onClose={() => setShowCreateGroup(false)}
          onCreateGroup={handleCreateGroup}
          availableUsers={mockUsers.map(user => ({ id: String(user.id), name: user.name }))}
        />
      )}
    </div>
  );
};

export default ChatList;