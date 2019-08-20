// Dependencies
var log = require( 'utility/logger' )({
		tag: "Sinistres_details",
		hideLog: false
	}),
    str = require('/utility/stringUtil'),
    navManager = require("/utility/navmanager");

// varriables----------------------------------------------
const WITHRAWN_STATE = 0;
const ACTIVE_STATE = 1;
const ONGOING_ENABLED_STATE = 2;
const ONGOING_DISABLED_STATE = 3;


// Constructor----------------------------------------------
(function constructor(){
    var sinistre = {
        type: 'Auto',
        numContrat: "007-12345/093",
        adresse: "rue 54 cité lhouma Alger Algerie",
        date: "13/02/2019",
        lieu: "Mosta",
        degats: 'blzlk v lknvre noknr',
        circonstances: "long text, long text, long text, long text, long text, long text, long text, long text, long text, long text, long text, long text, ",
        status: "activé"
    };
    UIsetup(sinistre);
    //updateView(ONGOING_DISABLED_STATE);
    updateView(ACTIVE_STATE);

})();

// event functions ----------------------------------------------
// open rendezvous view open
function openRendezvousView(e){
    $.rendezvousView.open();
    setTimeout(function(){
        updateView(ONGOING_ENABLED_STATE);
    }, 1000);

}
// rendezvous view closed
function close(e){
    log(e);
}

//private functions ----------------------------------------------
function updateView(type){
    // remove the existing view
    $.viewToChange.children[0] ?  $.viewToChange.remove($.viewToChange.children[0]) : log("viewToChange empty") ;
    log($.viewToChange.children.length);
    // insert the new view
    switch (type) {
        case 0://status : rejeté
            $.btRendezvous.hide();
            break;
        case 1://status : ouvert
            $.btRendezvous.show();
            $.btRendezvous.backgroundColor = Alloy.CFG.design.colors.PrimaryColor;
            $.btRendezvousText.text = L('sinistres_details_btn_choix_Rendezvous');
            $.btRendezvous.addEventListener("click",openRendezvousView);
            break;
        case 2://status : en cours , button activé
            $.btRendezvous.show();
            $.btRendezvous.backgroundColor = Alloy.CFG.design.colors.Red;
            $.btRendezvousText.text = L('sinistres_details_btn_change_Rendezvous');
            $.btRendezvous.addEventListener("click",openRendezvousView);
            var view = Alloy.createController("/Sinistres/Details/rendezvousChoosed").open($.btRendezvous,$.btRendezvousText);
            $.viewToChange.add(view);
            break;
        case 3://status : en cours , button désactivé
            $.btRendezvous.show();
            $.btRendezvous.backgroundColor = Alloy.CFG.design.colors.Gray;
            $.btRendezvousText.text = L('sinistres_details_btn_change_Rendezvous');
            $.btRendezvous.removeEventListener("click",openRendezvousView);
            var view = Alloy.createController("/Sinistres/Details/trackExpert").open($.btRendezvous,$.btRendezvousText);
            $.viewToChange.add(view);
            break;

        default:
            $.btRendezvous.hide();
    }
}

function UIsetup(sinistre){
    $.topBar_text.text = sinistre.type;
    let font = {
            fontSize: 14,
            fontFamily: Alloy.CFG.design.fonts.Medium
        };

    str.labelStyling($.num_contrat, sinistre.numContrat,{font:font});
    str.labelStyling($.adresse, sinistre.adresse,{font:font});
    str.labelStyling($.date, sinistre.date,{font:font});
    str.labelStyling($.lieu, sinistre.lieu,{font:font});
    str.labelStyling($.degats, sinistre.degats,{font:font});
    str.labelStyling($.circonstances, sinistre.circonstances,{font:font});
    str.labelStyling($.status, sinistre.status, {font:font,color: Alloy.CFG.design.fonts.RedColor});
}

function pressBack(e){
    navManager.closeWindow($.details);
}
