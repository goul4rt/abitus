"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import RecentActivityList from "@/components/recent-activity";
import { useRandomMissingPersons } from "@/services/people";
import { ErrorMessage } from "@/components/layout";

export function RecentCasesSection() {
  const router = useRouter();

  const {
    data: recentPersons,
    isLoading: personsLoading,
    error: personsError,
  } = useRandomMissingPersons(5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Casos Recentes</CardTitle>
        <CardDescription>
          Últimas pessoas reportadas como desaparecidas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {personsLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : personsError ? (
          <ErrorMessage
            title="Erro ao carregar casos recentes"
            message="Não foi possível carregar os casos recentes. Tente novamente mais tarde."
          />
        ) : (
          <RecentActivityList persons={recentPersons || []} />
        )}

        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Ver todos os casos
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
