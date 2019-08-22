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
    getContractDetail : getContractDetail
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
