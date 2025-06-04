# Angel Broking Live Market Data API

A Node.js application that fetches live market data from Angel Broking SmartAPI and stores it in MongoDB with real-time WebSocket updates.

## Features

- 🔐 Automatic authentication with Angel Broking SmartAPI
- 📊 Live market data fetching and storage
- 🗄️ MongoDB integration for data persistence
- 📡 Real-time WebSocket updates
- 🕐 Automatic data fetching during market hours
- 📈 Historical data tracking
- 🔄 Token refresh and error handling
- 📱 REST API endpoints for data access

## Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables in `.env`:
\`\`\`env
SMARTAPI_KEY=your_api_key_here
CLIENT_CODE=your_client_code_here
MPIN=your_mpin_here
TOTP_SECRET=your_totp_secret_here
MONGODB_URI=mongodb://localhost:27017/angelbroking
PORT=3001
\`\`\`

4. Start MongoDB service
5. Run the application:
\`\`\`bash
npm start
# or for development
npm run dev
\`\`\`

## API Endpoints

### Authentication
- `GET /api/auth/status` - Get authentication status
- `POST /api/auth/login` - Manual authentication

### Market Data
- `GET /api/market/data` - Get latest market data
- `POST /api/market/refresh` - Fetch fresh market data
- `GET /api/market/history/:token` - Get historical data for a token
- `GET /api/market/summary` - Get market summary

### Stocks
- `GET /api/stocks` - Get available stock configuration

## Usage Examples

### Using the REST API Client

\`\`\`javascript
const AngelBrokingClient = require('./client.js')

const client = new AngelBrokingClient()

// Get latest market data
const data = await client.getMarketData('NSE')
console.log(data)

// Get historical data
const history = await client.getHistoricalData('881', 24, 'NSE')
console.log(history)
\`\`\`

### Using WebSocket Client

\`\`\`javascript
const MarketDataWebSocketClient = require('./websocket-client.js')

const wsClient = new MarketDataWebSocketClient()
await wsClient.connect()
wsClient.subscribe(['3045', '881', '99926004'])
\`\`\`

## Stock Configuration

The application tracks these stocks by default:

**NSE:**
- SBIN (3045)
- RELIANCE (881)
- INFY (99926004)
- TCS (2885)
- HDFCBANK (1333)
- ITC (17963)
- LT (11536)
- KOTAKBANK (1660)
- AXISBANK (288)
- MARUTI (5633)
- ICICIBANK (1594)
- BHARTIARTL (10999)
- BAJFINANCE (526)
- ASIANPAINT (16675)
- HDFC (1330)

**NFO:**
- NIFTY JUN FUT (58662)

## Database Schema

### MarketData Collection
\`\`\`javascript
{
  token: String,
  exchange: String,
  symbol: String,
  ltp: Number,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  avgPrice: Number,
  upperCircuit: Number,
  lowerCircuit: Number,
  change: Number,
  changePercent: Number,
  timestamp: Date,
  lastUpdated: Date
}
\`\`\`

### Auth Collection
\`\`\`javascript
{
  clientCode: String,
  jwtToken: String,
  refreshToken: String,
  feedToken: String,
  expiresAt: Date,
  isActive: Boolean,
  lastLogin: Date
}
\`\`\`

## Features

- **Auto-fetch**: Automatically fetches market data every 30 seconds during market hours
- **Error Handling**: Robust error handling with automatic token refresh
- **Real-time Updates**: WebSocket support for real-time data streaming
- **Data Persistence**: All market data is stored in MongoDB with timestamps
- **Market Hours**: Only fetches data during Indian market hours (9:15 AM - 3:30 PM, Mon-Fri)

## License

MIT License
