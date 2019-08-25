// DEPENDENCIES
const log = require('/utility/logger')({
              tag : "Maps_Manager",
              hidelag : false
            });

//PUBLIC INTERFACE
var $ = module.exports = {
	checkGoogleServices: checkGoogleServices,
    checkPermissions: checkPermissions,
    checkGPS: checkGPS,
    getMyCoords: getMyCoords
};

// PRIVATE VAR
var hasPermission = false;

// PRIVATE FUNCTIONS
function checkGoogleServices(){
    if (Alloy.Globals.isAndroid) {
        var MapModule = require('ti.map');
        var rc = MapModule.isGooglePlayServicesAvailable();
        switch (rc) {
            case MapModule.SUCCESS:
                log('Google Play services is installed.');
                return true;
            case MapModule.SERVICE_MISSING:
                alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
                break;
            case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
                alert('Google Play services is out of date. Please update Google Play services.');
                break;
            case MapModule.SERVICE_DISABLED:
                alert('Google Play services is disabled. Please enable Google Play services.');
                break;
            case MapModule.SERVICE_INVALID:
                alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
                break;
            default:
                alert('Unknown error.');
                break;
        }
        return false;
    }else { // ON iOS
        return true;
    }

}

function checkPermissions(){
    if(Alloy.Globals.isIOS || Ti.Platform.Android.API_LEVEL >= 23){
        log('os= iOS || Ti.Platform.Android.API_LEVEL >= 23');
        //var hasLocationPermission = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
        var hasLocationPermission = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE);
        if (!hasLocationPermission) {
            Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {
                if (e.success) {
                    log(e);
                    hasPermission = true;
                    return true;
                } else {
                    log(e);
                    return false;
                }
            })
        }else { // permission already given
            hasPermission = true;
            return true;
        }
    }else {
        log("Ti.Platform.Android.API_LEVEL < 23");
        hasPermission = true;
        return true;
    }
}

function checkGPS(){
    if (Ti.Geolocation.locationServicesEnabled) {
        return true
    } else {
        alert(L("alert_GPS_disabled"));
    }
    return false;
}

function getMyCoords(callback){
    if (hasPermission) {
        Ti.Geolocation.getCurrentPosition((myPosition)=>{
            log(myPosition,'myCoords');
            _.isFunction( callback ) && callback( myPosition.coords );
        },(e)=>{
            log(e,'myCoords');
        });
    }
}
