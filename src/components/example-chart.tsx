import { ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { useEffect, useState } from "react"
const API_URL = import.meta.env.VITE_API_URL;


const chartConfig = {
  income: {
    label: "Income",
    color: "#1B7C1B",
  },
  expenditure: {
    label: "Expenditure",
    color: "#C11B17",
  },
} satisfies ChartConfig




function ExampleChart() {
  type OperationType = {
  id: number;
  name: string;
  details: string;
  amount: number,
  date: string,
  type: string,
  category: string
  }

  const [operations, setOperations] = useState<OperationType[]>([])

  useEffect(() => {
    fetch(`http://${API_URL}:8000/operations`)
    .then((res)=>res.json())
    .then((data)=>setOperations(data))
    .catch((err)=> console.log(err.message))
  }, []);
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const chartData = months.map((month, index) => {
    const monthNum = (index + 1).toString().padStart(2, "0");
    const monthOps = operations.filter((op) => op.date.slice(5,7) === monthNum);
    const income = monthOps.filter(op => op.type === "income").reduce((sum,op)=> sum + op.amount, 0);
    const expenditure = monthOps.filter(op => op.type === "expenditure").reduce((sum,op)=> sum + op.amount, 0);
    return {
      month,
      income,
      expenditure
    }
  })


  return (
    <>
    <ChartContainer config={chartConfig} className="h-full w-full min-h-[200px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false}  />
        <XAxis
        dataKey="month"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expenditure" fill="var(--color-expenditure)" radius={4} />
      </BarChart>
    </ChartContainer>
    </>
  )
}

export default ExampleChart