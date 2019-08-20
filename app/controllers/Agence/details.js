// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Agence_details",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager"),
    dataService = require("/dataHandler/dataService");

(function constructor(){
    log(args);

    dataService.getAgencyDetails(args.item.id,
        (agency)=>{
            updateUI(agency);
        },
        (error)=>{
            log(error);
        }
    );
})();


// Private Functions ----------------------------------------------------------------
function updateUI(agency){
    $.agence_name.text = L('agence') + agency.region;
    $.agence_adresse.text = agency.address;
    $.agence_email.text = agency.email;
    $.agence_code.text = $.agence_code.text + agency.agency_id;
    for (var i = 0; i < agency.phone.length; i++) {
        let tlf = Ti.UI.createLabel({
            text: agency.phone[i]
        });
        $.addClass(tlf,'tlf');
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
