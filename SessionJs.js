/**
 * SessionJs
 * @description A simple session library for Node.js
 * @version 1.2.1
 * @author Elias Dieter (EliJs)
 * @constructor
 * 
 * Initializes the session expiration time and the session ID length.
 * 
 * @property {Array} activeSessions - An array to store all active sessions.
 * @property {number|string} sessionExpiration - The time (in minutes) after which a session will expire, or "never" for no expiration. | Default: 30 minutes
 * @property {number} sessionIdLength - The length of the session ID string. | Default: 64
 */
export default class SessionJs {
    /**
     * @constructor
     * @param {number|string} sessionExpiration - The session expiration time in minutes or "never" for no expiration.
     * @param {number} sessionIdLength - The length of the session ID string.
     */
    constructor(sessionExpiration = 30, sessionIdLength = 64) {
        this.activeSessions = [];
        this.sessionExpiration = sessionExpiration === "never" ? "never" : sessionExpiration * 60 * 1000; // 30 minutes
        this.sessionIdLength = sessionIdLength;
    }

    /**
     * @method getActiveSessions
     * @description Returns all active sessions.
     * @returns {Array} An array of all active sessions.
     */
    getAll() {
        return this.activeSessions;
    }

    /**
     * @method destroyAllSessions
     * @description Destroys all active sessions.
     */
    destroyAll() {
        this.activeSessions = [];
    }

    /**
     * @method setSessionExpiration
     * @description Sets the session expiration time.
     * @param {number|string} sessionExpiration - The new expiration time (in milliseconds) or "never" for no expiration.
     */
    setSessionExpiration(sessionExpiration) {
        this.sessionExpiration = sessionExpiration;
    }

    /**
     * @method getSessionExpiration
     * @description Returns the session expiration time.
     * @returns {number|string} The new expiration time (in milliseconds) or "never" for no expiration.
     */
    getSessionExpiration() {
        return this.sessionExpiration;
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
     * @method generateSessionId
     * @description Generates a new session ID.
     * @returns {string} The new session ID.
     */
    generateId() {
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
    start(user) {
        let sessionId = this.generateId();
        while (this.activeSessions.includes(sessionId)) {
            sessionId = this.generateId();
        }
        this.activeSessions.push(this.bindUser(sessionId, user));
        return sessionId;
    }

    /**
     * @method endSession
     * @description Ends a session.
     * @param {string} sessionId - The ID of the session to end.
     * @returns {boolean} True if the session was ended, false otherwise.
     */
    end(sessionId) {
        let session = this.activeSessions.find(session => session.sessionId === sessionId);
        if (session) {
            this.activeSessions.splice(this.activeSessions.indexOf(session), 1);
            return true;
        }
        return false;
    }

    /**
     * @method renewSession
     * @description Renews the expiration time of a session.
     * @param {string} sessionId - The ID of the session to renew.
     * @returns {boolean} True if the session was renewed, false otherwise.
     */
    renew(sessionId) {
        let session = this.activeSessions.find(session => session.sessionId === sessionId);
        if (session) {
            session.expireTimestamp = new Date().getTime() + this.sessionExpiration;
            return true;
        }
        return false;
    }

    /**
     * @method validateSession
     * @description Checks if a session is valid (i.e., not expired).
     * @param {string} sessionId - The ID of the session to validate.
     * @returns {Object|boolean} The user of the session if the session is valid, false otherwise.
     */
    validate(sessionId) {
        let session = this.activeSessions.find(session => session.sessionId === sessionId);
        if (session) {
            if (this.sessionExpiration === "never" || session.expireTimestamp > new Date().getTime()) {
                this.renew(sessionId);
                return session.user;
            }
        }
        return false;
    }

    /**
     * @method bindUser
     * @description Binds a user to a session.
     * @param {string} sessionId - The ID of the session.
     * @param {Object} user - The user to bind to the session.
     * @returns {Object} The session.
     */
    bindUser(sessionId, user) {
        let expireTimestamp = new Date().getTime() + this.sessionExpiration;
        let session = {
            sessionId,
            expireTimestamp,
            user
        };
        return session;
    }

    /**
     * @method getUserFromSession
     * @description Returns the user of a session.
     * @param {string} sessionId - The ID of the session.
     * @returns {Object|boolean} The user of the session if the session exists, false otherwise.
     */
    getUser(sessionId) {
        let session = this.activeSessions.find(session => session.sessionId === sessionId);
        if (session) {
            return session.user;
        }
        return false;
    }
}
