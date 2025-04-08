"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, BarChart2, MapPin, Users } from "lucide-react"
import generateJsonLd from "@/app/json-ld"
import StatsCards from "@/components/dashboard/StatsCards"
import { RecentCasesSection } from "@/components/dashboard/RecentCasesSection"
import { MapSection } from "@/components/dashboard/MapSection"
import { ChartsSection } from "@/components/dashboard/ChartsSection"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd("dashboard")),
        }}
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visualização e análise de dados sobre pessoas desaparecidas</p>
        </div>
          <Link href="/">
          <Button variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Voltar para Lista
          </Button>
        </Link>
      </div>

      <StatsCards />

      <Tabs defaultValue="charts" className="mt-8">
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
          <TabsTrigger value="charts" className="flex items-center">
            <BarChart2 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Gráficos</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Mapa</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Recentes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <ChartsSection />
        </TabsContent>

        <TabsContent value="map">
          <MapSection />
        </TabsContent>

        <TabsContent value="recent">
          <RecentCasesSection />
        </TabsContent>
      </Tabs>

    </div>
  )
}

