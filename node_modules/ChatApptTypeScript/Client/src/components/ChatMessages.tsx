import React from 'react';

const ChatMessages = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-start">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 max-w-[70%] shadow">
          <p className="text-gray-800 dark:text-gray-200">Hey, how are you?</p>
          <span className="text-xs text-gray-500 mt-1">10:30 AM</span>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-green-500 rounded-lg p-3 max-w-[70%] shadow">
          <p className="text-white">I'm good! How about you?</p>
          <span className="text-xs text-green-100 mt-1">10:31 AM</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;