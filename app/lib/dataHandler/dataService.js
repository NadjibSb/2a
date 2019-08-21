// DEPENDENCIES
var log = require( "/utility/logger" )( {
		tag: 'data_service',
		hideLog: false
	} ),
	httpClient = require( "/utility/httpManager" );

var apiURL = Alloy.Globals.API_URL;


// PUBLIC INTERFACE
var $ = module.exports = {
	getAgencyDetails: getAgencyDetails,
    getAgencies: getAgencies,
    getContracts: getContracts,
    getNotifications:getNotifications,
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

function getNotifications(successCallback,errorCallback){

    var args = {
        url: apiURL + "/notification",
        method:'GET',
        //fullResponse:true,
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
