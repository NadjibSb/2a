// DEPENDENCIES
var log = require( "/utility/logger" )( {
		tag: 'Session_Handler',
		hideLog: false
	} );

const navmanager = require("/utility/navmanager"),
    httpClient = require( "/utility/httpManager" ),
    properties = require("/dataHandler/properties"),
    AppSession = require('/utility/AppSession');

// VARIABLES
const appSession = AppSession.AppSession()
const timeSession = 999918000000 // 30minute


// PUBLIC INTERFACE
var $ = module.exports = {
  login: login,
  isLogedIn : isLogedIn,
  resetPassword : resetPassword,
  signup : signup,
  deleteUserData :deleteUserData,
  updateUserData : updateUserData,
  changePassword:changePassword,
  getHeader : getHeader
};



// PRIVATE VARIABLES
const apiUrl = Alloy.Globals.API_URL;
var sessionId = properties.getSessionID();



// PRIVATE FONCTIONS

function login( params, error ) {
    log("___login___");
	var args = {
		method: "POST",
		url: apiUrl + "/login",
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
  log("___onSuccessLogin___");
  startSession(e)
  //navmanager.setTabGroup("tabs/index");
  navmanager.openAndCloseAll("Home/index",0,{});

}

//session with time
function startSession(e){
	log("___startSession___")
	var timeOut = e.TTL*60*1000
	appSession.setTimeoutMs(timeOut);
	//ajouter les donner de user a la fonctio
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
		url: apiUrl + "/register",
		params: params,
		ignoreAlert : true,

	};
	httpClient.request( args, onSuccessLogin, error );
}

// en cas de logout delete user data
function deleteUserData(){
	appSession.endSession()
}

// update user
function updateUserData(params,header,succes,error){
	var args = {
		method: "POST",
		url: apiUrl + "/user/update",
		params: params,
		header : header,
		ignoreAlert : true,
	};
	httpClient.request(args,succes,error);
}

function changePassword(params,header,succes,error){
	var args = {
		method: "POST",
		url: apiUrl + "/user/update",
		params: params,
		header : header,
		ignoreAlert : true,
	};
	httpClient.request(args,succes,error);
}

function getHeader(){
	var header = {
		Authorization : "Bearer "+ properties.getSessionID()
	}
	return header
}
