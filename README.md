# SessionJs
SessionJs is a simple session library for Node.js that facilitates session management in your applications.

## Features:
- #### Session Management: Effortlessly handle user sessions in your Node.js projects.
- #### Configurable Settings: Tailor session expiration time and session ID length to meet the requirements of your application.
- #### Intuitive API: User-friendly API for initiating, terminating, and validating sessions.

## Installation
Install SessionJs using npm:

```bash
npm install sessionjs
```
## Usage
```javascript
// Import the SessionJs module
import SessionJs from 'sessionjs';

// Create a new instance of SessionJs
const session = new SessionJs();

// Start a new session for a user
let sessionId = session.start({username: 'testuser'});

// Check if a session is valid | if the validation is true, the expiry time of a session is renewed
let user = session.validate(sessionId);

// Renew the expiration time of a session
session.renew(sessionId);

// End a session
session.end(sessionId);
```

## API
### Constructor
The constructor takes two optional parameters: sessionExpiration and sessionIdLength. sessionExpiration is the time (in minutes) after which a session will expire, or "never" for no expiration. sessionIdLength is the length of the session ID string.

### Methods: 

- getAll(): Returns all active sessions.

- destroyAll(): Destroys all active sessions.

- setSessionExpiration(sessionExpiration): Sets the session expiration time.

- getSessionExpiration(): Returns the session expiration time.

- setSessionIdLength(sessionIdLength): Sets the session ID length.

- getSessionIdLength(): Returns the session ID length.

- start(user): Starts a new session for a user.

- end(sessionId): Ends a session.

- renew(sessionId): Renews the expiration time of a session.

- validate(sessionId): Checks if a session is valid (i.e., not expired). If the validation is true, the expiry time of a session is renewed

- getUser(sessionId): Returns the user of a session.
