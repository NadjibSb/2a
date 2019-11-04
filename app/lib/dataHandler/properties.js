var log = require( "/utility/logger" )( {
		tag: 'Properties',
		hideLog: false
	} );

// PUBLIC INTERFACE
var $ = module.exports = {
	isAppAlreadyOpen: isAppAlreadyOpen,
	appHasBeenOpened: appHasBeenOpened,
	getSessionID: getSessionID,
	setSessionID: setSessionID,
	getSessionData: getSessionData,
	setSessionData: setSessionData,
};

// APP_ALREADY_OPEN ------------------------------------------
function isAppAlreadyOpen(){
    return Ti.App.Properties.getBool( "APP_ALREADY_OPEN", false )
}
function appHasBeenOpened(bool){
    Ti.App.Properties.setBool( "APP_ALREADY_OPEN", bool )
}

// SESSION_ID ------------------------------------------
function getSessionID(){
    return Ti.App.Properties.getString( "SESSION_ID", null );
}
function setSessionID(id){
    Ti.App.Properties.setString( "SESSION_ID", id );
}

// SESSION_ID ------------------------------------------
function getSessionData(){
    return Ti.App.Properties.getObject( "SESSION_DATA", null );
}
function setSessionData(data){
    Ti.App.Properties.setObject( "SESSION_DATA", id );
}
