"use client";

import { useParams, useRouter } from "next/navigation";
import { usePersonDetails } from "@/services/people";
import { useMemo } from "react";
import { 
  PersonDetails, 
  PersonSkeleton, 
  PersonError 
} from "@/components/person";

export default function PersonDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = useMemo(() => params?.id as string, [params]);

  const { data: person, isLoading, error, refetch } = usePersonDetails(id);

  const handleShare = () => {
    if (!person) return;
    
    if (navigator.share) {
      navigator.share({
        title: `Pessoa Desaparecida: ${person.nome}`,
        text: `Ajude a encontrar ${person.nome}, ${person.idade} anos, desaparecido(a).`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  const handleReportClick = (id: string) => {
    router.push(`/person/${id}/report`);
  };

  if (isLoading) {
    return <PersonSkeleton />;
  }

  if (error || !person) {
    return <PersonError message={error?.message} onRetry={() => refetch()} />;
  }

  return (
    <PersonDetails 
      person={person} 
      onShare={handleShare} 
      onReportClick={handleReportClick} 
    />
  );
}
