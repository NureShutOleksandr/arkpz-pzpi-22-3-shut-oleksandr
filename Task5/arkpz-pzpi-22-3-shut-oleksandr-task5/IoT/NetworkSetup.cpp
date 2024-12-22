#include "NetworkSetup.h"

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASSWORD = "";

// Function to initialize and establish a WiFi connection using predefined credentials
// Continuously attempts to connect until successful and logs the status to the Serial Monitor
void setupWiFiConnection() {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}
