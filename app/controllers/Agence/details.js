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
    call_to_actions = require("/utility/calltoActions"),
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

function seeOnMap(e){
    call_to_actions.openMaps(args.data.ltd,args.data.lgt)
}

function sendEmail(e){
    call_to_actions.mailTo(args.data.email);
}
