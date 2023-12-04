
# SessionJs
SessionJs is a simple authentication library designed for Node.js, offering easy-to-use session management functionalities. It provides a flexible and secure way to handle user sessions in your Node.js applications.

## Version
Current version: 1.2.1

## Author
Elias Dieter (EliJs)
## Usage
### Installation
```bash
npm install session-js
```
### Initialization
```javascript
import SessionJs from 'session-js';
// Initialize SessionJs with optional parameters
const sessionManager = new SessionJs(expireTime, sessionIdLength);
```
### Class Properties
sessions (Array): An array to store all active sessions.

expireTime (number|string): The time (in minutes) after which a session will expire, or "never" for no expiration. Default: 30 minutes.

sessionIdLength (number): The length of the session ID string. Default: 64.

### Methods
Returns an array of all active sessions.
```javascript
const allSessions = sessionManager.getSessions();
```

Destroys all active sessions.
```javascript
sessionManager.destroyAllSessions();
```

Sets the session expiration time.
```javascript
sessionManager.setExpireTime(expireTime);
```

Returns the session expiration time.

```javascript
const expirationTime = sessionManager.getExpireTime();
```

Sets the session ID length.
```javascript
sessionManager.setSessionIdLength(sessionIdLength);
```

Returns the session ID length.
```javascript
const idLength = sessionManager.getSessionIdLength();
```


Creates a new session ID.
```javascript
const newSessionId = sessionManager.createSession();
```

Starts a new session for a user.
```javascript
const user = { id: 1, username: 'example' };
const sessionId = sessionManager.startSession(user);
```

Destroys a session.
```javascript
const sessionId = 'exampleSessionId';
const sessionDestroyed = sessionManager.destroySession(sessionId);
```

Updates the expiration time of a session.
```javascript
const sessionId = 'exampleSessionId';
const sessionUpdated = sessionManager.updateSession(sessionId);
```

Checks if a session is valid (not expired).
```javascript
const sessionId = 'exampleSessionId';
const user = sessionManager.checkSession(sessionId);
```
Returns the user object if the session is valid, otherwise returns false.

Binds a user to a session.
```javascript
const sessionId = 'exampleSessionId';
const user = { id: 1, username: 'example' };
const session = sessionManager.bindUserToSession(sessionId, user);
```
Returns the session object.

Returns the user of a session.
```javascript
const sessionId = 'exampleSessionId';
const user = sessionManager.getUser(sessionId);
```
Returns the user object if the session exists, otherwise returns false.

License
This project is licensed under the MIT License.
