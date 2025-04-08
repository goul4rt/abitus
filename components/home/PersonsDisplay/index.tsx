import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PersonCard from "@/components/home/PersonsDisplay/lib/PersonCard";
import PersonListItem from "@/components/home/PersonsDisplay/lib/PersonListItem";
import PersonTable from "@/components/home/PersonsDisplay/lib/PersonTable";
import { PersonsDisplayProps } from "./types";

export default function PersonsDisplay({
  viewMode,
  isLoading,
  persons,
}: PersonsDisplayProps) {
  const router = useRouter();

  if (isLoading) {
    switch (viewMode) {
      case "grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "list":
        return (
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex border rounded-lg p-4 items-center">
                <div className="mr-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-5 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        );

      case "table":
      default:
        return (
          <div className="border rounded-md">
            <div className="bg-muted p-4 grid grid-cols-5 gap-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            {[...Array(10)].map((_, i) => (
              <div key={i} className="p-4 border-t grid grid-cols-5 gap-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        );
    }
  }

  if (persons.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">Nenhuma pessoa encontrada</h3>
        <p className="text-muted-foreground mt-2">
          Tente ajustar os filtros de busca
        </p>
      </div>
    );
  }

  switch (viewMode) {
    case "grid":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {persons.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
            />
          ))}
        </div>
      );
    case "list":
      return (
        <div className="space-y-4">
          {persons.map((person) => (
            <PersonListItem
              key={person.id}
              person={person}
            />
          ))}
        </div>
      );
    case "table":
      return (
        <PersonTable
          persons={persons}
        />
      );
    default:
      return null;
  }
}
