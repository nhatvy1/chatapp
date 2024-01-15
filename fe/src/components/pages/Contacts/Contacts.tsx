import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

interface Props {
  users: IUser[] | []
  changeChat: (value: IUser) => void
}

const Contacts = ({ users, changeChat }: Props) => {
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(
    undefined,
  )

  const { data: session } = useSession()

  const handleCurrentChat = (index: number, contact: IUser) => {
    setCurrentSelected(index)
    changeChat(contact)
  }

  return (
    <div className='basis-1/5 border-r p-4 flex flex-col'>
      <div className='border rounded-md'>
        <form className='flex gap-x-1 p-2'>
          <button>
            <CiSearch size={30} color='gray' />
          </button>
          <input type='text' placeholder='Tìm kiếm' className='outline-none' />
        </form>
      </div>
      <div className='mt-5 flex-1 overflow-auto no-scrollbar'>
        {users.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-x-2 my-2 border p-2 rounded-md cursor-pointer ${
              currentSelected === item.id ? 'bg-slate-300' : ''
            } hover:bg-slate-300`}
            onClick={() => handleCurrentChat(item.id, item)}
          >
            <div className='w-[50px] h-[50px] flex justify-center items-center overflow-hidden border rounded-full'>
              <Image
                src={item?.avatar || '/messi.jpg'}
                alt={item.fullName || 'Loi anh'}
                width={200}
                height={200}
                className='w-full h-auto bg-center bg-no-repeat'
              />
            </div>
            <div>
              <h3 className='font-medium'>{item.fullName}</h3>
              <p className='line-clamp-1'>Bạn có một tin nhắn mới...</p>
            </div>
          </div>
        ))}
      </div>
      <a
        href='/api/auth/signout'
        className='flex items-center gap-x-2 my-2 border p-2 rounded-md border-blue-300'
      >
        <div className='w-[50px] h-[50px] overflow-hidden border rounded-full'>
          <Image
            src={session?.user.avatar || '/messi.jpg'}
            alt='Loi anh'
            width={200}
            height={200}
            className='w-full h-auto bg-center bg-no-repeat'
          />
        </div>
        <div>
          <button className='font-medium'>Đăng xuất</button>
        </div>
      </a>
    </div>
  )
}

export default Contacts
