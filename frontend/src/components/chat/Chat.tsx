

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Text } from '../atom/Text';

const socket = io('http://localhost:4000');

const Pchat: React.FC = () => {
  const { roomName } = useParams<{ roomName: string }>();
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    socket.emit('joinChatroom', roomName);

    socket.on('joinedChatroom', (history: string[]) => {
      setChatHistory(history);
    });

    socket.on('message', (message: string) => {
      setChatHistory((prev) => [...prev, message]);
    });

    return () => {
      socket.off('joinedChatroom');
      socket.off('message');
    };
  }, [roomName]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('message', { chatroomName: roomName, message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full px-3">
      <div className="w-full h-[80%] bg-[#121a23] bg-[linear-gradient(0deg,#0c0e12_0%,rgba(31,41,53,0.36078)_100%)] rounded-md cursor-pointer border border-[rgba(76,76,76,0.2)] hover:border-[rgba(69,248,130,0.4)] shadow-md p-6 rounded-lg">
        <h4 className="text-lg font-bold mb-4 text-center text-myGreen">Chatting with : {roomName}</h4>
        <div className="border h-[80%] overflow-y-auto p-4 mb-4 rounded-md border border-[rgba(76,76,76,0.4)]">
          {chatHistory.map((msg, index) => (
            <div key={index} className="p-2 mb-1 bg-myGreen  rounded text-white">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="block w-full text-[14px] h-[50px] pl-[25px] pr-[100px] py-[17px] rounded-md border-none bg-[#1f2935] placeholder:text-[14px] focus:ring-[none] focus:!border-none"
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="flex items-center gap-1 bg-myYellow hover:bg-myGreen text-myBlack px-4 rounded-md py-2"
          >
             <Text as="span" className="text-lg font-poppins">
                  Send
                </Text>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pchat