const navmanager = require("/utility/navmanager");
var log = require( "/utility/logger" )( {
	tag: 'AppSession',
	hideLog: false
} ),
httpClient = require( "/utility/httpManager" );
const SESSION_DATA = "SESSION_DATA";
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
	var sessionId = null;

	// Determine if the Session can ever timeout.
	var usingTimeout = function() {
		return sessionTimeoutMs > 0;
	};
	
	// Remove the entry for the sessionInfo.
	var clearSessionInfo = function() {
		sessionInfo = null;
		sessionId = null;
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
		_sessionInfo && (sessionInfo = _sessionInfo.user) && (sessionId = _sessionInfo.token);
		lastAccessTime = new Date(); // now
		saveSessionInfo(_sessionInfo)
		startHeartbeat();
	};
	//save the sessionInfo in device
	function saveSessionInfo(e){
    	log("save session info")
		sessionId = e.token;
		Ti.App.Properties.setString( SESSION_ID, sessionId );
		saveUserData( e.user );
	}
	// save the session Data
	function saveUserData( data ) {
		log("saveuserData")
		sessionData = data;
		Ti.App.Properties.setObject( SESSION_DATA, sessionData );
		
		log(Ti.App.Properties.getString( SESSION_ID, null ))
		log(Ti.App.Properties.getObject( SESSION_DATA, null ))
	}
	
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
		Ti.App.Properties.setObject( SESSION_DATA, null )
		//navmanager.openAndCloseAll("Auth/login",0,{})
		navmanager.openAndCloseTab("Auth/login")
        //navmanager.closetabGroup();
		log('Your Session has ended!');
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
