var log = require( 'utility/logger' )( {
    tag: "numeroutilScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
//variable


//function
function pressBack(e){
    log("test press")
    navManager.closeWindow($.numeroUtils)
  }

//traitement