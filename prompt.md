# User Prompts Log

This document records the sequence of development prompts submitted during the creation and iteration of the SG Bus Arrival application.

---

### Prompt 1: Initial Frontend & Transit Architecture
```text
build a singapore based arrival app to track the real time of bus arrival time and display wait times for nearby stops using GPS location data.

build the front app first
```

**Implementation Highlights**:
- Developed real-time tri-bus arrival board (NextBus, NextBus2, NextBus3) matching Singapore LTA standards.
- Built second-by-second live countdown clock (`Arr`, `1m`, `4m`).
- Integrated browser Geolocation API with Haversine distance, walking time estimations, compass bearings, and 1-tap Singapore transit hub simulations.
- Added interactive SVG Radar Map, full bus route progression viewer, bookmarked stops, and transit audio chimes.

---

### Prompt 2: GitHub Repository Setup & Remote Push
```text
git push https://<GITHUB_PAT_TOKEN>@github.com/amandawongjm-ship-it/lta-bus-arrival-app.git
```

**Implementation Highlights**:
- Initialized local Git repository on branch `main`.
- Committed all application code, styles, and configuration.
- Pushed clean codebase to `amandawongjm-ship-it/lta-bus-arrival-app`.

---

### Prompt 3: LTA DataMall Serverless API Integration
```text
add a serverless connection that pulls live data from LTA Datamall using the following endpoints:
. store this in /api folder (project root level) not the src folder
. include /health.ts and /busarrival.ts within that subfolder
. do not hardcode any key, I will include them later

GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139
AccountKey: <LTA_ACCOUNT_KEY>
accept: application/json
```

**Implementation Highlights**:
- Created `/api/health.ts` for service health and `LTA_ACCOUNT_KEY` configuration status.
- Created `/api/busarrival.ts` proxying live LTA DataMall v3 BusArrival requests with query parameters `BusStopCode` and `ServiceNo`.
- Configured graceful fallback when the key is not yet set.
- Mounted `/api/*` endpoints in `server.ts` alongside Vite middleware.
- Updated `.env.example` to document `LTA_ACCOUNT_KEY`.

---

### Prompt 4: Prompts Documentation
```text
gather the prompts written and save in the prompt.md file
```

**Implementation Highlights**:
- Consolidated all session prompts and development milestones into `prompt.md`.
