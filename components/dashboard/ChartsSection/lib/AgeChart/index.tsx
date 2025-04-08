import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AgeChartProps } from "./types"
import { CHART_COLORS } from "@/components/dashboard/ChartsSection/constants"

export function AgeChart({ data }: AgeChartProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Distribuição por Faixa Etária</CardTitle>
        <CardDescription>Casos por grupos de idade</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} pessoas`, 'Quantidade']} />
              <Legend />
              <Bar dataKey="value" name="Pessoas" fill={CHART_COLORS.AGE} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 