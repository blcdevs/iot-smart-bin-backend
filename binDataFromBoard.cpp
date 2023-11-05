#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverAddress = "https://iot-smart-bin.onrender.com/api/smartbin/:id";
const String id = "64a9a7d7fbde3940ba8f132f";

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
