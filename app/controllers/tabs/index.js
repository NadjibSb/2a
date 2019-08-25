var log = require( 'utility/logger' )( {
    tag: "tab_index",
    hideLog: false
} );

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var tabgroup;


if(OS_IOS){
    tabgroup = $.tabGroup;
}


function selectedTab(e){
    switch(e.source.tabId){
        case "contract" :
            log("c")
        break;
        case "devis" : 
            log("devis")
        break;
        case "sinistre" :
            log("sinistre")
        break;
        case "agance" : 
            log("agance")
        break;
        case "divers" : 
            log("divers")
        break 
    }
}

function selectedAndroid(e){
    log(e)
}