var log = require( 'utility/logger' )( {
    tag: "tab_index",
    hideLog: false
} );
//var contact = require("/alloy/controllers/Contract/index")
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var tabgroup;


/*if(OS_IOS){
    tabgroup = $.tabGroup;
}


function selectedTab(e){
    switch(e.source.tabId){ 
        case "contract" :
            $.contract.constructor()
        break;
        case "devis" : 
            $.devis.constructor()
        break;
        case "sinistre" :
            $.sinistre.constructor()
        break;
        case "agance" : 
            $.agance.constructor()
        break;
        case "divers" : 
            log("di")
        break 
    }
    
}

function selectedAndroid(e){
    log("je suis clique ")
}*/