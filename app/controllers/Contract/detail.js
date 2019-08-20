// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Agence_details",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager");






$.lb.text = args.data;


function pressBack(e){
    navManager.closeWindow($.detail);
}
