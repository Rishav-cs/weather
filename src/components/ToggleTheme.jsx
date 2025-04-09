// File: src/components/ToggleTheme.jsx
import React from "react";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = ({ theme, setTheme }) => {
  const isDark = theme === "dark";

  return (
    <div className="toggle-container">
      <button
        className="toggle-btn"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default ToggleTheme;
