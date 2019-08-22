// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Agence_details",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager"),
    str = require("/utility/stringUtil"),
    alertDialog = require("/utility/alertManager"),
    dataService = require("/dataHandler/dataService");

(function constructor(){
    log(args);
    updateUI(args.data);
})();


// Private Functions ----------------------------------------------------------------
function updateUI(agency){
    $.agence_name.text = L('agence') + agency.region;
    $.agence_adresse.text = agency.address;
    $.agence_code.text = $.agence_code.text + agency.agency_id;
    $.agence_image.image = agency.photo;
    str.labelStyling($.seeMaps, L("agence_details_see_maps"), {underline:true}); //underline email
    str.labelStyling($.agence_email, agency.email, {underline:true}); //underline email
    // creat labels for phones
    for (var i = 0; i < agency.phone.length; i++) {
        let tlf = Ti.UI.createLabel();
        $.addClass(tlf,'tlf');
        str.labelStyling(tlf,agency.phone[i],{underline:true});
        tlf.addEventListener("click",(e)=>{
            Ti.Platform.openURL("tel:"+tlf.text);
            log("call : "+tlf.text);
        });
        $.phoneNumbers.add(tlf);
        //add separator
        if (i<agency.phone.length-1) {
            let separator = Ti.UI.createLabel({
                text: ' - '
            });
            $.addClass(separator,'text');
            $.phoneNumbers.add(separator);
        }
    }
}


// event handlers ----------------------------------------------------------------

function pressBack(e){
    navManager.closeWindow($.details);
}

function seeOnMap(e, ltd =args.data.ltd, lgt = args.data.lgt){
    let lat = ltd,
        long = lgt;
    let url = "geo:?q="+lat+","+long+"&z=17";
    //if url accepted
    if (Ti.Platform.canOpenURL(url)) {
        log("'see on maps' accepted");
        Ti.Platform.openURL(url,{},(e)=>{
            log(e);
        });

    }else if (Alloy.Globals.isIOS) { //if ios
        url = "comgooglemaps://?center="+lat+","+long;
        let urliOS = "maps:?q="+lat+","+long;
        if (Ti.Platform.canOpenURL(url)) { //if GoogleMaps installed
            log("iOS => 'see on maps' accepted => GoogleMaps");
            Ti.Platform.openURL(url,{},(e)=>{
                log(e);
            });
        }else if (Ti.Platform.canOpenURL(urliOS)) { //if url accepted
            log("iOS => 'see on maps' accepted => Native maps");
            Ti.Platform.openURL(urliOS,{},(e)=>{
                log(e);
            });
        } else {
            url = "https://www.google.com/maps/?q="+lat+"+"+long;
            Ti.Platform.openURL(url,{},(e)=>{
                log(e);
            });
            log("iOS => see on maps not accepted => Browser");
        }

    }else {
        url = "https://www.google.com/maps/?q="+lat+"+"+long;
        Ti.Platform.openURL(url,{},(e)=>{
            log(e);
        });
        log("Browser => see on maps not accepted");
    }
}

function sendEmail(e){
    let url = "mailto:"+ $.agence_email.text;
    if (Ti.Platform.canOpenURL(url)) {
        log("send email accepted");
        Ti.Platform.openURL(url,{},(e)=>{
            log(e);
        });
    }else {
        log("send email not accepted");
    }
}
