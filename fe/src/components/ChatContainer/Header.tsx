import Image from 'next/image'
import { BiPowerOff } from 'react-icons/bi'

interface Props {
  fullName: string
  avatar: string
}

const Header = ({ fullName, avatar }: Props) => {
  return (
    <div className='absolute w-full h-[10%] top-0 left-0 flex justify-between items-center gap-x-2 my-2 p-2 border-b z-10'>
      <div className='flex items-center gap-x-2'>
        <div className='w-[50px] h-[50px] flex justify-center items-center overflow-hidden border rounded-full'>
          <Image
            src={`${avatar}`}
            alt='Loi anh'
            width={400}
            height={400}
            className='w-full h-auto bg-center bg-no-repeat'
          />
        </div>
        <div>
          <h3 className='font-medium'>{fullName}</h3>
        </div>
      </div>
      <div>
        <button className='h-[40px] w-[40px] flex items-center justify-center border rounded-md'>
          <BiPowerOff size={24} />
        </button>
      </div>
    </div>
  )
}

export default Header
