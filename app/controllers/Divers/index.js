//require
var log = require( 'utility/logger' )( {
    tag: "diversScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");
const session = require("/dataHandler/session")
// Variable
var args = $.args;
_.extend($,{
    constructor : constructor
})

// function
function buttonClick(e){
    screen = e.source.buttonId;
    log(screen);
    navManager.openWindow("Divers/Menu/"+screen,1)

}

function buttonLogout(e){
    session.deleteUserData()
}

function changeTab(e){
        navManager.changeTab(1)
}

function DoCall(){
    log("do a call")
    if(OS_ANDROID){
        Titanium.Platform.openURL('tel:0556989898');
    }else{
        Ti.Platform.openURL('tel:055-698-9890', {
            'UIApplicationOpenURLOptionsSourceApplicationKey': true
        }, function(e) {
            Ti.API.info('URL open successfully? ' + JSON.stringify(e));
        });
    }

}
function constructor(){
    
};
// traintemnet
