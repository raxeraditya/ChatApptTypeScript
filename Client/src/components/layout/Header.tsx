import { useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from '../../store/useAuthStore';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Welcome, {user?.name}
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
export default Header