import Image from "next/image"

const Header = () => {
  return (
    <div className='absolute w-full h-[10%] top-0 left-0 flex items-center gap-x-2 my-2 p-2 border-b z-10'>
      <div className='w-[50px] h-[50px] flex justify-center items-center overflow-hidden border rounded-full'>
        <Image
          src='/messi.jpg'
          alt='Loi anh'
          width={400}
          height={400}
          className='w-full h-auto bg-center bg-no-repeat'
        />
      </div>
      <div>
        <h3 className='font-medium'>Nhật Vỹ Huỳnh</h3>
      </div>
    </div>
  )
}

export default Header
