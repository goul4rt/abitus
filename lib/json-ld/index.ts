import { PageType, PersonData } from './types';
import { generateHomeSchema } from './schemas/home';
import { generatePersonSchema } from './schemas/person';
import { generateDashboardSchema } from './schemas/dashboard';

export function generateJsonLd(pageType: PageType, data?: PersonData) {
  if (pageType === "person") {
    if (!data) return null;
    return generatePersonSchema(data);
  }

  switch (pageType) {
    case "home":
      return generateHomeSchema();
    case "dashboard":
      return generateDashboardSchema();
    default:
      return null;
  }
}

export * from './types';
export { CONFIG } from './config'; 