import { BusStop, BusServiceArrival, BusLoad, BusType, BusFeature, BusOperator, BusRoute } from '../types/transit';

export const SINGAPORE_BUS_STOPS: BusStop[] = [
  // --- BUGIS & BRAS BASAH ---
  {
    code: '01012',
    name: 'Bugis Stn Exit A',
    road: 'Victoria St',
    lat: 1.30054,
    lng: 103.85584,
    services: ['2', '12', '33', '130', '133', '147', '190', '851', '960'],
  },
  {
    code: '01112',
    name: 'Bugis Junction',
    road: 'Victoria St',
    lat: 1.29962,
    lng: 103.85514,
    services: ['2', '12', '33', '130', '133', '147', '170', '851', '960'],
  },
  {
    code: '01119',
    name: 'Bugis Stn Exit B',
    road: 'Victoria St',
    lat: 1.30095,
    lng: 103.85652,
    services: ['61', '851e', '960e', '980'],
  },
  {
    code: '01059',
    name: 'Opp Bugis Junction',
    road: 'Middle Rd',
    lat: 1.29871,
    lng: 103.85421,
    services: ['7', '32', '51', '63', '80', '145', '175', '197'],
  },
  {
    code: '04121',
    name: 'Bras Basah Cplx',
    road: 'Victoria St',
    lat: 1.29654,
    lng: 103.85321,
    services: ['2', '12', '33', '130', '133', '147', '190'],
  },

  // --- ORCHARD & SOMERSET ---
  {
    code: '09048',
    name: 'Orchard Stn / Tangs',
    road: 'Orchard Rd',
    lat: 1.30412,
    lng: 103.83295,
    services: ['36', '77', '124', '143', '167', '174', '190', '518', '972'],
  },
  {
    code: '09047',
    name: 'Opp Orchard Stn / ION',
    road: 'Orchard Blvd',
    lat: 1.30325,
    lng: 103.83155,
    services: ['7', '14', '16', '65', '106', '111', '123', '175', '502'],
  },
  {
    code: '08138',
    name: 'Somerset Stn',
    road: 'Somerset Rd',
    lat: 1.30128,
    lng: 103.83785,
    services: ['7', '14', '16', '36', '65', '77', '106', '111', '123', '174', '190'],
  },
  {
    code: '08121',
    name: 'Midpoint Orchard',
    road: 'Orchard Rd',
    lat: 1.30214,
    lng: 103.83892,
    services: ['7', '14', '16', '65', '106', '111', '123', '175', '502'],
  },
  {
    code: '09022',
    name: 'Orchard Plaza',
    road: 'Orchard Rd',
    lat: 1.30105,
    lng: 103.84021,
    services: ['123', '143', '518', '190', '65', '36'],
  },

  // --- DHOBY GHAUT & SELEGIE ---
  {
    code: '08057',
    name: 'Dhoby Ghaut Stn Exit B',
    road: 'Orchard Rd',
    lat: 1.29882,
    lng: 103.84551,
    services: ['7', '14', '16', '36', '65', '77', '106', '111', '124', '167', '174', '190'],
  },
  {
    code: '08058',
    name: 'Plaza Singapura',
    road: 'Orchard Rd',
    lat: 1.29955,
    lng: 103.84475,
    services: ['16', '36', '65', '77', '106', '111', '124', '162', '167', '174', '190'],
  },
  {
    code: '07011',
    name: 'Peace Ctr',
    road: 'Selegie Rd',
    lat: 1.30089,
    lng: 103.85042,
    services: ['56', '64', '65', '131', '139', '147', '166', '857'],
  },
  {
    code: '07021',
    name: 'Sch of the Arts (SOTA)',
    road: 'Prinsep St',
    lat: 1.29895,
    lng: 103.84988,
    services: ['64', '65', '131', '139', '147', '166', '857'],
  },

  // --- DOWNTOWN, CITY HALL & RAFFLES PLACE ---
  {
    code: '04168',
    name: 'City Hall Stn Exit B',
    road: 'Nth Bridge Rd',
    lat: 1.29321,
    lng: 103.85195,
    services: ['32', '51', '61', '63', '80', '124', '145', '166', '174', '197', '851'],
  },
  {
    code: '04111',
    name: 'Opp The Treasury',
    road: 'High St',
    lat: 1.28965,
    lng: 103.84925,
    services: ['2', '12', '33', '147', '190'],
  },
  {
    code: '03011',
    name: 'Fullerton Sq',
    road: 'Battery Rd',
    lat: 1.28612,
    lng: 103.85244,
    services: ['10', '57', '70', '100', '107', '130', '131', '167', '196'],
  },
  {
    code: '03059',
    name: 'The Sail',
    road: 'Marina Blvd',
    lat: 1.28185,
    lng: 103.85321,
    services: ['97', '106', '133', '400', '513'],
  },
  {
    code: '03511',
    name: 'Marina Bay Sands Theatre',
    road: 'Bayfront Ave',
    lat: 1.28421,
    lng: 103.85882,
    services: ['97', '106', '133', '502', '518'],
  },
  {
    code: '03509',
    name: 'Bayfront Stn Exit B',
    road: 'Bayfront Ave',
    lat: 1.28145,
    lng: 103.85965,
    services: ['97', '106', '133', '502', '518'],
  },

  // --- CHINATOWN & TANJONG PAGAR ---
  {
    code: '05013',
    name: 'Chinatown Stn Exit E',
    road: 'Eu Tong Sen St',
    lat: 1.28485,
    lng: 103.84412,
    services: ['2', '12', '33', '54', '61', '143', '147', '190', '851', '961', '970'],
  },
  {
    code: '05049',
    name: 'People’s Pk Cplx',
    road: 'Eu Tong Sen St',
    lat: 1.28312,
    lng: 103.84295,
    services: ['2', '12', '33', '61', '63', '80', '143', '197', '961', '970'],
  },
  {
    code: '03223',
    name: 'Tanjong Pagar Plaza',
    road: 'Tanjong Pagar Rd',
    lat: 1.27645,
    lng: 103.84318,
    services: ['80', '145'],
  },

  // --- HARBOURFRONT & VIVOCITY ---
  {
    code: '14141',
    name: 'VivoCity',
    road: 'Telok Blangah Rd',
    lat: 1.26442,
    lng: 103.82221,
    services: ['10', '30', '57', '61', '65', '80', '97', '100', '123', '131', '143', '145', '166', '855'],
  },
  {
    code: '14121',
    name: 'HarbourFront Stn/Vivocity',
    road: 'Telok Blangah Rd',
    lat: 1.26555,
    lng: 103.82115,
    services: ['10', '30', '57', '61', '65', '80', '97', '100', '123', '131', '143', '145', '166', '855'],
  },
  {
    code: '14119',
    name: 'Opp HarbourFront Int',
    road: 'Telok Blangah Rd',
    lat: 1.26712,
    lng: 103.81985,
    services: ['65', '93', '100', '123', '124', '131', '143', '145', '166'],
  },

  // --- JURONG EAST & CLEMENTI ---
  {
    code: '17009',
    name: 'Jurong East Int',
    road: 'Jurong Gateway Rd',
    lat: 1.33325,
    lng: 103.74238,
    services: ['41', '49', '51', '52', '66', '78', '79', '97', '98', '105', '143', '160', '183', '197', '333', '334', '335', '506'],
  },
  {
    code: '28009',
    name: 'Jurong East Stn/Westgate',
    road: 'Jurong Gateway Rd',
    lat: 1.33412,
    lng: 103.74315,
    services: ['51', '52', '66', '78', '79', '97', '105', '143', '183', '197', '333'],
  },
  {
    code: '17161',
    name: 'Opp IMM Bldg',
    road: 'Toh Guan Rd',
    lat: 1.33545,
    lng: 103.74682,
    services: ['52', '105', '183', '188', '333', '502'],
  },
  {
    code: '17171',
    name: 'Clementi Stn Exit A',
    road: 'Commonwealth Ave West',
    lat: 1.31525,
    lng: 103.76542,
    services: ['14', '52', '96', '99', '105', '106', '147', '156', '165', '166', '175', '196', '285'],
  },

  // --- BUONA VISTA & ONE-NORTH ---
  {
    code: '11111',
    name: 'Buona Vista Stn Exit C',
    road: 'North Buona Vista Rd',
    lat: 1.30725,
    lng: 103.79012,
    services: ['74', '91', '92', '95', '100', '105', '111', '147', '185', '191', '196', '198', '200'],
  },
  {
    code: '18141',
    name: 'Opp The Star Vista',
    road: 'Rochester Park',
    lat: 1.30612,
    lng: 103.78892,
    services: ['74', '91', '92', '95', '100', '105', '111', '147', '185', '191', '196', '198'],
  },

  // --- TAMPINES & BEDOK ---
  {
    code: '75009',
    name: 'Tampines Int',
    road: 'Tampines Central 1',
    lat: 1.35322,
    lng: 103.94528,
    services: ['3', '4', '8', '10', '19', '20', '23', '28', '29', '31', '37', '38', '65', '67', '68', '69', '72', '81', '291', '292', '293'],
  },
  {
    code: '76059',
    name: 'Tampines Stn/Int',
    road: 'Tampines Ave 4',
    lat: 1.35415,
    lng: 103.94392,
    services: ['3', '15', '21', '27', '168', '291', '293'],
  },
  {
    code: '84009',
    name: 'Bedok Int',
    road: 'Bedok North Ave 1',
    lat: 1.32415,
    lng: 103.92985,
    services: ['7', '9', '14', '16', '17', '18', '25', '26', '30', '32', '33', '35', '40', '60', '66', '69', '87', '168', '196', '197', '222', '225'],
  },

  // --- SERANGOON & BISHAN ---
  {
    code: '66009',
    name: 'Serangoon Int',
    road: 'Serangoon Ave 2',
    lat: 1.34963,
    lng: 103.87352,
    services: ['100', '101', '103', '105', '109', '158', '315', '317'],
  },
  {
    code: '66121',
    name: 'Opp Nex Mall',
    road: 'Serangoon Central',
    lat: 1.35082,
    lng: 103.87245,
    services: ['22', '43', '53', '70', '81', '82', '147', '153', '315'],
  },
  {
    code: '53009',
    name: 'Bishan Int',
    road: 'Bishan St 13',
    lat: 1.35012,
    lng: 103.84915,
    services: ['50', '52', '53', '54', '55', '56', '57', '58', '59', '410G', '410W'],
  },

  // --- WOODLANDS & NORTH ---
  {
    code: '46009',
    name: 'Woodlands Temp Int',
    road: 'Woodlands Sq',
    lat: 1.43612,
    lng: 103.78652,
    services: ['161', '168', '169', '178', '187', '856', '858', '900', '901', '902', '903', '904', '911', '912', '913', '925', '960', '961', '962', '963', '964', '965', '966', '969'],
  },
  {
    code: '46261',
    name: 'Opp Causeway Point',
    road: 'Woodlands Ave 2',
    lat: 1.43485,
    lng: 103.78562,
    services: ['161', '168', '900', '901', '912', '960', '969'],
  },
];

