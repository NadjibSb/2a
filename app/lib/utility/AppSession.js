const navmanager = require("/utility/navmanager");
const SESSION_ID = "SESSION_ID";

exports.AppSession = function(args) {
	// +-----------------------+
	// | Private members.      |
	// +-----------------------+
	var args = args || {};
	// The TTL for a Session. A value of 0 means never timeout.
	var sessionTimeoutMs = 600000; // Default to 600000 ms (10 min)
	var sessionTimedOutCB = null;
	
	setTimeoutMs(args.timeoutMs);
	args.sessionTimedOutCB && (sessionTimedOutCB = args.sessionTimedOutCB);

	var lastAccessTime = null;
	var heartbeatTimer = null;
	var sessionInfo = null;

	// Determine if the Session can ever timeout.
	var usingTimeout = function() {
		return sessionTimeoutMs > 0;
	};
	
	// Remove the entry for the sessionInfo.
	var clearSessionInfo = function() {
		sessionInfo = null;
	};
	
	// Start the internal heartbeat thread (if timeout is enabled).
	var startHeartbeat = function() {
		if (usingTimeout()) {
			var mostFrequentPeriodMs = 15000;
			var heartbeatMs = Math.max(mostFrequentPeriodMs, sessionTimeoutMs/4);
			heartbeatTimer = setInterval(function() {
				if (!isSessionLive()) {
					// Session is dead, perform internal cleanup.
					endSession();
					sessionTimedOutCB && sessionTimedOutCB();
				}
			}, heartbeatMs);
		}
	};
	
	// Stop the internal life-check thread.
	var stopHeartbeat = function() {
		if (heartbeatTimer !== null) {
			clearInterval(heartbeatTimer);
			heartbeatTimer = null;
		}
	};
	
	
	// +-----------------------+
	// | Public members.       |
	// +-----------------------+
	// Touch the Session to indicate it is still active.
	var touchSession = function() {
		if (isSessionLive()) {
			lastAccessTime = new Date(); // now
		} else {
			Ti.API.info('TOUCH (dead Session)');
		}
	};
	
	// Get the sessionInfo for the Session.
	var getSessionInfo = function() {
		if (isSessionLive()) {
			touchSession();
		} else {
			endSession();
		}
		return sessionInfo;
	};
	
	// Set the Session timeout.
	function setTimeoutMs(_timeoutMs) {
		if (_timeoutMs && (_timeoutMs >= 0)) {
			sessionTimeoutMs = _timeoutMs;
		}
	};
	
	// Get the Session timeout.
	var getTimeoutMs = function() {
		return sessionTimeoutMs;
	};
	
	// Start a new Session.
	var startNewSession = function(_sessionInfo) {
		_sessionInfo && (sessionInfo = _sessionInfo);
		lastAccessTime = new Date(); // now
		startHeartbeat();
	};
	
	// Determine if the Session has expired since the last request.
	var isSessionLive = function() {
		if (lastAccessTime === null) {
			return false;
		}
		if (!usingTimeout()) {
			return true;
		}
		var now = new Date();
		return (now.getTime() - lastAccessTime.getTime() < sessionTimeoutMs);
	};
	
	// Remove all information related to the current Session.
	var endSession = function() {
		stopHeartbeat();
		lastAccessTime = null;
        clearSessionInfo();
        Ti.App.Properties.setString( SESSION_ID, null)
        navmanager.openAndCloseAll("Auth/login",0,{})
        navmanager.closetabGroup();
		Ti.API.info('Your Session has ended!');
	};
	
	
	// +-----------------------+
	// | Public API.           |
	// +-----------------------+
	return {
		getSessionInfo : getSessionInfo,
		setTimeoutMs : setTimeoutMs,
		getTimeoutMs : getTimeoutMs,
		startNewSession : startNewSession,
		touch : touchSession,
		isLive : isSessionLive,
		endSession : endSession
	};
};
