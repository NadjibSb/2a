

// DEPENDENCIES
const navmanager = require("/utility/navmanager");
var log = require( "/utility/logger" )( {
		tag: 'Session_Handler',
		hideLog: false
	} ),
httpClient = require( "/utility/httpManager" );
const AppSession = require('/utility/AppSession');
const appSession = AppSession.AppSession()


// PUBLIC INTERFACE
var $ = module.exports = {
	login: login,
  isLogedIn : isLogedIn,
  resetPassword : resetPassword,
  signup : signup,
  deleteUserData :deleteUserData
};



// PRIVATE VARIABLES
const SESSION_DATA = "SESSION_DATA";
const SESSION_ID = "SESSION_ID";
const apiUrl = "http://abc.dzmob.com/api/";
var sessionId = Ti.App.Properties.getString( SESSION_ID, null );
var sessionData = Ti.App.Properties.getObject( SESSION_DATA, null );


// PRIVATE FONCTIONS

function login( params, error ) {
  console.log("debut fct login");
	var args = {
		method: "POST",
		url: apiUrl + "login",
		params: params
	};
	httpClient.request( args, onSuccessLogin, error );
}

function isLogedIn(){
  return sessionId != null;
}
// if the login is succes
function onSuccessLogin(e){
	startSession()
  console.log("debut on succes");
  log(e)
  saveSessionInfo(e);
  //navmanager.setTabGroup("tabs/index");
  navmanager.openWindow("Home/index",0,{});
}

//save the sessionInfo in device
function saveSessionInfo(e){

  log("save session info")
	sessionId = e.token;
  log(sessionId);
	Ti.App.Properties.setString( SESSION_ID, sessionId );
	//saveUserData( e.user );
}

// save the session Data
function saveUserData( data ) {
	sessionData = data;
	Ti.App.Properties.setObject( SESSION_DATA, sessionData );
}


//session with time
function startSession(){
	log("start session")
	appSession.setTimeoutMs(180000000000000);
	//ajouter les donner de user a la fonction
	setInterval(()=>{
		log(appSession.isLive() ? "liveSessionText" : "deadSessionText");
	},100000)
	
	appSession.startNewSession()
}

//reset Password
function resetPassword( params, success, error ) {
	var args = {
		method: "POST",
		url: apiUrl + "",
		params: params
	};
	httpClient.request( args, success, error );
}

//Register
function signup( params, error ) {
	var args = {
		method: "POST",
		url: apiUrl + "register",
		params: params
	};
	httpClient.request( args, onSuccessLogin, error );
}


function deleteUserData(){
	sessionId = null
	sessionData = null
	Ti.App.Properties.setString( SESSION_ID, null );
	Ti.App.Properties.setObject( SESSION_DATA, null );
	navmanager.openAndCloseTab("Auth/login")
}
