import React, { useState } from 'react';
import { Send } from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import FileUpload from './FileUpload';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleSend = () => {
    if (message.trim() || selectedFile) {
      console.log('Sending message:', message);
      console.log('Sending file:', selectedFile);
      setMessage('');
      setSelectedFile(null);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      {selectedFile && (
        <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {selectedFile.name}
          </span>
          <button
            onClick={() => setSelectedFile(null)}
            className="text-red-500 text-sm ml-2"
          >
            Remove
          </button>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        <FileUpload onFileSelect={handleFileSelect} />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Send className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;