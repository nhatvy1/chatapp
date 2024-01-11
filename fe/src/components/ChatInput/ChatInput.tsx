import { FormEvent, useState } from 'react'
import { BsSend } from 'react-icons/bs'
import { LuImagePlus } from 'react-icons/lu'
import { MdOutlineKeyboardVoice } from 'react-icons/md'

interface Props {
  handleChangeMessage: (value: string)=> void
}
const ChatInput = ({ handleChangeMessage }: Props) => {
  const [text, setText] = useState('')

  const handleSendMessagge = (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault()
    if(text.length > 0) {
      handleChangeMessage(text)
      setText('')
    }
  }

  return (
    <div className='absolute bottom-0 w-full h-[10%] p-2'>
      <form 
        onSubmit={(event) => handleSendMessagge(event)}
        className='flex justify-between items-center gap-x-3'
      >
        <div className='flex-1'>
          <input
            placeholder='Aa'
            className='w-full text-lg outline-none bg-slate-100 p-4 rounded-[50px]'
            name='text'
            onChange={(event)=> setText(event.target.value)}
            value={text}
            autoComplete="off"
          />
        </div>
        <div className='flex justify-end items-center gap-x-4'>
          <div>
            <label
              htmlFor='file'
              className='bg-slate-100 border w-[40px] h-[40px] rounded-md flex justify-center items-center cursor-pointer'
            >
              <LuImagePlus size={20} />
            </label>
            <input type='file' id='file' className='hidden' />
          </div>
          <div className='bg-slate-100 border w-[40px] h-[40px] rounded-md flex justify-center items-center cursor-pointer'>
            <MdOutlineKeyboardVoice size={20} fill='gray' />
          </div>
          <div>
            <button
              type='submit'
              className='bg-[#33ccff] h-[40px] w-[40px] flex justify-center items-center rounded-md'
            >
              <BsSend size={20} fill='white' />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChatInput
