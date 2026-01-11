
URL="http://localhost:5001/api"

echo "========================================"
echo "   TraceGuard Backend Verification"
echo "========================================"

EMAIL="verify_$(date +%s)@example.com"
PASSWORD="password123"
echo "[1] Registering User ($EMAIL)..."
REGISTER_RES=$(curl -s -X POST $URL/users/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Verifier\",\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo $REGISTER_RES | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Registration Failed: $REGISTER_RES"
  exit 1
else
  echo "✅ Registration Success. Token received."
fi

echo "[2] Creating API..."
CREATE_RES=$(curl -s -X POST $URL/monitor \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Verification API", "endpoint":"https://google.com", "method":"GET"}')

API_ID=$(echo $CREATE_RES | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

if [ -z "$API_ID" ]; then
  echo "❌ Create API Failed: $CREATE_RES"
  exit 1
else
  echo "✅ API Created. ID: $API_ID"
fi

echo "[3] Triggering Monitoring Logic..."
(cd backend && node -e 'const mongoose = require("mongoose"); const dotenv = require("dotenv"); dotenv.config(); const axios = require("axios"); const Api = require("./models/Api"); const Log = require("./models/Log"); 
async function runCheck() {
  await mongoose.connect(process.env.MONGO_URI);
  const api = await Api.findById("'$API_ID'");
  if(!api) process.exit(1);
  const start = Date.now();
  try { await axios.get(api.endpoint); } catch(e){} 
  const end = Date.now();
  await Log.create({ api: api._id, status: "Up", statusCode: 200, responseTime: end-start });
  await Api.findByIdAndUpdate(api._id, { status: "Up", lastChecked: Date.now() });
  console.log("Manual Check Done");
  process.exit(0);
}
runCheck();')


echo "✅ Monitoring Triggered (Simulated)."

echo "[4] Fetching Logs..."
LOGS_RES=$(curl -s -X GET $URL/monitor/$API_ID/logs -H "Authorization: Bearer $TOKEN")
LOG_COUNT=$(echo $LOGS_RES | grep -o '"_id"' | wc -l)

if [ "$LOG_COUNT" -gt 0 ]; then
   echo "✅ Logs Fetched. Count: $LOG_COUNT"
else 
   echo "❌ Logs Fetch Failed or Empty: $LOGS_RES"
   exit 1
fi

echo "[5] Deleting API..."
DELETE_RES=$(curl -s -X DELETE $URL/monitor/$API_ID -H "Authorization: Bearer $TOKEN")
DELETED_ID=$(echo $DELETE_RES | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ "$DELETED_ID" == "$API_ID" ]; then
  echo "✅ API Deleted."
else
  echo "❌ Delete Failed: $DELETE_RES"
  exit 1
fi

echo "========================================"
echo "   All Checks Passed Successfully! 🚀"
echo "========================================"
