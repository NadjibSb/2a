// DEPENDENCIES
const log = require('/utility/logger')({
              tag : "Maps_Manager",
              hidelag : false
            });

//PUBLIC INTERFACE
var $ = module.exports = {
	checkConfig: checkConfig
};

// PRIVATE FUNCTIONS
function checkConfig(){
    var MapModule = require('ti.map');
    var rc = MapModule.isGooglePlayServicesAvailable();
    switch (rc) {
        case MapModule.SUCCESS:
            log('Google Play services is installed.');
            break;
        case MapModule.SERVICE_MISSING:
            alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
            return false;
        case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
            alert('Google Play services is out of date. Please update Google Play services.');
            return false;
        case MapModule.SERVICE_DISABLED:
            alert('Google Play services is disabled. Please enable Google Play services.');
            return false;
        case MapModule.SERVICE_INVALID:
            alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
            return false;
        default:
            alert('Unknown error.');
            return false;
    }

    if(Ti.Platform.Android.API_LEVEL >= 23){
        log('Ti.Platform.Android.API_LEVEL >= 23');
        var hasLocationPermission = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
        if (!hasLocationPermission) {
            Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
                if (e.success) {
                    log(e);
                    return true;
                } else {
                    log(e);
                    return false;
                }
            })
        }
    }else {
        log("Ti.Platform.Android.API_LEVEL < 23")
        return true;
    }

}
