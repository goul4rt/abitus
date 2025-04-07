import { fetchMissingPersons } from "@/services/people"

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://abitus.pjc.mt.gov.br"

  const currentDate = new Date()

  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  try {
    const personsData = await fetchMissingPersons({
      pagina: 0,
      porPagina: 100,
    })

    const personRoutes = personsData.content.map((person) => ({
      url: `${baseUrl}/person/${person.id}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    }))

    return [...routes, ...personRoutes]
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error)
    return routes
  }
}
