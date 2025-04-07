import { CONFIG } from '../config';

export function generateHomeSchema() {
  return {
    "@context": CONFIG.context,
    "@type": "GovernmentOrganization",
    name: CONFIG.organization.name,
    url: CONFIG.organization.url,
    logo: CONFIG.organization.logo,
    description: CONFIG.organization.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: CONFIG.organization.address.country,
      addressRegion: CONFIG.organization.address.region,
      addressLocality: CONFIG.organization.address.locality,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONFIG.organization.contact.phone,
      contactType: CONFIG.organization.contact.type,
    },
  };
} 