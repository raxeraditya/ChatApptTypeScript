import { TiWeatherSunny } from "react-icons/ti";
import { IoMoon } from "react-icons/io5";
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <TiWeatherSunny className="w-6 h-6 text-yellow-500" />
      ) : (
        <IoMoon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;