import Content from '@/components/Content/Content'
import Sidebar from '@/components/Sidebar/Sidebar'
import { fetchDataWithAuth } from '@/services/fetch/fetchApi'

export default async function Home() {
  const res = await fetchDataWithAuth()
  const { result } = res

  return (
    <div className="bg-slate-50 w-full h-screen p-10 flex justify-center items-center">
      <div className="flex border w-full h-full justify-between shadow-2xl rounded-3xl bg-white overflow-hidden">
        <Sidebar users={result ? result : []} />
        <Content />
      </div>
    </div>
  )
}
