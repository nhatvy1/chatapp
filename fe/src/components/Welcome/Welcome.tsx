import localFont from 'next/font/local'
import Image from 'next/image'

const myFont = localFont({ src: '../../../public/custom.ttf' })

const Welcome = () => {
  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <div className='w-[400px] h-[400px]'>
        <Image
          src='/robot.gif'
          alt='Loi anh'
          width={1000}
          height={1000}
          className='w-full h-auto bg-center bg-no-repeat'
        />
      </div>
      <p className={`text-3xl ${myFont.className}`}>Bắt đầu cuộc trò chuyện thôi nà !!!</p>
    </div>
  )
}

export default Welcome
