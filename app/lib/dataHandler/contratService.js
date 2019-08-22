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
          url: apiURL + "/disasters/"+id,
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
