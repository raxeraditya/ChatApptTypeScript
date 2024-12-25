import React from 'react';
import { Smile } from 'lucide-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const emojis = ['😊', '😂', '🥰', '😎', '🤔', '👍', '❤️', '🎉', '🔥', '✨'];

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        <Smile className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 grid grid-cols-5 gap-2 border dark:border-gray-700">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                onEmojiSelect(emoji);
                setIsOpen(false);
              }}
              className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;