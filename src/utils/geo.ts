import { UserLocation } from '../types/transit';

/**
 * Calculates distance in meters between two coordinates using the Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Formats distance in readable meters or kilometers
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

/**
 * Estimates walking time in minutes (assumes avg speed ~80m/min)
 */
export function estimateWalkTime(meters: number): number {
  return Math.max(1, Math.round(meters / 80));
}

/**
 * Calculates compass direction bearing from point 1 to point 2
 */
export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { degrees: number; cardinal: string } {
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  const brng = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  const index = Math.round(brng / 45) % 8;

  return {
    degrees: Math.round(brng),
    cardinal: cardinals[index],
  };
}

/**
 * Checks if coordinate is roughly within Singapore geographic boundaries
 */
export function isWithinSingapore(lat: number, lng: number): boolean {
  return lat >= 1.15 && lat <= 1.48 && lng >= 103.58 && lng <= 104.05;
}

/**
 * Curated Singapore Hotspots for one-tap commuter location simulation
 */
export const SINGAPORE_HOTSPOTS: Array<{
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
}> = [
  {
    id: 'bugis',
    name: 'Bugis / Victoria St',
    description: 'Bugis Junction & MRT Exit A',
    lat: 1.30054,
    lng: 103.85584,
  },
  {
    id: 'orchard',
    name: 'Orchard Rd / Somerset',
    description: 'Somerset Station & 313@Somerset',
    lat: 1.30128,
    lng: 103.83785,
  },
  {
    id: 'downtown',
    name: 'Downtown / Raffles Place',
    description: 'Opp The Treasury & Marina Bay Financial',
    lat: 1.28965,
    lng: 103.84925,
  },
  {
    id: 'dhoby-ghaut',
    name: 'Dhoby Ghaut / Plaza Sing',
    description: 'Dhoby Ghaut Station Exit B',
    lat: 1.29882,
    lng: 103.84551,
  },
  {
    id: 'jurong-east',
    name: 'Jurong East Interchange',
    description: 'Jurong East Central & Westgate',
    lat: 1.33325,
    lng: 103.74238,
  },
  {
    id: 'tampines',
    name: 'Tampines Interchange',
    description: 'Tampines Central & MRT',
    lat: 1.35322,
    lng: 103.94528,
  },
  {
    id: 'vivocity',
    name: 'HarbourFront / VivoCity',
    description: 'Opp VivoCity & Sentosa Gateway',
    lat: 1.26442,
    lng: 103.82221,
  },
  {
    id: 'serangoon',
    name: 'Serangoon / Nex Mall',
    description: 'Serangoon Central Bus Interchange',
    lat: 1.34963,
    lng: 103.87352,
  },
];

export const DEFAULT_USER_LOCATION: UserLocation = {
  lat: 1.30054,
  lng: 103.85584,
  accuracy: 12,
  isSimulated: true,
  locationName: 'Bugis / Victoria St',
  timestamp: Date.now(),
};
