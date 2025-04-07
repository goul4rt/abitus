import { BASE_SITE_URL } from "@/lib/constants";
import { fetchMissingPersons } from "@/services/people/service";

export default async function sitemap() {
  const currentDate = new Date();

  const routes = [
    {
      url: `${BASE_SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_SITE_URL}/dashboard`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const personsData = await fetchMissingPersons({
      pagina: 0,
      porPagina: 100,
    });

    const personRoutes = personsData.content.map((person) => ({
      url: `${BASE_SITE_URL}/person/${person.id}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...routes, ...personRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
    return routes;
  }
}
