import { NextResponse } from "next/server";

export function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${
    process.env.NEXT_PUBLIC_BASE_URL || "https://abitus.pjc.mt.gov.br"
  }/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
