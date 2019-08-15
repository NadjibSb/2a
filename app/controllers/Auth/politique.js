// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const navmanager = require("/utility/navmanager");
var log = require( "/utility/logger" )( {
		tag: 'politique',
		hideLog: false
	} );

var args = $.args;

//function
function pressBack(e){
    navmanager.closeWindow($.politique,0)
}
