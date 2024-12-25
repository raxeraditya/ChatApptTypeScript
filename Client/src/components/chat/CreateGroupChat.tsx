import React, { useState } from 'react';
import { Users, X } from 'lucide-react';

interface CreateGroupChatProps {
  onClose: () => void;
  onCreateGroup: (name: string, members: string[]) => void;
  availableUsers: Array<{ id: string; name: string; }>;
}

const CreateGroupChat: React.FC<CreateGroupChatProps> = ({
  onClose,
  onCreateGroup,
  availableUsers
}) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && selectedMembers.length > 0) {
      onCreateGroup(groupName, selectedMembers);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold dark:text-white">Create Group Chat</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter group name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Members
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableUsers.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers([...selectedMembers, user.id]);
                      } else {
                        setSelectedMembers(selectedMembers.filter(id => id !== user.id));
                      }
                    }}
                    className="rounded text-green-500 focus:ring-green-500"
                  />
                  <span className="dark:text-white">{user.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!groupName.trim() || selectedMembers.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupChat;