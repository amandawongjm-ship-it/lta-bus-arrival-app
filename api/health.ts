import type { Request, Response } from 'express';

/**
 * Health check handler for LTA DataMall serverless connection
 * Works as both an Express route handler and a Serverless function (e.g. Vercel / Cloud Functions)
 */
export default async function handler(req: Request, res: Response) {
  const ltaKey = process.env.LTA_ACCOUNT_KEY || process.env.LTA_API_KEY || process.env.ACCOUNT_KEY;
  const isKeyConfigured = Boolean(ltaKey && ltaKey.trim().length > 0);

  return res.status(200).json({
    status: 'ok',
    service: 'SG Bus Arrival - LTA DataMall Proxy',
    timestamp: new Date().toISOString(),
    ltaKeyConfigured: isKeyConfigured,
    message: isKeyConfigured
      ? 'LTA Datamall AccountKey is configured and active.'
      : 'LTA_ACCOUNT_KEY is not configured. Add your key to .env or environment variables to pull live data from LTA DataMall.',
    endpoints: {
      busArrival: '/api/busarrival?BusStopCode=83139',
      busArrivalWithService: '/api/busarrival?BusStopCode=83139&ServiceNo=15',
    },
  });
}
