import type { Request, Response } from 'express';

const LTA_DATAMALL_URL = 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival';

/**
 * Serverless / Express handler for LTA DataMall v3 Bus Arrival API.
 * Query Parameters:
 *   - BusStopCode (string, e.g. "83139", "01012")
 *   - ServiceNo (optional string, e.g. "15", "190")
 */
export default async function handler(req: Request, res: Response) {
  // Support both uppercase and lowercase query parameter keys
  const busStopCode = (req.query.BusStopCode || req.query.busStopCode || req.query.busstopcode) as string | undefined;
  const serviceNo = (req.query.ServiceNo || req.query.serviceNo || req.query.serviceno) as string | undefined;

  if (!busStopCode || typeof busStopCode !== 'string' || busStopCode.trim().length === 0) {
    return res.status(400).json({
      error: 'Missing required query parameter: BusStopCode',
      example: '/api/busarrival?BusStopCode=83139',
    });
  }

  const cleanBusStopCode = busStopCode.trim();
  const cleanServiceNo = serviceNo ? serviceNo.trim() : null;

  // Retrieve LTA Account Key from environment variables (never hardcoded)
  const ltaAccountKey =
    process.env.LTA_ACCOUNT_KEY ||
    process.env.LTA_API_KEY ||
    process.env.ACCOUNT_KEY;

  if (!ltaAccountKey || ltaAccountKey.trim().length === 0) {
    // If user hasn't set their key yet, return a helpful notice along with structured fallback data
    return res.status(200).json({
      'odata.metadata': 'https://datamall2.mytransport.sg/ltaodataservice/v3/$metadata#BusArrival',
      BusStopCode: cleanBusStopCode,
      isLive: false,
      source: 'simulated_fallback',
      notice: 'LTA_ACCOUNT_KEY is not configured. Set LTA_ACCOUNT_KEY in your environment or .env file to enable live LTA DataMall queries.',
      Services: generateFallbackArrivals(cleanBusStopCode, cleanServiceNo),
    });
  }

  // Construct LTA DataMall v3 target URL
  const queryParams = new URLSearchParams();
  queryParams.set('BusStopCode', cleanBusStopCode);
  if (cleanServiceNo) {
    queryParams.set('ServiceNo', cleanServiceNo);
  }

  const targetUrl = `${LTA_DATAMALL_URL}?${queryParams.toString()}`;

  try {
    const ltaResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        AccountKey: ltaAccountKey.trim(),
        accept: 'application/json',
      },
    });

    if (!ltaResponse.ok) {
      const errorText = await ltaResponse.text();
      return res.status(ltaResponse.status).json({
        error: `LTA DataMall responded with HTTP status ${ltaResponse.status}`,
        details: errorText || ltaResponse.statusText,
        busStopCode: cleanBusStopCode,
        isLive: false,
      });
    }

    const data = await ltaResponse.json();

    // Set CORS and caching headers for high responsiveness
    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');
    return res.status(200).json({
      ...data,
      isLive: true,
      source: 'lta_datamall',
      fetchedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown network failure';
    return res.status(502).json({
      error: 'Failed to connect to LTA DataMall endpoint',
      message: errorMessage,
      busStopCode: cleanBusStopCode,
      isLive: false,
    });
  }
}

/**
 * Fallback generator providing standard LTA v3 structure when key is pending configuration
 */
function generateFallbackArrivals(busStopCode: string, requestedService: string | null) {
  const defaultServices = ['2', '12', '33', '147', '190'];
  const servicesToGenerate = requestedService ? [requestedService] : defaultServices;
  const now = Date.now();

  return servicesToGenerate.map((svc, i) => {
    const mins1 = (i * 3 + 2) % 11;
    const mins2 = mins1 + 8;
    const mins3 = mins2 + 10;

    return {
      ServiceNo: svc,
      Operator: svc === '190' ? 'SMRT' : svc === '2' || svc === '12' ? 'GAS' : 'SBST',
      NextBus: {
        OriginCode: '01012',
        DestinationCode: '75009',
        EstimatedArrival: new Date(now + mins1 * 60000).toISOString(),
        Latitude: '1.3005',
        Longitude: '103.8558',
        VisitNumber: '1',
        Load: (mins1 < 4 ? 'SEA' : mins1 < 8 ? 'SDA' : 'LSD') as 'SEA' | 'SDA' | 'LSD',
        Feature: 'WAB',
        Type: (i % 2 === 0 ? 'DD' : 'SD') as 'DD' | 'SD',
      },
      NextBus2: {
        OriginCode: '01012',
        DestinationCode: '75009',
        EstimatedArrival: new Date(now + mins2 * 60000).toISOString(),
        Latitude: '1.3015',
        Longitude: '103.8568',
        VisitNumber: '1',
        Load: 'SEA' as const,
        Feature: 'WAB',
        Type: 'DD' as const,
      },
      NextBus3: {
        OriginCode: '01012',
        DestinationCode: '75009',
        EstimatedArrival: new Date(now + mins3 * 60000).toISOString(),
        Latitude: '1.3025',
        Longitude: '103.8578',
        VisitNumber: '1',
        Load: 'SEA' as const,
        Feature: 'WAB',
        Type: 'SD' as const,
      },
    };
  });
}
