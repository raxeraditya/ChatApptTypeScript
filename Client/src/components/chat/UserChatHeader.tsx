import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { User } from '../../types/user';

interface UserChatHeaderProps {
  user: User;
}

const UserChatHeader = ({ user }: UserChatHeaderProps) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {user.status === 'online' && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          )}
        </div>
        <div className="ml-4">
          <h2 className="font-semibold dark:text-white">{user.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.status === 'online' ? 'Online' : `Last seen ${user.lastSeen}`}
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        <Video className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
        <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
        <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default UserChatHeader;