import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import FloatingActions from './components/FloatingActions';
import MobileChatView from './components/MobileChatView';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Header from './components/layout/Header';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Header />
                <div className="container mx-auto h-[calc(100vh-4rem)] p-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full flex overflow-hidden">
                    <ChatList />
                    <ChatWindow />
                  </div>
                </div>
                <FloatingActions />
                <MobileChatView />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/chat" replace />} />
      </Routes>
    </Router>
  );
}

export default App;