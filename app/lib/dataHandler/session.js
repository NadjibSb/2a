

// DEPENDENCIES
const navmanager = require("/utility/navmanager");
var log = require( "/utility/logger" )( {
		tag: 'Session_Handler',
		hideLog: false
	} ),
httpClient = require( "/utility/httpManager" );
const AppSession = require('/utility/AppSession');
const appSession = AppSession.AppSession()
const timeSession = 999918000000 // 30minute

// PUBLIC INTERFACE
var $ = module.exports = {
  login: login,
  isLogedIn : isLogedIn,
  resetPassword : resetPassword,
  signup : signup,
  deleteUserData :deleteUserData
};



// PRIVATE VARIABLES
const SESSION_ID = "SESSION_ID";
const apiUrl = "http://abc.dzmob.com/api/";
var sessionId = Ti.App.Properties.getString( SESSION_ID, null );



// PRIVATE FONCTIONS

function login( params, error ) {
  console.log("debut fct login");
	var args = {
		method: "POST",
		url: apiUrl + "login",
		params: params,
		ignoreAlert : true,
	};
	httpClient.request( args, onSuccessLogin, error );
}

function isLogedIn(){
  return sessionId != null;
}
// if the login is succes
function onSuccessLogin(e){
  console.log("debut on succes");
  startSession(e)
  //navmanager.setTabGroup("tabs/index");
  navmanager.openWindow("Home/index",0,{});
}

//session with time
function startSession(e){
	log("start session")
	var timeOut = e.TTL*60*1000
	appSession.setTimeoutMs(timeOut);
	//ajouter les donner de user a la fonction
	setInterval(()=>{
		log(appSession.isLive() ? "liveSessionText" : "deadSessionText");
	},100000)

	appSession.startNewSession(e)
}
//reset Password
function resetPassword( params, success, error ) {
	var args = {
		method: "POST",
		url: apiUrl + "",
		params: params,
		ignoreAlert : true,
	};
	httpClient.request( args, success, error );
}

//Register
function signup( params, error ) {
	var args = {
		method: "POST",
		url: apiUrl + "register",
		params: params,
		ignoreAlert : true,

	};
	httpClient.request( args, onSuccessLogin, error );
}

// en cas de logout delete user data
function deleteUserData(){
	appSession.endSession()
}
