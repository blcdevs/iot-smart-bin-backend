# Smart Bin API Documentation
**Demo Link Endpoint**: https://iot-smart-bin.onrender.com/

Welcome to the Smart Bin API documentation! This API allows you to manage smart bins, including creating, updating, deleting, and retrieving smart bin information. It also provides an endpoint to receive data from Arduino and store it in the database.

## Base URL

The base URL for all API endpoints is: `https://iot-smart-bin.onrender.com/api/`

## Authentication

Authentication is required to access certain endpoints. You will need to include a valid JWT token in the `Authorization` header of your requests.

## Endpoints

### Receive Data from Arduino and Create a New Smart Bin Into the API

**Main Endpoint**: ` https://iot-smart-bin.onrender.com/api` 

**Get All Bin Endpoint**: `GET /smartbin` e.g, https://iot-smart-bin.onrender.com/api/smartbin

**Get Single Bin Endpoint**: `GET /smartbin/:id` e.g, https://iot-smart-bin.onrender.com/api/smartbin/:id is the ID of the smart bin you want to fetch.

**Endpoint**: `POST /smartbin/receive`, https://iot-smart-bin.onrender.com/api/smartbin/receive

**Update Bin Data Endpoint**: `PUT /smartbin/:id`, https://iot-smart-bin.onrender.com/api/smartbin/:id


Update data from IoT Board and update a new smart bin based on the received data. Provide the following parameters in the request body:

```json
{
  "binId": "bin1",
  "binLevel": 75,
  "binOrientation": "upright",
  "binLocation": "Kitchen",
  "binName": "Kitchen Bin"
}
```


## Sample Codes For Updating Data From Board To DB:

**Link To Code** https://github.com/blcdevs/smart-iot-bin/blob/main/binDataFromBoard.cpp

```
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverAddress = "https://iot-smart-bin.onrender.com/api/smartbin/:id";
const String id = "64a9a7d7fbde3940ba8f132f"; //This is id 1 of the bin, to update others, you'll need to change the id characters

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi!");

  // Update the bin data
  updateBinData();
}

void loop() {
  // Perform other tasks or delay as needed
}

void updateBinData() {
  // Create the JSON payload with updated bin data
  String payload = "{";
  payload += "\"binLevel\": 80,";
  payload += "\"binOrientation\": \"upright\",";
  payload += "\"binLocation\": \"Kitchen\",";
  payload += "\"binName\": \"Kitchen Bin\"";
  payload += "}";

  // Create the HTTP client object
  HTTPClient http;

  // Make a PUT request to update the smart bin
  String url = serverAddress;
  url.replace(":id", binId);
  http.begin(url);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.PUT(payload);

  if (httpResponseCode == 200) {
    Serial.println("Smart bin updated successfully!");
  } else {
    Serial.print("Error updating smart bin. Error code: ");
    Serial.println(httpResponseCode);
  }

  // Cleanup
  http.end();
}


```