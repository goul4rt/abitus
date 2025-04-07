import { Card, CardContent } from "@/components/ui/card"
import { UserX, UserCheck } from "lucide-react"
import { StatsCounterProps } from "./types";

export default function StatsCounter({ missingCount, foundCount }: StatsCounterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card className="overflow-hidden">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full bg-red-100 p-3">
            <UserX className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pessoas Desaparecidas</p>
            <h3 className="text-2xl font-bold">{missingCount.toLocaleString()}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full bg-green-100 p-3">
            <UserCheck className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pessoas Localizadas</p>
            <h3 className="text-2xl font-bold">{foundCount.toLocaleString()}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

