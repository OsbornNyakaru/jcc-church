"use client"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for the visitor chart
const data = [
  { date: "Apr 01", visitors: 120 },
  { date: "Apr 02", visitors: 145 },
  { date: "Apr 03", visitors: 132 },
  { date: "Apr 04", visitors: 167 },
  { date: "Apr 05", visitors: 210 },
  { date: "Apr 06", visitors: 187 },
  { date: "Apr 07", visitors: 231 },
  { date: "Apr 08", visitors: 198 },
  { date: "Apr 09", visitors: 184 },
  { date: "Apr 10", visitors: 165 },
  { date: "Apr 11", visitors: 176 },
  { date: "Apr 12", visitors: 201 },
  { date: "Apr 13", visitors: 188 },
  { date: "Apr 14", visitors: 219 },
  { date: "Apr 15", visitors: 234 },
  { date: "Apr 16", visitors: 245 },
  { date: "Apr 17", visitors: 267 },
  { date: "Apr 18", visitors: 253 },
  { date: "Apr 19", visitors: 289 },
  { date: "Apr 20", visitors: 312 },
  { date: "Apr 21", visitors: 298 },
  { date: "Apr 22", visitors: 276 },
  { date: "Apr 23", visitors: 265 },
  { date: "Apr 24", visitors: 287 },
  { date: "Apr 25", visitors: 302 },
  { date: "Apr 26", visitors: 316 },
  { date: "Apr 27", visitors: 298 },
  { date: "Apr 28", visitors: 287 },
  { date: "Apr 29", visitors: 310 },
  { date: "Apr 30", visitors: 325 },
]

export function VisitorChart() {
  return (
    <ChartContainer
      config={{
        visitors: {
          label: "Website Visitors",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="var(--color-visitors)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
