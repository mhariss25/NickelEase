import { createContext, useState, useEffect } from "react";
import { CustomProvider } from "rsuite";

export const ThemeContext = createContext({
  theme: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState();

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    const storedTheme = sessionStorage.getItem("theme");
    console.log("Stored theme:", storedTheme);

    if (storedTheme === "false") {
      setTheme(false);
    } else if (storedTheme === "true") {
      setTheme(true);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("theme", theme);
    console.log("Theme changed to:", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CustomProvider theme={theme ? "light" : "dark"}>
        {children}
      </CustomProvider>
    </ThemeContext.Provider>
  );
}
