import React, { useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';
import { emojiCategories } from '../../utils/emojiData';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState('smileys');
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        aria-label="Open emoji picker"
      >
        <Smile className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50 w-64">
          <div className="p-2 border-b dark:border-gray-700">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {Object.keys(emojiCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`p-2 rounded-md ${
                    activeCategory === category 
                      ? 'bg-gray-100 dark:bg-gray-700' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {emojiCategories[category].icon}
                </button>
              ))}
            </div>
          </div>
          <div className="p-2 h-48 overflow-y-auto">
            <div className="grid grid-cols-6 gap-1">
              {emojiCategories[activeCategory].emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onEmojiSelect(emoji);
                    setIsOpen(false);
                  }}
                  className="p-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  aria-label={`Select ${emoji} emoji`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};