var log = require( 'utility/logger' )( {
    tag: "tab_index",
    hideLog: false
} );
//var contact = require("/alloy/controllers/Contract/index")
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;



function selectedTab(e){
    tabChoosed(e.source.tabId)
}

function selectedAndroid(e){
    tabChoosed(e)
}

function tabChoosed(tab){
    if(OS_IOS){
        switch(tab){
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
                $.divers.constructor()
            break
        }
    }else{

    }

}
