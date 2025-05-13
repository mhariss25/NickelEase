import { createContext, useState } from "react";

export const sideNavContext = createContext({
  isExpanded: true,
  toggleExpand: () => {},
});

export const SideNavContextProvider = ({ children }) => {
  const [isExpanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <sideNavContext.Provider value={{ isExpanded, toggleExpand }}>
      {children}
    </sideNavContext.Provider>
  );
};
