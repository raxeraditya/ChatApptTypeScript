import React from 'react';
import { Users } from 'lucide-react';

interface ChatItemProps {
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread: number;
  isOnline: boolean;
  isGroup?: boolean;
  memberCount?: number;
}

const ChatItem = ({ 
  name, 
  lastMessage, 
  time, 
  avatar, 
  unread, 
  isOnline,
  isGroup,
  memberCount 
}: ChatItemProps) => {
  return (
    <div className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
      <div className="relative">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {isGroup ? (
          <div className="absolute -bottom-1 -right-1 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
        ) : isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        )}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h3 className="font-semibold dark:text-white">{name}</h3>
            {isGroup && memberCount && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({memberCount} members)
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{time}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
            {lastMessage}
          </p>
          {unread > 0 && (
            <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;