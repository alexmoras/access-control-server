# Access Control Server

This is a basic server which acts as the backend for the ESP32 access control
system. The ESP32 makes a simple API call to this server which checks the
unique ID and returns whether access is authorised. It also returns whether
offline access is authorised for that user - if it is, this is written to the
card by the ESP32 and will allow access to the room even if the server is
offline.

## __Endpoints__
### POST: `/check`
The ESP32 sends a POST request via HTTPS to the server which authenticates
the client using the API key and verifies the card ID. The response states
whether the request was granted or denied, whilst logging this, and also
sends whether offline access is available for the card.  
#### Payload:
`client_id` - the client ID, used to identify the reader used.  
`client_secret` - the API key unique to the client, stored in database.  
`card_id` - card UID, this is a unique identifier stored on the card and
used to revoke lost cards, this is different to the Sector 0 ID.

___

### POST: `/log`
When the system is offline, the ESP32 will cache any entry requests and when
the server is available, send the payload to this endpoint. This allows full
logs even when the system is offline.  
#### Payload:
`client_id` - the client ID, used to identify the reader used.
`client_secret` - the API key unique to the client, stored in database.  
`card_id` - card UID, this is a unique identifier stored on the card and
used to revoke lost cards, this is different to the Sector 0 ID.  
`timestamp` - date and time the attempt was made.  
`access` - whether access was granted or denied (does the user have offline
permissions).

## Models
### User
Stores information related to the user. Not really used for much as OpenID
is used to authenticate, this just provides something to link the cards to.
#### Fields:
- Username - LDAP/OpenID value
- Cards - array of card objects

### Card
Each card has a unique ID generated within the system which is written to the
card and encrypted. This allows individual cards to be assigned to users and
revoked.
#### Fields:
- ID - unique identifier for the card
- Description - basic string used to describe the card

### Client
Contains some unique information about the client (card reader) which allows
for tracking in a multi-reader environment.
#### Fields:
- ID - unique identifier for the client (reader)
- Secret - the client secret, used to authorise the request
- Description - basic string used to describe the client, i.e. location

### Log
Every single action is stored in the log. This creates an entry for every
card read, the time this happened, whether there is a user, if the access was
granted, if the access was made offline, and finally, which reader sent the
request.
- ID - unique log entry identifier
- Card - the card ID that attempted access
- Client - the client ID that sent the request
- User - if a user is associated with the card
- Access - boolean value of whether access was granted or denied
- Access Type - boolean value of whether access was made online or offline
- Timestamp - the time and date the request was made  

_These fields are not keys. If we used keys here, when a card is deleted
the log entry would have a null field. As a result, the system resolves the
card details and stores each as a string for this table. It means we
duplicate a lot of information but means that the information is immutable._