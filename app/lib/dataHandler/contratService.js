//Dependencies

var log = require( "/utility/logger" )( {
    tag: 'contractService',
    hideLog: false
} ),
httpClient = require( "/utility/httpManager" ),
alert = require("/utility/alertManager");
// variable
var apiURL = Alloy.Globals.API_URL;

//Public Interface
var $ = module.exports = {
    getContractDetail : getContractDetail,
    getPhoneNumber :getPhoneNumber
};

//function
function getContractDetail(id,header,succes,error){
    console.log("debut getContractDetail");
      var args = {
          method: "GET",
          url: apiURL + "/contracts/"+id,
          header : header,
          ignoreAlert : true,
      };
      httpClient.request( args, succes, error );
}

function getPhoneNumber(header,succes,error){
    log("debut getNumbers")
    var args = {
        method: "GET",
        url : apiURL+"/contact/assistance",
        header : header,
        ignoreAlert : true,
    }
    httpClient.request(args,succes,error)
    
}

function getUrl(header,succes,error){
    log("avoir pdf")
    var args = {
        method : "GET",
        url : apiURL+"",
        header : header,
    }
    httpClient.request(args,succes,error)
}
