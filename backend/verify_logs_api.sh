TOKEN=$(curl -s -X POST http://localhost:5001/api/users/login -H "Content-Type: application/json" -d '{"email":"demo@example.com","password":"demo123"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)
API_ID=$(curl -s -X GET http://localhost:5001/api/monitor -H "Authorization: Bearer $TOKEN" | grep -o '"_id":"[^"]*' | head -1 | cut -d'"' -f4)

echo "Token: $TOKEN"
echo "API ID: $API_ID"

if [ -z "$API_ID" ]; then
    echo "No API found. Creating one..."
    curl -s -X POST http://localhost:5001/api/monitor \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"name":"Temp API","endpoint":"https://google.com","method":"GET"}'
    
    API_ID=$(curl -s -X GET http://localhost:5001/api/monitor -H "Authorization: Bearer $TOKEN" | grep -o '"_id":"[^"]*' | head -1 | cut -d'"' -f4)
    echo "New API ID: $API_ID"
fi

echo "Fetching logs..."
curl -s -X GET http://localhost:5001/api/monitor/$API_ID/logs -H "Authorization: Bearer $TOKEN" | head -c 500
echo "..."
