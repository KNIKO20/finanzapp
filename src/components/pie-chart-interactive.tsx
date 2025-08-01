
import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
const API_URL = import.meta.env.VITE_API_URL;

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive pie chart"


const chartConfig = {
  expenditure: {
    label: "Expenditure",
  },
  food: {
    label: "Food",
    color: "var(--chart-1)",
  },
  leisure: {
    label: "Leisure",
    color: "var(--chart-2)",
  },
  transport: {
    label: "Transport",
    color: "var(--chart-3)",
  },
  study: {
    label: "Study",
    color: "var(--chart-4)",
  },
  home: {
    label: "Home",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig
  
type OperationType = {
  id: number;
  name: string;
  details: string;
  amount: number,
  date: string,
  type: string,
  category: string
  }




export function ChartPieInteractive() {
  const [operations, setOperations] = React.useState<OperationType[]>([])

  const [activeYear, setActiveYear] = React.useState("2025")
  const dataYear = [...new Set(operations.map(op => op.date.slice(0, 4)))];


  React.useEffect(() => {
    fetch(`http://${API_URL}:8000/operations`)
    .then((res)=>res.json())
    .then((data)=>setOperations(data))
    .catch((err)=> console.log(err.message))
  }, []);
  const categoriesList = [
    "food","study","leisure","transport","home"
  ];
  const chartData = categoriesList.map((category) => {
    const categoryOps = operations.filter((op) => op.date.slice(0,4) === activeYear && op.category === category  );
    const expenditure = categoryOps.filter(op => op.type === "expenditure").reduce((sum,op)=> sum + op.amount, 0);
    const fill = `var(--color-${category})` 
    return {
      category,
      expenditure,
      fill
    }
  })
  const id = "pie-interactive"
  const categories = React.useMemo(() => chartData.map((item) => item.category), [chartData])
  const [activeCategory, setActiveCategory] = React.useState(categories[0])

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.category === activeCategory),
    [activeCategory, chartData]
  )

  


  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pie Chart - Expenditures</CardTitle>
          <CardDescription>January - December 2024</CardDescription>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {categories.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>

          {/* Select year function */}

        </Select>
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
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="expenditure"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {chartData[activeIndex].expenditure.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Amount
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
