import Hud from '../components/hud'
import { useNavigate } from 'react-router-dom'
import { ChartLineMultiple } from '@/components/line-chart'



function Dashboard() {
  const navigate = useNavigate()
  return (
    <>
      <Hud isHome={true}/>
      <div className="fixed inset-0 overflow-y-auto mb-8">
        <div className='flex flex-col gap-4 h-full m-5'>
          <div className='flex gap-4 h-1/3 w-full'>
            <div className='bg-neutral-800 p-4 w-1/2 card'></div>
            <div className='bg-neutral-800 p-4 w-1/2 card' ></div>
          </div>
          <div className="w-full p-4 text-white card" onClick={()=>navigate("/stats")}><ChartLineMultiple></ChartLineMultiple></div>
          <div className="flex h-1/3 gap-4 w-full">
            <div className='bg-neutral-800 p-4 w-1/2 card'></div>
            <div className='bg-neutral-800 p-4 w-1/2 card'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
