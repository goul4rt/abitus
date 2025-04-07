import { BASE_SITE_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

export function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_SITE_URL}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
