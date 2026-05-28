import VaultsClient from './VaultsClient';

export default async function VaultsPage() {
  let vaults = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/portals/vaults`, { cache: 'no-store' });
    const data = await res.json();
    vaults = data?.vaults || data || [];
  } catch (error) {
    console.error('Failed to load vaults:', error);
  }
  return <VaultsClient initialVaults={vaults} />;
}
