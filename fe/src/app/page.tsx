import Chat from '@/components/pages/Chats/Chat'
import { endpoint } from '@/lib/constant'
import { fetchDataWithAuth } from '@/services/fetch/fetchApi'

export default async function Home() {
  const res = await fetchDataWithAuth(endpoint.get_all_user)
  const { result } = res

  return (
    <div className='bg-slate-50 w-full h-screen p-10 flex justify-center items-center'>
      <Chat users={result} />
    </div>
  )
}
