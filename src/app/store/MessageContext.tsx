import React, { createContext, useState, ReactNode } from 'react';
import { Message } from '../types/Message';

interface MessagesContextProps {
   messages: Message[];
   addMessage: (message: Message) => void;
}

export const MessagesContext = createContext<MessagesContextProps>({
   messages: [],
   addMessage: () => {},
});

export const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [messages, setMessages] = useState<Message[]>([]);

   const addMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setTimeout(() => {
         setMessages((prevMessages) => prevMessages.filter((msg) => msg !== message));
      }, 3000);
   };

   return (
      <MessagesContext.Provider value={{ messages, addMessage }}>
         {children}
      </MessagesContext.Provider>
   );
};
