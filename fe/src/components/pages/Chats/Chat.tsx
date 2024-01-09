'use client'
import Contacts from '../Contacts/Contacts'
import { useEffect, useRef, useState } from 'react'
import Welcome from '@/components/Welcome/Welcome'
import { useSession } from 'next-auth/react'
import { Socket, io } from 'socket.io-client'
import ChatContainer from '@/components/ChatContainer/ChatContainer'

interface Props {
  users: IUser[] | []
}

const Chat = ({ users }: Props) => {
  const { data: session } = useSession()

  const [currentChat, setCurrentChat] = useState<any>(undefined)
  const [currentUser, setCurrentUser] = useState<any>(undefined)
  const socket = useRef<Socket | null>(null)

  const handleChatChange = (chat: any) => {
    setCurrentChat(chat)
  }

  useEffect(() => {
    setCurrentUser(session?.user)
  }, [])

  useEffect(() => {
    socket.current = io('http://localhost:5000')
  }, [currentUser])

  return (
    <div className='flex border w-full h-full justify-between shadow-2xl rounded-3xl bg-white overflow-hidden'>
      <Contacts users={users ? users : []} changeChat={handleChatChange} />
      {currentChat === undefined ? (
        <Welcome />
      ) : (
        <ChatContainer currentChat={currentChat} socket={socket} />
      )}
    </div>
  )
}

export default Chat
