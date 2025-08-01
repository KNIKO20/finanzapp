import ExampleChart from "@/components/example-chart";
import Hud from "@/components/hud";
import { ChartLineMultiple } from "@/components/line-chart";
import { ChartPieInteractive } from "@/components/pie-chart-interactive";


export function Stats() {


  return (
    <>
        <Hud isHome={false}></Hud>
        <div className="fixed inset-0 overflow-y-scroll pb-20 flex flex-col gap-4 h-full m-5">
          <ExampleChart></ExampleChart>
          <ChartPieInteractive></ChartPieInteractive>
          <ChartLineMultiple></ChartLineMultiple>
        </div>
        
    </>
  )
}