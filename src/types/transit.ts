export type BusLoad = 'SEA' | 'SDA' | 'LSD'; // Seats Available, Standing Available, Limited Standing
export type BusType = 'SD' | 'DD' | 'BD'; // Single Deck, Double Deck, Bendy
export type BusFeature = 'WAB' | ''; // Wheelchair Accessible Bus
export type BusOperator = 'SBST' | 'SMRT' | 'TTS' | 'GAS'; // SBS Transit, SMRT, Tower Transit, Go-Ahead Singapore

export interface BusArrivalInfo {
  estimatedArrival: string; // ISO timestamp
  secondsRemaining: number;
  formattedTime: string; // e.g. "Arr", "2m", "14m"
  load: BusLoad;
  type: BusType;
  feature: BusFeature;
  plateNumber: string;
  distanceMeters?: number;
}

export interface BusServiceArrival {
  serviceNo: string;
  operator: BusOperator;
  destinationCode: string;
  destinationName: string;
  category: 'Trunk' | 'Feeder' | 'Express' | 'Night';
  nextBus: BusArrivalInfo | null;
  nextBus2: BusArrivalInfo | null;
  nextBus3: BusArrivalInfo | null;
}

export interface BusStop {
  code: string; // 5-digit code e.g. "01012"
  name: string; // e.g. "Bugis Stn Exit A"
  road: string; // e.g. "Victoria St"
  lat: number;
  lng: number;
  services: string[];
  distanceMeters?: number;
  walkTimeMinutes?: number;
  bearing?: string; // e.g. "NE", "SW"
}

export interface BusRouteStop {
  stopCode: string;
  stopName: string;
  roadName: string;
  seq: number;
  distanceKm: number;
  isCurrentStop?: boolean;
  hasActiveBus?: boolean;
}

export interface BusRoute {
  serviceNo: string;
  direction: 1 | 2;
  origin: string;
  destination: string;
  operatingHours: {
    firstBus: string;
    lastBus: string;
    freqPeak: string;
    freqOffPeak: string;
  };
  stops: BusRouteStop[];
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  isSimulated: boolean;
  locationName: string;
  timestamp: number;
}

export interface FavoriteItem {
  id: string;
  type: 'stop' | 'service';
  stopCode: string;
  serviceNo?: string;
  customLabel?: string;
  tag?: 'Home' | 'Work' | 'Frequent' | 'Other';
  addedAt: number;
}

export interface BusAlert {
  id: string;
  stopCode: string;
  stopName: string;
  serviceNo: string;
  destinationName: string;
  targetMinutes: number; // e.g. notify when <= 2 minutes
  triggered: boolean;
  createdAt: number;
}
