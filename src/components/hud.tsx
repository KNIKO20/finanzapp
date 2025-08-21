import { TiChartLineOutline, TiPlus, TiThList, TiCalendarOutline, TiCogOutline, TiHome } from "react-icons/ti"
import { Link } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"


type Props = {
  isHome: boolean
}

function Hud({isHome}: Props) {

  return (
    <>
      <div className='fixed top-4 right-2 z-50'>
        <div>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" children={undefined}>
          </ThemeProvider>
        </div>
      </div>
        <div className="bg-neutral-800 fixed bottom-0 left-0 w-full text-white p-6 shadow z-50 rounded-t-2xl ">
          <div className="bg-neutral-600 opacity-85 absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-full text-8xl hover:opacity-95 hover:shadow-2xl not-dark:opacity-100">
            {isHome ? (
              <Link to={"/create"}>
                <TiPlus className="text-white w-10 h-10"></TiPlus>
              </Link>
            ) : (
              <Link to={"/dashboard"}>  
                <TiHome className="text-white w-10 h-10"></TiHome> 
              </Link>)}
          </div>
          <div className=" absolute left-1/8 transform -translate-x-1/2 -translate-y-1/2 p-2">
            <Link to={"/stats"}>
              <TiChartLineOutline className="text-white w-7 h-7 hover:text-neutral-200" ></TiChartLineOutline>
            </Link>
          </div>  
          <div className=" absolute left-2/7 transform -translate-x-1/2 -translate-y-1/2 p-2">
            <Link to={"/details"}>
              <TiThList className="text-white w-7 h-7 hover:text-neutral-200" ></TiThList>
            </Link>
          </div>
          <div className=" absolute left-5/7 transform -translate-x-1/2 -translate-y-1/2 p-2">
            <Link to={"/"}>
              <TiCalendarOutline className="text-white w-7 h-7 hover:text-neutral-200" ></TiCalendarOutline>
            </Link>
          </div>
          <div className=" absolute left-7/8 transform -translate-x-1/2 -translate-y-1/2 p-2">
            <Link to={"/options"}>
              <TiCogOutline className="text-white w-7 h-7 hover:text-neutral-200" ></TiCogOutline>
            </Link>
          </div>
        </div>    
    </>
  )
}

export default Hud