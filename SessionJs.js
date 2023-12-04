/**
 * SessionJs
 * @description A simple authentication library for Node.js
 * @version 1.0.0
 * @author Elias Dieter (EliJs)
 * @constructor
 * 
 * Initializes the session expiration time and the session ID length.
 * 
 * @property {Array} sessions - An array to store all active sessions.
 * @property {number|string} expireTime - The time (in minutes) after which a session will expire, or "never" for no expiration. | Default: 30 minutes
 * @property {number} sessionIdLength - The length of the session ID string. | Default: 64
 */
export default class SessionJs {
    /**
     * @constructor
     * @param {number|string} expireTime - The session expiration time in minutes or "never" for no expiration.
     * @param {number} sessionIdLength - The length of the session ID string.
     */
    constructor(expireTime = 30, sessionIdLength = 64) {
        this.sessions = [];
        this.expireTime = expireTime === "never" ? "never" : expireTime * 60 * 1000; // 30 minutes
        this.sessionIdLength = sessionIdLength;
    }

    /**
     * @method getSessions
     * @description Returns all active sessions.
     * @returns {Array} An array of all active sessions.
     */
    getSessions() {
        return this.sessions;
    }

    /**
     * @method destroyAllSessions
     * @description Destroys all active sessions.
     */
    destroyAllSessions() {
        this.sessions = [];
    }

    /**
     * @method setExpireTime
     * @description Sets the session expiration time.
     * @param {number|string} expireTime - The new expiration time (in milliseconds) or "never" for no expiration.
     */
    setExpireTime(expireTime) {
        this.expireTime = expireTime;
    }

    /**
     * @method getExpireTime
     * @description Returns the session expiration time.
     * @returns {number|string} The new expiration time (in milliseconds) or "never" for no expiration.
     */
    getExpireTime() {
        return this.expireTime;
    }

    /**
     * @method setSessionIdLength
     * @description Sets the session ID length.
     * @param {number} sessionIdLength - The new session ID length.
     */
    setSessionIdLength(sessionIdLength) {
        this.sessionIdLength = sessionIdLength;
    }

    /**
     * @method getSessionIdLength
     * @description Returns the session ID length.
     * @returns {number} The session ID length.
     */
    getSessionIdLength() {
        return this.sessionIdLength;
    }

    /**
     * @method createSession
     * @description Creates a new session ID.
     * @returns {string} The new session ID.
     */
    createSession() {
        let sessionId = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+.-[]{}|:<>?';
        for (let i = 0; i < this.sessionIdLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            sessionId += characters.charAt(randomIndex);
        }
        return sessionId;
    }

    /**
     * @method startSession
     * @description Starts a new session for a user.
     * @param {Object} user - The user for whom to start the session.
     * @returns {string} The session ID of the new session.
     */
    startSession(user) {
        let sessionId = this.createSession();
        while (this.sessions.includes(sessionId)) {
            sessionId = this.createSession();
        }
        this.sessions.push(this.bindUserToSession(sessionId, user));
        return sessionId;
    }

    /**
     * @method destroySession
     * @description Destroys a session.
     * @param {string} sessionId - The ID of the session to destroy.
     * @returns {boolean} True if the session was destroyed, false otherwise.
     */
    destroySession(sessionId) {
        let session = this.sessions.find(session => session.sessionId === sessionId);
        if (session) {
            this.sessions.splice(this.sessions.indexOf(session), 1);
            return true;
        }
        return false;
    }

    /**
     * @method updateSession
     * @description Updates the expiration time of a session.
     * @param {string} sessionId - The ID of the session to update.
     * @returns {boolean} True if the session was updated, false otherwise.
     */
    updateSession(sessionId) {
        let session = this.sessions.find(session => session.sessionId === sessionId);
        if (session) {
            session.expireTimestamp = new Date().getTime() + this.expireTime;
            return true;
        }
        return false;
    }

    /**
     * @method checkSession
     * @description Checks if a session is valid (i.e., not expired).
     * @param {string} sessionId - The ID of the session to check.
     * @returns {Object|boolean} The user of the session if the session is valid, false otherwise.
     */
    checkSession(sessionId) {
        let session = this.sessions.find(session => session.sessionId === sessionId);
        if (session) {
            if (this.expireTime === "never" || session.expireTimestamp > new Date().getTime()) {
                return session.user;
            }
        }
        return false;
    }

    /**
     * @method bindUserToSession
     * @description Binds a user to a session.
     * @param {string} sessionId - The ID of the session.
     * @param {Object} user - The user to bind to the session.
     * @returns {Object} The session.
     */
    bindUserToSession(sessionId, user) {
        let expireTimestamp = new Date().getTime() + this.expireTime;
        let session = {
            sessionId,
            expireTimestamp,
            user
        };
        return session;
    }

    /**
     * @method getUser
     * @description Returns the user of a session.
     * @param {string} sessionId - The ID of the session.
     * @returns {Object|boolean} The user of the session if the session exists, false otherwise.
     */
    getUser(sessionId) {
        let session = this.sessions.find(session => session.sessionId === sessionId);
        if (session) {
            return session.user;
        }
        return false;
    }
}
