// DEPENDENCIES
var log = require( "/utility/logger" )( {
		tag: 'data_service',
		hideLog: false
	} ),
	httpClient = require( "/utility/httpManager" ),
    session = require("/dataHandler/session");

var apiURL = Alloy.Globals.API_URL;


// PUBLIC INTERFACE
var $ = module.exports = {
	getAgencyDetails: getAgencyDetails,
    getAgencies: getAgencies,
    getContracts: getContracts,
    getNotificationsPerPage: getNotificationsPerPage,
    getPhoneContact: getPhoneContact,
    getSinistresPerPage: getSinistresPerPage,
    getSinistreDetails: getSinistreDetails
};

function getAgencyDetails(id,successCallback, errorCallback){
    var args = {
        url: apiURL + "/agency/detail/"+id,
        method:'GET',
        header: session.getHeader()
    }
    httpClient.request(args,successCallback,errorCallback);
}

function getAgencies(successCallback,errorCallback){
    var args = {
        url: apiURL + "/agency/",
        method:'GET',
        header: session.getHeader()
    }
    httpClient.request(args,successCallback,errorCallback);
}

function getContracts(successCallback,errorCallback){

    var args = {
        url: apiURL + "/contracts",
        method:'GET',
        header: session.getHeader()
    }
    httpClient.request(args,successCallback,errorCallback);
}

function getNotificationsPerPage(page,successCallback,errorCallback){

    var args = {
        url: apiURL + "/notification/"+page,
        method:'GET',
        fullResponse:true,
        header: session.getHeader()
    }
    httpClient.request(args,
        (response)=>{
            try {
                response = JSON.parse(response);
            } catch (e) {
                log("JSON parse error");
            }
            _.isFunction( successCallback ) && successCallback( { total:response.total, list:response.data} );
        },
        errorCallback
    );
}
function getSinistresPerPage(page,successCallback,errorCallback){
    var args = {
        url: apiURL + "/disasters/open/"+page,
        method:'GET',
        header: session.getHeader()
    }
    httpClient.request(args,successCallback,errorCallback);
}

function getSinistreDetails(id,successCallback,errorCallback){
    var args = {
        url: apiURL + "/disasters/"+id,
        method:'GET',
        header: session.getHeader()
    }
    httpClient.request(args,successCallback,errorCallback);
}

function getPhoneContact(header,succes,error){
    const args = {
        method : "GET",
        url : apiURL+"/contact/numbers",
        header : header
    }
    httpClient.request(args,succes,error)
}
