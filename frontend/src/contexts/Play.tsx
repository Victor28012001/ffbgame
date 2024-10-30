import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface PlayContextType {
  play: boolean;
  setPlay: (value: boolean) => void;
  end: boolean;
  setEnd: (value: boolean) => void;
  hasScroll: boolean;
  setHasScroll: (value: boolean) => void;
}

// Create the context with a default value of `undefined`
const Context = createContext<PlayContextType | undefined>(undefined);

// Define the props for the PlayProvider
interface PlayProviderProps {
  children: ReactNode;
}

export const PlayProvider: React.FC<PlayProviderProps> = ({ children }) => {
  const [play, setPlay] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [hasScroll, setHasScroll] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        play,
        setPlay,
        end,
        setEnd,
        hasScroll,
        setHasScroll,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePlay = (): PlayContextType => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("usePlay must be used within a PlayProvider");
  }

  return context;
};