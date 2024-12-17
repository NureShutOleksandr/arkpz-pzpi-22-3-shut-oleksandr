#include "NetworkSetup.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "ServerRequest.h"

const String serverUrl = "https://rnzte-91-233-49-148.a.free.pinggy.link/api/rooms/update";

// Initializes serial communication and sets up the Wi-Fi connection
void setup() {
    Serial.begin(9600);
    setupWiFiConnection();
    delay(2000);
}

// Checks Wi-Fi connection and sends a POST request if connected
void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        sendPostRequest(serverUrl);
    } else if (WiFi.status() != WL_CONNECTED){
        Serial.println("Not Wi-Fi connection!");
    }

    delay(5000);
}