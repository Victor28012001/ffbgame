// // src/components/Home.tsx
// import React from 'react';
// import ChatroomPreview from './ChatroomPreview';

// interface Chatroom {
//   name: string;
//   image: string;
// }

// interface HomeProps {
//   chatrooms: Chatroom[];
//   onEnterChatroom: (chatroomName: string) => void;
// }

// const Home: React.FC<HomeProps> = ({ chatrooms, onEnterChatroom }) => (
//   <div className="flex flex-wrap justify-center p-4">
//     {chatrooms.map((chatroom) => (
//       <ChatroomPreview
//         key={chatroom.name}
//         chatroom={chatroom}
//         onEnter={() => onEnterChatroom(chatroom.name)}
//       />
//     ))}
//   </div>
// );

// export default Home;


// src/components/Home.tsx
// import React, { useState } from 'react';
// import UserSelection from './UserSelection';
// import ChatRoom from './Chatroom';
// import Loader from './Loader';

// interface HomeProps {
//   user: string | null;
// }

// const Home: React.FC<HomeProps> = ({ user }) => {
//   const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSelectRoom = (roomName: string) => {
//     setSelectedRoom(roomName);
//     setLoading(false);
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="flex flex-col items-center">
//       {selectedRoom ? (
//         <ChatRoom roomName={selectedRoom} close={() => setSelectedRoom(null)} />
//       ) : (
//         <UserSelection onSelectRoom={handleSelectRoom} close={() => setLoading(true)} />
//       )}
//     </div>
//   );
// };

// export default Home;


// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Text } from '../atom/Text';

const socket = io('http://localhost:4000');

const Home: React.FC = () => {
  const [chatrooms, setChatrooms] = useState<string[]>([]);
  const [newChatroom, setNewChatroom] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroomsUpdated', (rooms: string[]) => {
      setChatrooms(rooms);
    });

    const fetchChatrooms = async () => {
      const response = await fetch('http://localhost:4000/chatrooms');
      const data = await response.json();
      setChatrooms(data);
    };

    fetchChatrooms();

    return () => {
      socket.off('chatroomsUpdated');
    };
  }, []);

  const createChatroom = () => {
    if (newChatroom.trim()) {
      socket.emit('createChatroom', newChatroom);
      setNewChatroom('');
    }
  };

  const joinChatroom = (roomName: string) => {
    navigate(`/chatroom/${roomName}`);
  };

  return (
    <div className="flex px-3 flex-col items-center w-full justify-center h-screen">
      <div className="w-full  bg-[#121a23] bg-[linear-gradient(0deg,#0c0e12_0%,rgba(31,41,53,0.36078)_100%)] rounded-md cursor-pointer border border-[rgba(76,76,76,0.2)] hover:border-[rgba(69,248,130,0.4)] shadow-md p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Public Chat Rooms</h1>
        <div className="flex mb-4 gap-4">
          <input
            type="text"
            value={newChatroom}
            onChange={(e) => setNewChatroom(e.target.value)}
            className="block w-full text-[14px] h-[60px] pl-[25px] pr-[100px] py-[17px] rounded-md border-none bg-[#1f2935] placeholder:text-[14px] focus:ring-[none] focus:!border-none "
            placeholder="New Chatroom Name"
          />
          <button
            onClick={createChatroom}
            className="flex items-center gap-1 bg-myYellow hover:bg-myGreen text-myBlack px-4 rounded-md py-2"
          >
            <Text as="span" className="text-lg font-poppins">
                  Create
                </Text>
          </button>
        </div>
        <ul className="space-y-2 overflow-y-scroll h-[55vh]">
          {chatrooms.map((room, index) => (
            <li
              key={index}
              className="w-full py-4 flex justify-between px-4 items-center gap-4 rounded-md border border-[rgba(76,76,76,0.4)] cursor-pointer"
            >
              <Text as="p" className="flex items-center gap-2 font-bold text-myGreen">
                Room
                <Text as="span" className=" text-myYellow font-bold font-barlow text-lg">
                  {room}
                </Text>
              </Text>
              <button
                onClick={() => joinChatroom(room)}
                className="flex items-center gap-1 bg-myYellow hover:bg-myGreen text-myBlack px-4 rounded-md py-2"
              >
                <Text as="span" className="text-lg font-poppins">
                  Join
                </Text>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
