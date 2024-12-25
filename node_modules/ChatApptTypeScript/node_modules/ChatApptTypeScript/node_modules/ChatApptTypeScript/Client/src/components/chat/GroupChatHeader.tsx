import React from 'react';
import { Users, Phone, Video, MoreVertical } from 'lucide-react';
import { GroupChat } from '../../types/chat';

interface GroupChatHeaderProps {
  group: GroupChat;
}

const GroupChatHeader = ({ group }: GroupChatHeaderProps) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative">
          <img
            src={group.avatar}
            alt={group.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        <div className="ml-4">
          <h2 className="font-semibold dark:text-white">{group.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {group.members.length} members
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

export default GroupChatHeader;