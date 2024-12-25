import React from 'react';
import { ArrowLeft, MoreVertical, Phone, Video, Users } from 'lucide-react';
import { useStore } from '../store/useStore';

const MobileChatHeader = () => {
  const { selectedUser, selectedGroup, setSelectedUser, setSelectedGroup, setIsMobileChat } = useStore();

  const handleBack = () => {
    setSelectedUser(null);
    setSelectedGroup(null);
    setIsMobileChat(false);
  };

  if (!selectedUser && !selectedGroup) return null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center space-x-4">
      <button onClick={handleBack} className="p-1">
        <ArrowLeft className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </button>
      <div className="flex items-center flex-1">
        <div className="relative">
          <img
            src={selectedGroup ? selectedGroup.avatar : selectedUser!.avatar}
            alt={selectedGroup ? selectedGroup.name : selectedUser!.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {selectedGroup ? (
            <div className="absolute -bottom-1 -right-1 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
              <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
          ) : (
            selectedUser?.status === 'online' && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            )
          )}
        </div>
        <div className="ml-3">
          <h2 className="font-semibold dark:text-white">
            {selectedGroup ? selectedGroup.name : selectedUser!.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedGroup 
              ? `${selectedGroup.members.length} members`
              : selectedUser?.status === 'online' 
                ? 'Online' 
                : `Last seen ${selectedUser?.lastSeen}`
            }
          </p>
        </div>
      </div>
      <div className="flex space-x-3">
        <Video className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
};

export default MobileChatHeader;