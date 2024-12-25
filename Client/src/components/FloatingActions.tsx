import React from 'react';
import { MessageSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const FloatingActions = () => {
  return (
    <div className="fixed bottom-4 left-4 flex flex-col space-y-4">
      <ThemeToggle />
      <button className="p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors md:hidden">
        <MessageSquare className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default FloatingActions;