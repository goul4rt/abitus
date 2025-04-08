"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StatsResponse } from "@/services/statistics/types"
import { UserX, UserCheck, Users, TrendingUp } from "lucide-react"

export default function StatsCards({ stats, loading }: { stats: StatsResponse, loading: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="region" aria-label="Estatísticas">
      <Card className="overflow-hidden border-l-4 border-l-destructive">
        <CardContent className="p-6 flex items-center gap-4">
          {loading ? (
            <>
              <Skeleton className="h-12 w-12 rounded-full" aria-hidden="true" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" aria-hidden="true" />
                <Skeleton className="h-6 w-[60px]" aria-hidden="true" />
              </div>
            </>
          ) : (
            <>
              <div className="rounded-full bg-red-100 p-3" aria-hidden="true">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground" id="desaparecidos-label">
                  Desaparecidos
                </p>
                <h3 className="text-2xl font-bold" aria-labelledby="desaparecidos-label">
                  {stats.quantPessoasDesaparecidas.toLocaleString()}
                </h3>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-l-4 border-l-green-600">
        <CardContent className="p-6 flex items-center gap-4">
          {loading ? (
            <>
              <Skeleton className="h-12 w-12 rounded-full" aria-hidden="true" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" aria-hidden="true" />
                <Skeleton className="h-6 w-[60px]" aria-hidden="true" />
              </div>
            </>
          ) : (
            <>
              <div className="rounded-full bg-green-100 p-3" aria-hidden="true">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground" id="localizados-label">
                  Localizados
                </p>
                <h3 className="text-2xl font-bold" aria-labelledby="localizados-label">
                  {stats.quantPessoasEncontradas.toLocaleString()}
                </h3>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-l-4 border-l-blue-600">
        <CardContent className="p-6 flex items-center gap-4">
          {loading ? (
            <>
              <Skeleton className="h-12 w-12 rounded-full" aria-hidden="true" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" aria-hidden="true" />
                <Skeleton className="h-6 w-[60px]" aria-hidden="true" />
              </div>
            </>
          ) : (
            <>
              <div className="rounded-full bg-blue-100 p-3" aria-hidden="true">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground" id="total-label">
                  Total de Casos
                </p>
                <h3 className="text-2xl font-bold" aria-labelledby="total-label">
                  {(stats.quantPessoasEncontradas + stats.quantPessoasDesaparecidas).toLocaleString()}
                </h3>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-l-4 border-l-purple-600">
        <CardContent className="p-6 flex items-center gap-4">
          {loading ? (
            <>
              <Skeleton className="h-12 w-12 rounded-full" aria-hidden="true" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" aria-hidden="true" />
                <Skeleton className="h-6 w-[60px]" aria-hidden="true" />
              </div>
            </>
          ) : (
            <>
              <div className="rounded-full bg-purple-100 p-3" aria-hidden="true">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground" id="taxa-label">
                  Taxa de Sucesso
                </p>
                <h3 className="text-2xl font-bold" aria-labelledby="taxa-label">
                  {((stats.quantPessoasEncontradas / (stats.quantPessoasDesaparecidas + stats.quantPessoasEncontradas)) * 100).toFixed(1)}%
                </h3>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

