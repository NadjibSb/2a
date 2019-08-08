// DEPENDENCIES
var log = require( "/utility/logger" )( {
		tag: 'Session_Handler',
		hideLog: false
	} ),
	httpClient = require( "/utility/httpManager" );




// PUBLIC INTERFACE
var $ = module.exports = {
	login: login
};



// PRIVATE VARIABLES
const apiUrl = "http://passroad.dzmob.com/api/";


// PRIVATE FONCTIONS

function login( params,onSuccessLogin, error ) {
	var args = {
		method: "POST",
		url: apiUrl + "login",
		params: params
	};
	httpClient.request( args, onSuccessLogin, error );
}
