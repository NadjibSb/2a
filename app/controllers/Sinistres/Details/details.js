// Dependencies
var args = $.args;
var log = require( 'utility/logger' )({
		tag: "Sinistres_details",
		hideLog: false
	}),
    str = require('/utility/stringUtil'),
    navManager = require("/utility/navmanager"),
    dataService = require("/dataHandler/dataService");

// varriables----------------------------------------------
const WITHRAWN_STATE = 0;
const ACTIVE_STATE = 1;
const ONGOING_ENABLED_STATE = 2;
const ONGOING_DISABLED_STATE = 3;

var id = args.data;


// Constructor----------------------------------------------
(function constructor(){
    $.customIndicator.show();
    getData(id, (sinistre)=>{

        $.mainContent.show()
        $.customIndicator.hide();
        log(sinistre,' Sinistre');
        UIsetup(sinistre);
    });
    //updateView(ONGOING_DISABLED_STATE);
    updateView(ACTIVE_STATE);

})();


//private functions ----------------------------------------------

function getData(id, callback){
    dataService.getSinistreDetails(id,
        (response)=>{
            _.isFunction( callback ) && callback(response);
        },
        (error)=>{
            log(error);
            _.isFunction( callback ) && callback(response);
    });
}


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
    $.topBar_img.image = getIcon(sinistre.type);
    $.topBar_text.text = sinistre.longType;
    let font = {
            fontSize: 14,
            fontFamily: Alloy.CFG.design.fonts.Medium
        };

    str.labelStyling($.num_contrat, sinistre.contract_id,{font:font});
    str.labelStyling($.adresse, sinistre.address,{font:font});
    str.labelStyling($.date, sinistre.disasterDate,{font:font});
    str.labelStyling($.lieu, sinistre.disasterArea,{font:font});
    str.labelStyling($.degats, sinistre.damage,{font:font});
    str.labelStyling($.circonstances, sinistre.circumstances,{font:font});
    let status = getStatus(sinistre.status);
    str.labelStyling($.status, status.text, {font:font,color: status.color});

    function getIcon(category){
        switch (category) {
            case "habitat":
                return "/images/icn_house_blue_title.png";
            case "catnat":
                return "/images/icn_catnat_blue_title.png";
            case "pro":
                return "/images/icn_building_blue_title.png";
            case "auto":
                return "/images/icn_cars_blue_title.png";
            default:
                return "/images/icn_catnat_blue_title.png";
        }
    }

    function getStatus(status){
        let color,text;
        switch (status) {
            case 0:
                color = Alloy.CFG.design.fonts.RedColor;
                text = L("sinistre_rejected");
                break;
            case 1:
                color = Alloy.CFG.design.fonts.GreenColor;
                text = L("sinistre_accepted");
                break;
            case 2:
                color = Alloy.CFG.design.fonts.SecondaryColorLight;
                text = L("sinistre_open");
                break;
            case 3:
                color = Alloy.CFG.design.fonts.SecondaryColorDark;
                text = L("sinistre_ongoing");
                break;
            default:
                color = Alloy.CFG.design.fonts.GreenColor;
                text = L("sinistre_accepted");
                break;
        }
        return {color:color,text:text};
    }
}




// EVENT HANDLERS ----------------------------------------------
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

function pressBack(e){
    navManager.closeWindow($.details);
}
