var log = require( 'utility/logger' )( {
    tag: "call",
    hideLog: false
} );

exports.doCall = function docall(phone){
    log("do a call"+phone)
        if(OS_ANDROID){
            Titanium.Platform.openURL('tel:'+phone);
        }else{
            Ti.Platform.openURL('tel:'+phone, {
                'UIApplicationOpenURLOptionsSourceApplicationKey': true
            }, function(e) {
                Ti.API.info('URL open successfully? ' + JSON.stringify(e));
            });
        }
}