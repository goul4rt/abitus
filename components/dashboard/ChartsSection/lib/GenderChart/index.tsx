import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartData } from "@/components/dashboard/ChartsSection/types"
import { CHART_DIMENSIONS } from "@/components/dashboard/ChartsSection/constants"
import { GenderChartProps } from "./types"

export function GenderChart({ data }: GenderChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Gênero</CardTitle>
        <CardDescription>Proporção de pessoas desaparecidas por gênero</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={CHART_DIMENSIONS.OUTER_RADIUS}
                dataKey="value"
              >
                {data.map((entry: ChartData, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} pessoas`, 'Quantidade']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 