// Service operator mappings
export const SERVICE_METADATA: Record<
  string,
  {
    operator: BusOperator;
    destination: string;
    destinationCode: string;
    category: 'Trunk' | 'Feeder' | 'Express' | 'Night';
  }
> = {
  '2': { operator: 'GAS', destination: 'Kampong Bahru Ter', destinationCode: '10049', category: 'Trunk' },
  '7': { operator: 'SBST', destination: 'Clementi Int', destinationCode: '17171', category: 'Trunk' },
  '10': { operator: 'SBST', destination: 'Kent Ridge Ter', destinationCode: '16009', category: 'Trunk' },
  '12': { operator: 'GAS', destination: 'Kampong Bahru Ter', destinationCode: '10049', category: 'Trunk' },
  '14': { operator: 'SBST', destination: 'Clementi Int', destinationCode: '17171', category: 'Trunk' },
  '16': { operator: 'SBST', destination: 'Bukit Merah Int', destinationCode: '10009', category: 'Trunk' },
  '32': { operator: 'SBST', destination: 'Buona Vista Ter', destinationCode: '11389', category: 'Trunk' },
  '33': { operator: 'SBST', destination: 'Kent Ridge Ter', destinationCode: '16009', category: 'Trunk' },
  '36': { operator: 'GAS', destination: 'Changi Airport PTB2', destinationCode: '95129', category: 'Express' },
  '51': { operator: 'SBST', destination: 'Jurong East Int', destinationCode: '17009', category: 'Trunk' },
  '65': { operator: 'SBST', destination: 'HarbourFront Int', destinationCode: '14119', category: 'Trunk' },
  '77': { operator: 'TTS', destination: 'Marina Ctr Ter', destinationCode: '02099', category: 'Trunk' },
  '97': { operator: 'TTS', destination: 'Jurong East Int', destinationCode: '17009', category: 'Trunk' },
  '100': { operator: 'SBST', destination: 'Ghim Moh Ter', destinationCode: '11009', category: 'Trunk' },
  '106': { operator: 'TTS', destination: 'Shenton Way Ter', destinationCode: '03239', category: 'Trunk' },
  '111': { operator: 'SBST', destination: 'Ghim Moh Ter', destinationCode: '11009', category: 'Trunk' },
  '123': { operator: 'SBST', destination: 'HarbourFront Int', destinationCode: '14119', category: 'Trunk' },
  '124': { operator: 'SBST', destination: 'Telok Blangah Heights', destinationCode: '14381', category: 'Trunk' },
  '130': { operator: 'SBST', destination: 'Shenton Way Ter', destinationCode: '03239', category: 'Trunk' },
  '131': { operator: 'SBST', destination: 'Bukit Merah Int', destinationCode: '10009', category: 'Trunk' },
  '133': { operator: 'SBST', destination: 'Shenton Way Ter', destinationCode: '03239', category: 'Trunk' },
  '143': { operator: 'TTS', destination: 'Toa Payoh Int', destinationCode: '52009', category: 'Trunk' },
  '145': { operator: 'SBST', destination: 'Buona Vista Ter', destinationCode: '11389', category: 'Trunk' },
  '147': { operator: 'SBST', destination: 'Jurong East Int', destinationCode: '17009', category: 'Trunk' },
  '166': { operator: 'SBST', destination: 'Clementi Int', destinationCode: '17171', category: 'Trunk' },
  '167': { operator: 'TTS', destination: 'Bukit Merah Int', destinationCode: '10009', category: 'Trunk' },
  '170': { operator: 'SBST', destination: 'Larkin Bus Ter (JB)', destinationCode: '46008', category: 'Trunk' },
  '174': { operator: 'SBST', destination: 'New Bridge Rd Ter', destinationCode: '05019', category: 'Trunk' },
  '175': { operator: 'SBST', destination: 'Clementi Int', destinationCode: '17171', category: 'Trunk' },
  '190': { operator: 'SMRT', destination: 'Chua Chu Kang Int', destinationCode: '44009', category: 'Trunk' },
  '197': { operator: 'SBST', destination: 'Jurong East Int', destinationCode: '17009', category: 'Trunk' },
  '502': { operator: 'SBST', destination: 'Soon Lee Depot', destinationCode: '22009', category: 'Express' },
  '518': { operator: 'GAS', destination: 'Pasir Ris Int', destinationCode: '77009', category: 'Express' },
  '851': { operator: 'SMRT', destination: 'Bukit Merah Int', destinationCode: '10009', category: 'Trunk' },
  '857': { operator: 'TTS', destination: 'Yishun Int', destinationCode: '59009', category: 'Trunk' },
  '960': { operator: 'SMRT', destination: 'Woodlands Temp Int', destinationCode: '46009', category: 'Trunk' },
  '972': { operator: 'SMRT', destination: 'Bukit Panjang Int', destinationCode: '44008', category: 'Trunk' },
};

