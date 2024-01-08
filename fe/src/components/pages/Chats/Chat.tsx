'use client'
import Content from '@/components/Content/Content'
import Contacts from '../Contacts/Contacts'
import { useRef, useState } from 'react'
import Welcome from '@/components/Welcome/Welcome'

interface Props {
  users: IUser[] | []
}

const Chat = ({ users }: Props) => {
  const [currentChat, setCurrentChat] = useState<any>(undefined)
  const [currentUser, setCurrentUser] = useState<any>()
  const socket = useRef()

  const handleChatChange = (chat: any)=> {
    setCurrentChat(chat)
  }

  return (
    <div className='flex border w-full h-full justify-between shadow-2xl rounded-3xl bg-white overflow-hidden'>
      <Contacts
        users={users ? users : []}
        changeChat={handleChatChange}
      />
      {currentChat === undefined ? <Welcome /> : <Content />}
    </div>
  )
}

export default Chat
