import { BASE_SITE_URL } from "@/lib/constants";

export function Head() {
  return (
    <head>
    <link rel="icon" href="/favicon.ico" />
    <link rel="canonical" href={BASE_SITE_URL} />
    <meta name="apple-mobile-web-app-title" content="Abitus" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
    <meta name="geo.region" content="BR-MT" />
    <meta name="geo.placename" content="Mato Grosso" />
    <meta name="theme-color" content="#046546" />
  </head>
  );
} 