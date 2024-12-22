#include "ServerRequest.h"
#include <ArduinoJson.h>

#define WINDOW_SIZE 5


int temperatureReadings[WINDOW_SIZE];
int moistureReadings[WINDOW_SIZE];
int carbonDioxideReadings[WINDOW_SIZE];
int illuminationReadings[WINDOW_SIZE];


int currentIndex = 0;
bool windowFull = false;

// Calculates the moving average of the given readings array
// It updates the circular buffer with the new value and computes the average
float calculateMovingAverage(int readings[], int newValue) {
    readings[currentIndex] = newValue;
    currentIndex = (currentIndex + 1) % WINDOW_SIZE;

    if (!windowFull && currentIndex == 0) {
        windowFull = true;
    }

    int sum = 0;
    int count = windowFull ? WINDOW_SIZE : currentIndex;
    for (int i = 0; i < count; i++) {
        sum += readings[i];
    }
    return (float)sum / count;
}

// Sends a POST request with sensor data to the given server URL
// The data includes smoothed values for temperature, moisture, CO₂, and illumination
void sendPostRequest(const String& serverUrl) {
    HTTPClient http;

    http.begin(serverUrl);

    http.addHeader("Content-Type", "application/json");

    // Simulating sensor readings with random values
    int rawTemperature = random(15, 31);
    int rawMoisture = random(15, 81);
    int rawCarbonDioxide = random(200, 1201);
    int rawIllumination = random(100, 1001);

    // Calculating smoothed sensor data using a moving average
    float smoothedTemperature = calculateMovingAverage(temperatureReadings, rawTemperature);
    float smoothedMoisture = calculateMovingAverage(moistureReadings, rawMoisture);
    float smoothedCarbonDioxide = calculateMovingAverage(carbonDioxideReadings, rawCarbonDioxide);
    float smoothedIllumination = calculateMovingAverage(illuminationReadings, rawIllumination);

    StaticJsonDocument<200> doc;
    doc["id"] = "675ee19fa59bfe3ae8d8439b";
    doc["user"] = "675ee094a59bfe3ae8d84391";
    doc["temperature"] = smoothedTemperature;
    doc["moisture"] = smoothedMoisture;
    doc["carbonDioxide"] = smoothedCarbonDioxide;
    doc["illumination"] = smoothedIllumination;

    String payload;
    serializeJson(doc, payload);

    // Sending POST request and handling the response
    int httpCode = http.POST(payload);

    if (httpCode > 0) {
        String responsePayload = http.getString();  
        Serial.println("HTTP POST request successful!");
    } else {
        Serial.print("HTTP POST request failed with error code: ");
        Serial.println(httpCode);

        String errorBody = http.getString();
        if (errorBody.length() > 0) {
            Serial.println("Error body received:");
            Serial.println(errorBody);
        }

        // Handle different error codes
        switch(httpCode) {
            case -1:
                Serial.println("Error: Could not connect to the server.");
                break;
            case 0:
                Serial.println("Error: Timeout or no response from the server.");
                break;
            case 400:
                Serial.println("Error: Bad request. Check the JSON format or endpoint.");
                break;
            case 401:
                Serial.println("Error: Unauthorized. Check your API key or credentials.");
                break;
            case 500:
                Serial.println("Error: Internal server error. Try again later.");
                break;
            default:
                Serial.println("Error: Unexpected error occurred.");
                break;
        }
    }

    http.end();
}