// // src/pages/Chat.tsx
// import React, { useState, useEffect } from 'react'
// import Home from '../components/chat/Home'
// import MainLayout from '../components/chat/MainLayout'
// import Loader from '../components/chat/Loader'
// import UserSelection from '../components/chat/UserSelection'
// import Chatroom from '../components/chat/Chatroom'
// import initializeSocket from '../components/chat/socket'
// import { useNavigate, useLocation, Navigate } from 'react-router-dom'

// interface User {
//   name: string
//   image: string
//   statusText: string
// }

// interface ChatroomData {
//   name: string
//   image: string
// }

// const Chat: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null)
//   const [isRegisterInProcess, setIsRegisterInProcess] = useState(false)
//   const [client, setClient] = useState(initializeSocket())
//   const [chatrooms, setChatrooms] = useState<ChatroomData[] | null>(null)
//   const navigate = useNavigate()
//   const location = useLocation()

//   useEffect(() => {
//     client.getChatrooms((err: any, rooms: ChatroomData[]) => {
//       if (err) {
//         console.error(err)
//         return
//       }
//       setChatrooms(rooms)
//     })
//   }, [client, setChatrooms])

//   const onEnterChatroom = (
//     chatroomName: string,
//     onNoUserSelected: () => void,
//     onEnterSuccess: (chatHistory: any[]) => void
//   ) => {
//     if (!user) {
//       return onNoUserSelected()
//     }

//     client.join(chatroomName, (err: any, chatHistory: any[]) => {
//       if (err) {
//         console.error(err)
//         return
//       }
//       onEnterSuccess(chatHistory)

//       // Replace history.push with navigate
//       navigate(`/${chatroomName}`, { state: { chatHistory } })
//     })
//   }

//   const onLeaveChatroom = (chatroomName: string, onLeaveSuccess: () => void) => {
//     client.leave(chatroomName, (err: any) => {
//       if (err) {
//         console.error(err)
//         return
//       }
//       onLeaveSuccess()
//     })
//   }

//   const register = (name: string) => {
//     setIsRegisterInProcess(true)
//     client.register(name, (err: any, registeredUser: User | null) => {
//       setIsRegisterInProcess(false)
//       if (err) {
//         console.error(err)
//         return
//       }
//       setUser(registeredUser)
//     })
//   }

//   const renderUserSelectionOrRedirect = (renderUserSelection: () => JSX.Element) => {
//     if (user) {
//       return <Loader /> // Or redirect if needed
//     }

//     return isRegisterInProcess ? <Loader /> : renderUserSelection()
//   }

//   const renderChatroomOrRedirect = (chatroom: ChatroomData) => {
//     const chatHistory = (location.state as any)?.chatHistory || []
//     if (!user) {
//       return <Navigate to='/' />
//     }

//     return (
//       <Chatroom
//         chatroom={chatroom}
//         chatHistory={chatHistory}
//         registerHandler={client.registerHandler}
//         unregisterHandler={client.unregisterHandler}
//         onSendMessage={(message, cb) => client.message(chatroom.name, message, cb)}
//         onLeave={() => onLeaveChatroom(chatroom.name, () => navigate('/'))}
//       />
//     )
//   }

//   return (
//     <>
//       {!chatrooms ? (
//         <Loader />
//       ) : (
//         <Home
//           chatrooms={chatrooms}
//           onEnterChatroom={(chatroomName: string) =>
//             onEnterChatroom(
//               chatroomName,
//               () => navigate('/user'),
//               (chatHistory: any[]) =>
//                 navigate(`/${chatroomName}`, { state: { chatHistory } })
//             )
//           }
//         />
//       )}
//       renderUserSelectionOrRedirect(
//       <UserSelection
//         getAvailableUsers={client.getAvailableUsers}
//         close={() => navigate('/')}
//         register={register}
//       />
//       )
//       {chatrooms?.map((chatroom) => renderChatroomOrRedirect(chatroom))}
//     </>
//   )
// }

// export default Chat

// src/App.tsx
// import React, { useState } from 'react';
// import MainLayout from '../components/chat/MainLayout';
// import Home from '../components/chat/Home';

// const App: React.FC = () => {
//   const [user, setUser] = useState<string | null>(null);

//   return (
//       <MainLayout user={user}>
//             <Home user={user} />
//       </MainLayout>
//   );
// };

// export default App;

import Home from '../components/chat/Home'
import Pchat from '../components/chat/Chat'

const Chat = () => {
  return (
    <main className='w-full flex gap-4'>
      <div className='w-[50%]'>
        <Pchat />
      </div>
      <div className='w-[50%]'>
        <Home />
      </div>
    </main>
  )
}

export default Chat
