#ifndef SERVERREQUEST_H
#define SERVERREQUEST_H

#include <WiFi.h>
#include <HTTPClient.h>

void sendPostRequest(const String& serverUrl);

#endif
