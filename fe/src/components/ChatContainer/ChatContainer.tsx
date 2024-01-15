import Header from './Header'
import ChatInput from '../ChatInput/ChatInput'
import { useEffect, useRef, useState } from 'react'
import { createRoomTwoUser, getRoomTwoUser } from '@/actions/room'
import { getMessageByRoomId } from '@/actions/message'
import { useSession } from 'next-auth/react'

interface Props {
  currentChat: IUser
  socket: any
}

const ChatContainer = ({ currentChat, socket }: Props) => {
  const { fullName, avatar, id } = currentChat
  const [messages, setMessages] = useState<IMessage[]>([])
  const [arrivalMessage, setArrivalMessage] = useState<any>()
  const [room, setRoom] = useState<number | null>(null)
  const scrollRef = useRef<any>()

  const { data: session } = useSession()

  const checkRoomAndGetMessagge = async () => {
    try {
      const checkRoom = await getRoomTwoUser(id)
      if (Object.keys(checkRoom.result).length !== 0) {
        const res = await getMessageByRoomId(checkRoom.result.id)
        setMessages(res.result)
        setRoom(checkRoom.result.id)
        socket.current.emit('join-room', checkRoom.result.id)
      } else {
        const data: any = {
          title: 'chat-app',
          description: 'Nhóm chat 2',
          member: id,
        }
        const createRoom = await createRoomTwoUser(data)
        if (Object.keys(createRoom.result).length !== 0) {
          socket.current.emit('join-room', createRoom.result.id)
          setRoom(createRoom.result.id)
        }
      }
    } catch (e) {
    } finally {
    }
  }

  const handleSendMessagge = (text: string) => {
    socket.current.emit('send-message', {
      text,
      owner: session?.user.id,
      room,
    })
  }

  useEffect(() => {
    setMessages([])
    checkRoomAndGetMessagge()
  }, [currentChat])

  useEffect(() => {
    if (socket.current) {
      socket.current.on('receive-message', (message: any) => {
        setArrivalMessage(message)
      })
    }
  }, [])


  useEffect(() => {
    if(arrivalMessage && messages.length === 0) {
      setMessages([arrivalMessage])
    } else {
      arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage])
    }
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='flex-1 relative h-full'>
      <Header fullName={fullName} avatar={avatar} />

      <ul className='absolute top-[11%] w-full h-[79%] left-0 flex flex-col overflow-auto p-2 no-scrollbar'>
        {messages &&
          messages.map((item: any) => (
            <li
              key={item.id}
              className={`flex ${
                item.owner.id === session?.user.id
                  ? 'justify-end'
                  : 'justify-start'
              }`}
              ref={scrollRef}
            >
              <p
                className={`${
                  item.owner.id === session?.user.id
                    ? 'bg-[#3c5aff] text-white rounded-bl-2xl'
                    : 'bg-slate-200 rounded-br-2xl'
                } rounded-t-2xl max-w-[60%] my-2 p-4`}
              >
                {item.text}
              </p>
            </li>
          ))}
      </ul>

      <ChatInput handleChangeMessage={handleSendMessagge} />
    </div>
  )
}

export default ChatContainer
