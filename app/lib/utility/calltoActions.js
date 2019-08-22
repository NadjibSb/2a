// DEPENDENCIES
const log = require('/utility/logger')({
              tag : "call_to_actions",
              hidelag : false
            });

//PUBLIC INTERFACE
var $ = module.exports = {
	openMaps: openMaps,
    mailTo: mailTo,
};


// PRIVATE FUNCTIONS

function openMaps(ltd, lgt){
    log("open maps on "+ltd+','+lgt);
    if (ltd && lgt) {
        let url = "geo:?q="+ltd+","+lgt+"&z=17";
        //if url accepted
        if (Ti.Platform.openURL(url)) {
            log("'see on maps' accepted");

        }else if (Alloy.Globals.isIOS) { //if ios
            url = "comgooglemaps://?center="+ltd+","+lgt;
            let urliOS = "maps:?q="+ltd+","+lgt;
            if (Ti.Platform.openURL(url)) { //if GoogleMaps installed
                log("iOS => 'see on maps' accepted => GoogleMaps");

            }else if (Ti.Platform.openURL(urliOS)) { //if url accepted
                log("iOS => 'see on maps' accepted => Native maps");
                
            } else {
                url = "https://www.google.com/maps/?q="+ltd+"+"+lgt;
                Ti.Platform.openURL(url,{},(e)=>{
                    log(e);
                });
                log("iOS => see on maps not accepted => Browser");
            }

        }else {
            url = "https://www.google.com/maps/?q="+ltd+"+"+lgt;
            Ti.Platform.openURL(url,{},(e)=>{
                log(e);
            });
            log("Browser => see on maps not accepted");
        }
    }
}

function mailTo(mail){
    if (mail) {
        log("mail to : "+mail);
        let url = "mailto:"+ mail;
        if (Ti.Platform.openURL(url)) {
            log("send email accepted");
        }else {
            log("send email not accepted");
        }
    }
}
