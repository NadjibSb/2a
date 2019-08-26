// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//
var log = require( 'utility/logger' )( {
    tag: "devisDetailScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");

//function

function pressBack(e){
    log("test press")
    navManager.closeWindow($.detail)
}