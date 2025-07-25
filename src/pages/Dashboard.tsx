import ExampleChart from '@/components/example-chart'
import Hud from '../components/hud'



function Dashboard() {

  return (
    <>
      <Hud isHome={true}/>
      <div className="fixed inset-0 overflow-y-auto">
        <div className='flex flex-col gap-4 h-full m-5'>
          <div className='flex gap-4 h-1/3 w-full'>
            <div className='bg-neutral-500 p-4 w-1/2 rounded-xl'></div>
            <div className='bg-neutral-500 p-4 w-1/2 rounded-xl' ></div>
          </div>
          <div className="w-full h-1/3 bg-green-600 p-4 text-white rounded-xl"><ExampleChart></ExampleChart></div>
          <div className="flex h-1/3 gap-4 w-full">
            <div className='bg-neutral-500 p-4 w-1/2 rounded-xl'></div>
            <div className='bg-neutral-500 p-4 w-1/2 rounded-xl'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
