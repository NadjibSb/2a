// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Agence_index",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager");



function onclock(e){
    navManager.openWindow("/Agence/details");
}
