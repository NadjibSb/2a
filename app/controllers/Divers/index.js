//require
var log = require( 'utility/logger' )( {
    tag: "diversScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");
const session = require("/dataHandler/session")
// Variable
var args = $.args;


// function

function buttonClick(e){
    screen = e.source.buttonId
    navManager.openWindow("Divers/Menu/"+screen)
}

function buttonLogout(e){
    session.deleteUserData()
}

// traintemnet