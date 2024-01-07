import { BsSend } from 'react-icons/bs'
import { MdOutlineKeyboardVoice } from 'react-icons/md'
import { LuImagePlus } from 'react-icons/lu'

const messages = [
  'first',
  'xyz',
  'dasd',
  'ddasdas',
  'dadas Loremfdjfijsdijfsdoifjsdjfoidsjifjiosdjfsdifjdsojfisdjfij isdjfijsdif ojsdiofjosdjf fdiasfjisdjfiojdsifjosidjfoisd',
  '123',
  '3123',
  '3123',
  '312312',
  '31312',
  '31231',
  'last',
]

const Content = () => {
  return (
    <div className="basis-4/5 flex">
      <div className="basis-4/5 border-r flex flex-col">
        {/** Message */}
        <div className="flex-1 overflow-auto no-scrollbar p-4">
          <ul className='flex flex-col-reverse'>
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
        </div>

        {/** Input */}
        <div className="p-4">
          <form className="flex justify-between items-center gap-x-3">
            <div className="flex-1">
              <input
                placeholder="Aa"
                className="w-full text-lg outline-none bg-slate-100 p-4 rounded-[50px]"
              />
            </div>
            <div className="flex justify-end items-center gap-x-4">
              <div>
                <label
                  htmlFor="file"
                  className="bg-slate-100 border w-[40px] h-[40px] rounded-md flex justify-center items-center cursor-pointer"
                >
                  <LuImagePlus size={20} />
                </label>
                <input type="file" id="file" className="hidden" />
              </div>
              <div className="bg-slate-100 border w-[40px] h-[40px] rounded-md flex justify-center items-center cursor-pointer">
                <MdOutlineKeyboardVoice size={20} fill="gray" />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#33ccff] h-[40px] w-[40px] flex justify-center items-center rounded-md"
                >
                  <BsSend size={20} fill="white" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/** Hinh anh */}
      <div className="basis-1/5 "></div>
    </div>
  )
}

export default Content
