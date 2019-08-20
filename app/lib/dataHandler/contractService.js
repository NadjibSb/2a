// DEPENDENCIES
var log = require( "/utility/logger" )( {
		tag: 'Contract_service',
		hideLog: false
	} ),
	httpClient = require( "/utility/httpManager" );

// GLOBALE VAR
var apiURL = Alloy.Globals.API_URL;


// PUBLIC INTERFACE
var $ = module.exports = {
	getContracts: getContracts
};

function getContracts(successCallback,errorCallback){

    var args = {
        url: apiURL + "/contracts",
        method:'GET',
        header: Alloy.Globals.header
    }
    httpClient.request(args,
        (response)=>{
            _.isFunction( successCallback ) && successCallback( response );
        },
        (response)=>{
            _.isFunction( errorCallback ) && errorCallback( response );
        }
    );
}
