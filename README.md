# modbus-tcp-websocket-bridge

Bridge a Modbus TCP server to WebSockets so browsers (or any WS client) can read registers without direct TCP access. The stack uses `oitc/modbus-server` for a test Modbus target and `novnc/websockify` to expose it over WebSockets. Client examples use `jsmodbus` + `websocket-stream`, and the web UI is built with Vite.

## What this repo contains

- `docker-compose.yml`: spins up the Modbus test server and the WebSocket bridge (`websockify`).
- `server_config.json`: Modbus server settings and initial register values.
- `nodeapp/`: minimal Node.js client showing how to read holding registers over the WS bridge.
- `webapp/`: Vite-based browser demo using the same libraries (with node polyfills).

## Prerequisites

- Docker + Docker Compose
- Node.js 18+ (for the sample client and Vite app)

## Quick start: Modbus over WebSocket

1. Start the services:

```
docker compose up -d
```

This starts the Modbus server on `modbus-server:502` and exposes it via WebSocket on `ws://localhost:8502`.

2. Verify with the Node example:

```
cd nodeapp
npm install
node index.js
```

You should see connection logs and the register values. Update the WebSocket URL in `nodeapp/index.js` if you run the bridge elsewhere.

## Web app (Vite demo)

```
cd webapp
npm install
npm run dev
```

Then open the printed dev URL (e.g., `http://localhost:5173`). The demo connects to `ws://localhost:8502` as written in `src/main.js`; change that endpoint if needed.

## Configuration

- Modbus server settings live in `server_config.json` and are mounted into the container.
- The WebSocket bridge arguments are defined in `docker-compose.yml` under the `websockify` service (`command: ["80", "modbus-server:502"]`).
