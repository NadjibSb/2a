// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Agence_details",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager");

(function constructor(){
    var agency = {
        name: "Agence Sidi Yahia",
        adresse: "71, cité elfath Oued kniss, Alger",
        tlf:["0555362849","0555362849"],
        email:"a@a.com",
        code:"1604"
    };
    updateUI(agency);
})();


// Private Functions ----------------------------------------------------------------
function updateUI(agency){
    $.agence_name.text = agency.name;
    $.agence_adresse.text = agency.adresse;
    $.agence_email.text = agency.email;
    $.agence_code.text = $.agence_code.text + agency.code;
    for (var i = 0; i < agency.tlf.length; i++) {
        let tlf = Ti.UI.createLabel({
            text: agency.tlf[i]
        });
        $.addClass(tlf,'tlf');
        tlf.addEventListener("click",(e)=>{
            Ti.Platform.openURL("tel:"+tlf.text);
            log("call : "+tlf.text);
        });
        $.phoneNumbers.add(tlf);
        //add separator
        if (i<agency.tlf.length-1) {
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
