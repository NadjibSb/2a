// DEPENDENCIES
var log = require( "/utility/logger" )( {
		tag: 'agencies_service',
		hideLog: false
	} ),
	httpClient = require( "/utility/httpManager" );

var apiURL = Alloy.Globals.API_URL;




// PUBLIC INTERFACE
var $ = module.exports = {
	getAgencyDetails: getAgencyDetails,
    getAgenciesPerPage: getAgenciesPerPage,
    getAgencies: getAgencies,
};

function getAgencyDetails(id,successCallback, errorCallback){
    var args = {
        url: apiURL + "/agency/detail/"+id,
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

function getAgenciesPerPage(page=1,successCallback,errorCallback){
    var args = {
        url: apiURL + "/agency/"+page,
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
function getAgencies(successCallback,errorCallback){
    var args = {
        url: apiURL + "/agency/",
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
