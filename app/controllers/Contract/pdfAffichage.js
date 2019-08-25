// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//Dependencies
var log = require( 'utility/logger' )( {
    tag: "pdf_index",
    hideLog: false
} ),
navManager = require("/utility/navmanager"),
contractService = require("/dataHandler/contratService")
//variable
var url = "https://www.google.com"
const webView = $.webviewPdf

// function 
function pressBack(e){
    navManager.closeWindow($.pdfAffichage);
}
function setUrl(url){
    webView.url=url
}

function getUrlFromWebService(){
    contractService.getUrl(session.getHeader(),(res)=>{

    },(code,res)=>{

    })
}



// traintement
setUrl(url)