
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const API_URL = import.meta.env.VITE_API_URL;
export const description = "A multiple line chart"


const chartConfig = {
  income: {
    label: "Income",
    color: "#489E6E",
  },
  expenditure: {
    label: "Expenditure",
    color: "#BA4E3D",
  },
} satisfies ChartConfig

export function ChartLineMultiple() {
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

    const [activeYear, setActiveYear] = React.useState("2025")
    const dataYear = [...new Set(operations.map(op => op.date.slice(0, 4)))];

    useEffect(() => {
      fetch(`http://${API_URL}:8000/operations`)
      .then((res)=>res.json())
      .then((data)=>{
      const normalized = data.map((op: { amount: string; }) => ({
        ...op,
        amount: parseFloat(op.amount)
      }));
      setOperations(normalized);
    })
      .catch((err)=> console.log(err.message))
    }, []);
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    const chartData = months.map((month, index) => {
      const monthNum = (index + 1).toString().padStart(2, "0");
      const monthOps = operations.filter((op) => op.date.slice(0,4) === activeYear && op.date.slice(5,7) === monthNum);
      const income = monthOps.filter(op => op.type === "income").reduce((sum,op)=> sum + op.amount, 0);
      const expenditure = monthOps.filter(op => op.type === "expenditure").reduce((sum,op)=> sum + op.amount, 0);
      return {
        month,
        income,
        expenditure
      }
    })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - December</CardDescription>
        {/* Select year function */}
        <Select value={activeYear} onValueChange={setActiveYear}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select year"
          >
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {dataYear.map((key) => {
        

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    {key}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center">
        <div className="max-h-[400px] w-full max-w-[600px]">
        <ChartContainer config={chartConfig} className="max-h-[400px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="income"
              type="monotone"
              stroke="var(--color-income)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="expenditure"
              type="monotone"
              stroke="var(--color-expenditure)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
        </div>
      </div>
      </CardContent>
      
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
