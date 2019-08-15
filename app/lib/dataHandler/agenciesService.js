// DEPENDENCIES
var log = require( "/utility/logger" )( {
		tag: 'agencies_service',
		hideLog: false
	} ),
	httpClient = require( "/utility/httpManager" );




// PUBLIC INTERFACE
var $ = module.exports = {
	getAgencyDetails: getAgencyDetails,
    getAgencies: getAgencies
};

function getAgencyDetails(id,successCallback, errorCallback){
    var args = {
        url: "http://abc.dzmob.com/api/agency/detail/"+id,
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

function getAgencies(page=1,successCallback,errorCallback){
    var args = {
        url: "http://abc.dzmob.com/api/agency/",
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
function getAgenciesPerPage(successCallback,errorCallback){
    var args = {
        url: "http://abc.dzmob.com/api/agency/",
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
