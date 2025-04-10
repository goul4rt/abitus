import { Card, CardContent } from "@/components/ui/card"
import { UserX, UserCheck } from "lucide-react"
import { StatsCounterProps } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsCounter({ missingCount, foundCount, isLoading }: StatsCounterProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <Skeleton className="rounded-full h-12 w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <Skeleton className="rounded-full h-12 w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card className="overflow-hidden">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full bg-red-100 p-3">
            <UserX className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Pessoas Desaparecidas</h2>
            <p className="text-2xl font-bold">{missingCount.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full bg-green-100 p-3">
            <UserCheck className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Pessoas Localizadas</h2>
            <p className="text-2xl font-bold">{foundCount.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