// Realistic bus route definitions for key services
export const BUS_ROUTES: Record<string, BusRoute> = {
  '190': {
    serviceNo: '190',
    direction: 1,
    origin: 'Kampong Bahru Ter',
    destination: 'Chua Chu Kang Int',
    operatingHours: {
      firstBus: '05:30',
      lastBus: '23:45',
      freqPeak: '3 - 6 mins',
      freqOffPeak: '7 - 12 mins',
    },
    stops: [
      { seq: 1, stopCode: '05013', stopName: 'Chinatown Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 0.0 },
      { seq: 2, stopCode: '04111', stopName: 'Opp The Treasury', roadName: 'High St', distanceKm: 1.2 },
      { seq: 3, stopCode: '04121', stopName: 'Bras Basah Cplx', roadName: 'Victoria St', distanceKm: 2.1 },
      { seq: 4, stopCode: '01012', stopName: 'Bugis Stn Exit A', roadName: 'Victoria St', distanceKm: 2.8, isCurrentStop: true },
      { seq: 5, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Orchard Rd', distanceKm: 4.0 },
      { seq: 6, stopCode: '08138', stopName: 'Somerset Stn', roadName: 'Somerset Rd', distanceKm: 5.2 },
      { seq: 7, stopCode: '09048', stopName: 'Orchard Stn / Tangs', roadName: 'Orchard Rd', distanceKm: 6.4, hasActiveBus: true },
      { seq: 8, stopCode: '44009', stopName: 'Chua Chu Kang Int', roadName: 'Choa Chu Kang Loop', distanceKm: 21.5 },
    ],
  },
  '147': {
    serviceNo: '147',
    direction: 1,
    origin: 'Hougang Central Int',
    destination: 'Jurong East Int',
    operatingHours: {
      firstBus: '05:40',
      lastBus: '23:30',
      freqPeak: '5 - 8 mins',
      freqOffPeak: '8 - 14 mins',
    },
    stops: [
      { seq: 1, stopCode: '66121', stopName: 'Opp Nex Mall', roadName: 'Serangoon Central', distanceKm: 4.2 },
      { seq: 2, stopCode: '07011', stopName: 'Peace Ctr', roadName: 'Selegie Rd', distanceKm: 8.5 },
      { seq: 3, stopCode: '01012', stopName: 'Bugis Stn Exit A', roadName: 'Victoria St', distanceKm: 9.8, isCurrentStop: true },
      { seq: 4, stopCode: '04111', stopName: 'Opp The Treasury', roadName: 'High St', distanceKm: 11.0 },
      { seq: 5, stopCode: '05013', stopName: 'Chinatown Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 12.4, hasActiveBus: true },
      { seq: 6, stopCode: '11111', stopName: 'Buona Vista Stn Exit C', roadName: 'North Buona Vista Rd', distanceKm: 18.2 },
      { seq: 7, stopCode: '17171', stopName: 'Clementi Stn Exit A', roadName: 'Commonwealth Ave West', distanceKm: 21.4 },
      { seq: 8, stopCode: '17009', stopName: 'Jurong East Int', roadName: 'Jurong Gateway Rd', distanceKm: 25.8 },
    ],
  },
  '65': {
    serviceNo: '65',
    direction: 1,
    origin: 'Tampines Int',
    destination: 'HarbourFront Int',
    operatingHours: {
      firstBus: '05:30',
      lastBus: '23:30',
      freqPeak: '4 - 7 mins',
      freqOffPeak: '8 - 12 mins',
    },
    stops: [
      { seq: 1, stopCode: '75009', stopName: 'Tampines Int', roadName: 'Tampines Central 1', distanceKm: 0.0 },
      { seq: 2, stopCode: '07021', stopName: 'Sch of the Arts (SOTA)', roadName: 'Prinsep St', distanceKm: 14.2 },
      { seq: 3, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Orchard Rd', distanceKm: 15.1 },
      { seq: 4, stopCode: '08138', stopName: 'Somerset Stn', roadName: 'Somerset Rd', distanceKm: 16.3, hasActiveBus: true },
      { seq: 5, stopCode: '09047', stopName: 'Opp Orchard Stn / ION', roadName: 'Orchard Blvd', distanceKm: 17.5 },
      { seq: 6, stopCode: '14141', stopName: 'VivoCity', roadName: 'Telok Blangah Rd', distanceKm: 24.1 },
      { seq: 7, stopCode: '14119', stopName: 'Opp HarbourFront Int', roadName: 'Telok Blangah Rd', distanceKm: 25.2 },
    ],
  },
};

/**
 * Generates realistic LTA DataMall arrival records for a given stop code.
 * Seeds base values stably based on stopCode + serviceNo so countdowns count down smoothly,
 * while allowing slight traffic jitter.
 */
export function getSimulatedArrivals(stopCode: string, referenceTime: number = Date.now()): BusServiceArrival[] {
  const stop = SINGAPORE_BUS_STOPS.find((s) => s.code === stopCode);
  if (!stop) return [];

  const stringHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const loads: BusLoad[] = ['SEA', 'SDA', 'LSD'];
  const types: BusType[] = ['DD', 'SD', 'DD', 'BD'];

  return stop.services.map((serviceNo) => {
    const meta = SERVICE_METADATA[serviceNo] || {
      operator: 'SBST' as BusOperator,
      destination: 'Terminal Loop',
      destinationCode: '00000',
      category: 'Trunk' as const,
    };

    const hash = stringHash(`${stopCode}-${serviceNo}`);
    
    // Cycle duration between 6 and 14 minutes (360s to 840s)
    const headwaySeconds = 360 + (hash % 480);
    
    // Time offset in current cycle
    const cycleOffset = (Math.floor(referenceTime / 1000) + (hash % 1000)) % headwaySeconds;
    const bus1WaitSec = Math.max(0, headwaySeconds - cycleOffset);

    // Second bus arrives headwaySeconds later with small variation
    const bus2WaitSec = bus1WaitSec + headwaySeconds + ((hash >> 2) % 120);

    // Third bus arrives 2 * headwaySeconds later
    const bus3WaitSec = bus2WaitSec + headwaySeconds + ((hash >> 4) % 150);

    const makeArrival = (secondsRemaining: number, busIndex: number) => {
      const busSeed = (hash + busIndex * 71) % 100;
      
      // Load logic: peak hours or popular services have SDA/LSD
      const loadIndex = busSeed < 55 ? 0 : busSeed < 85 ? 1 : 2;
      const load = loads[loadIndex];
      
      // Type: High-capacity trunk routes often get Double Deckers (DD)
      const typeIndex = ['190', '147', '65', '14', '960', '168'].includes(serviceNo)
        ? (busSeed < 70 ? 0 : 1) // Mostly DD
        : (busSeed % 4);
      const busType = types[typeIndex] || 'SD';

      // Most Singapore buses are WAB
      const feature: BusFeature = busSeed < 96 ? 'WAB' : '';

      // Format time
      let formattedTime = '';
      if (secondsRemaining <= 45) {
        formattedTime = 'Arr';
      } else if (secondsRemaining < 60) {
        formattedTime = '1m';
      } else {
        const mins = Math.round(secondsRemaining / 60);
        formattedTime = `${mins}m`;
      }

      // Plate number generator (e.g., SBS6821J, SG5930D, SMB3011B)
      const prefixes = meta.operator === 'SBST' ? ['SBS', 'SG'] : meta.operator === 'SMRT' ? ['SMB', 'SG'] : ['SG'];
      const prefix = prefixes[busSeed % prefixes.length];
      const num = 1000 + ((hash * 13 + busIndex * 97) % 8999);
      const letter = String.fromCharCode(65 + ((hash + busIndex) % 26));
      const plateNumber = `${prefix}${num}${letter}`;

      return {
        estimatedArrival: new Date(referenceTime + secondsRemaining * 1000).toISOString(),
        secondsRemaining,
        formattedTime,
        load,
        type: busType,
        feature,
        plateNumber,
        distanceMeters: Math.max(50, Math.round(secondsRemaining * 6.5)), // approx bus speed ~ 23 km/h
      };
    };

    return {
      serviceNo,
      operator: meta.operator,
      destinationCode: meta.destinationCode,
      destinationName: meta.destination,
      category: meta.category,
      nextBus: makeArrival(bus1WaitSec, 1),
      nextBus2: makeArrival(bus2WaitSec, 2),
      nextBus3: makeArrival(bus3WaitSec, 3),
    };
  });
}
