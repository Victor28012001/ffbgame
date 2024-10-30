// // src/components/Chatroom.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { FaTimes, FaRegCommentDots } from 'react-icons/fa';
// import Overlay from './Overlay';

// interface User {
//   name: string;
//   image: string;
// }

// interface Message {
//   user: User;
//   message: string;
//   event?: string;
// }

// interface ChatroomProps {
//   chatroom: {
//     name: string;
//     image: string;
//   };
//   chatHistory: Message[];
//   registerHandler: (handler: (entry: any) => void) => void;
//   unregisterHandler: () => void;
//   onSendMessage: (message: string, callback: (err?: any) => void) => void;
//   onLeave: () => void;
// }

// const Chatroom: React.FC<ChatroomProps> = ({
//   chatroom,
//   chatHistory: initialChatHistory,
//   registerHandler,
//   unregisterHandler,
//   onSendMessage,
//   onLeave,
// }) => {
//   const [chatHistory, setChatHistory] = useState<Message[]>(initialChatHistory);
//   const [input, setInput] = useState('');
//   const panelRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     registerHandler(onMessageReceived);
//     scrollChatToBottom();

//     return () => {
//       unregisterHandler();
//     };
//   }, []);

//   useEffect(() => {
//     scrollChatToBottom();
//   }, [chatHistory]);

//   const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInput(e.target.value);
//   };

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     onSendMessage(input, (err) => {
//       if (err) return console.error(err);
//       setInput('');
//     });
//   };

//   const onMessageReceived = (entry: any) => {
//     setChatHistory((prevHistory) => [...prevHistory, entry]);
//   };

//   const scrollChatToBottom = () => {
//     if (panelRef.current) {
//       panelRef.current.scrollTo(0, panelRef.current.scrollHeight);
//     }
//   };

//   return (
//     <div className="h-full flex">
//       <div className="relative flex flex-col justify-end h-full w-full max-w-lg bg-gray-800">
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 text-white border-b border-gray-700">
//           <h2 className="text-lg">{chatroom.name}</h2>
//           <button onClick={onLeave} className="text-white hover:text-red-400">
//             <FaTimes size={24} />
//           </button>
//         </div>

//         {/* Background Image */}
//         <img
//           src={chatroom.image}
//           alt="Chatroom"
//           className="absolute inset-0 w-full h-full object-cover opacity-10"
//         />

//         {/* Chat Messages */}
//         <div
//           className="overflow-auto flex-1 p-4"
//           ref={panelRef}
//         >
//           {chatHistory.map(({ user, message, event }, i) => (
//             <div key={i} className="mb-4">
//               <div className="flex items-start space-x-3">
//                 <img
//                   src={user.image}
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div>
//                   <p className="text-white font-semibold">
//                     {user.name} {event || ''}
//                   </p>
//                   <p className="text-gray-300">{message}</p>
//                 </div>
//               </div>
//               <hr className="border-gray-600 mt-2" />
//             </div>
//           ))}
//         </div>

//         {/* Input Panel */}
//         <div className="flex items-center p-4 bg-gray-900 border-t border-gray-700">
//           <textarea
//             className="flex-1 p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter a message"
//             rows={2}
//             value={input}
//             onChange={onInput}
//             onKeyPress={(e) => (e.key === 'Enter' ? handleSendMessage() : null)}
//           />
//           <button
//             onClick={handleSendMessage}
//             className="ml-4 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             <FaRegCommentDots size={24} />
//           </button>
//         </div>
//         <Overlay opacity={0.6} background="#111111" />
//       </div>
//     </div>
//   );
// };

// export default Chatroom;


// src/components/ChatRoom.tsx
// import React, { useState } from 'react';

// interface ChatRoomProps {
//   roomName: string;
//   close: () => void;
// }

// const ChatRoom: React.FC<ChatRoomProps> = ({ roomName, close }) => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [input, setInput] = useState<string>('');

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages((prev) => [...prev, input]);
//       setInput('');
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <h2 className="text-2xl mb-4">Room: {roomName}</h2>
//       <div className="border border-gray-300 p-2 mb-4 h-64 overflow-y-auto">
//         {messages.map((msg, index) => (
//           <div key={index} className="p-1 border-b">{msg}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         className="border p-2"
//         placeholder="Type your message..."
//       />
//       <button onClick={handleSend} className="bg-blue-500 text-white p-2 mt-2">
//         Send
//       </button>
//       <button onClick={close} className="mt-2">
//         Leave Room
//       </button>
//     </div>
//   );
// };

// export default ChatRoom;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Text } from '../atom/Text';

const socket = io('http://localhost:4000');

const Chatroom: React.FC = () => {
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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full h-[80%] md:w-[90%] lg:w-2/3  bg-[#121a23] bg-[linear-gradient(0deg,#0c0e12_0%,rgba(31,41,53,0.36078)_100%)] rounded-md cursor-pointer border border-[rgba(76,76,76,0.2)] hover:border-[rgba(69,248,130,0.4)] shadow-md p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-myGreen">Chat Room: {roomName}</h1>
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

export default Chatroom;
