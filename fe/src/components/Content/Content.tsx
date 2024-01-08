import Header from './Header'
import ChatInput from '../ChatInput/ChatInput'

const messages = [
  'first',
  'xyz',
  'dasd',
  'ddasdas',
  '123',
  'first',
  'xyz',
  'dasd',
  'ddasdas',
  '123',
  'first',
  'xyz',
  'dasd',
  'ddasdas',
  '123',
  'first',
  'xyz',
  'dasd',
  'ddasdas',
  '123',
  'first',
  'xyz',
  'dasd',
  'ddasdas',
  '123',
]

const Content = () => {
  return (
    <div className='flex-1 relative h-full'>
      <Header />
      
      <ul className='absolute top-[11%] w-full h-[79%] left-0 flex flex-col-reverse overflow-auto p-2 no-scrollbar'>
        {messages.map((item, index) => (
          <li
            key={index}
            className={`flex ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            <p
              className={`${
                index % 2 === 0
                  ? 'bg-slate-100 rounded-br-2xl'
                  : 'bg-[#3c5aff] text-white rounded-bl-2xl'
              } rounded-t-2xl max-w-[60%] my-2 p-4`}
            >
              {item}
            </p>
          </li>
        ))}
      </ul>

      <ChatInput />
    </div>
  )
}

export default Content
