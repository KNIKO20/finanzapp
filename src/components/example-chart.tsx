import { ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { Card, CardHeader } from "./ui/card";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


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




function ExampleChart() {
  const navigate = useNavigate();
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
    fetch(`http://${API_URL}:8000/operations/show`, {
    credentials: "include",
  })
    .then((res)=>{
      if (res.status === 401 || res.status === 403) {
        navigate("/")
        return null;
      }
      res.json()
    })
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
    <>
    <Card>
    <CardHeader>
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
    <ChartContainer config={chartConfig} className="max-h-[400px]">
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
    </Card>
    </>
  )
}

export default ExampleChart