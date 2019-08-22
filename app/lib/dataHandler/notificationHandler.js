// DEPENDENCIES
const navmanager = require("/utility/navmanager");
var log = require( "/utility/logger" )( {
		tag: 'Notif_Handler',
		hideLog: false
	} ),
httpClient = require( "/utility/httpManager" );

// PUBLIC INTERFACE
var $ = module.exports = {
  getExperation :getExperation
  };

  // PRIVATE VARIABLES
const apiUrl = Alloy.Globals.apiUrl ;


// PRIVATE FONCTIONS
function getExperation(header,succes, error ) {
    console.log("debut getExpiration");
      var args = {
          method: "GET",
          url: apiUrl + "notification/options",
          header : header,
          ignoreAlert : true,
      };
      httpClient.request( args, succes, error );
  }