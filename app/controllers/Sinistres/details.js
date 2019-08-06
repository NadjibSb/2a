// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Sinistres_details",
		hideLog: false
	} );


// Constructor
(function constructor(){
    buttonType(1);
    var sinistre = {
        type: 'Auto',
        numContrat: "007-12345/093",
        adresse: "rue 54 cité lhouma Alger Algerie",
        date: "13/02/2019",
        lieu: "Mosta",
        degats: 'blzlk v lknvre noknr',
        circonstances: "langyue langue text, langyue langue text, langyue langue text, langyue langue text, langyue langue text, langyue langue text,",
        status: "activé"
    };
    UIsetup(sinistre);
    //$.btRendezvous.hide();
    //openModal();
    //$.rendezvousView.open();
})();


function openRendezvousView(e){
    $.rendezvousView.open();
}
// rendezvous view closed
function close(e){
    log(e);
}

function UIsetup(sinistre){
    $.topBar_text.text = sinistre.type;
    stringStyling($.num_contrat,sinistre.numContrat);
    stringStyling($.adresse,sinistre.adresse);
    stringStyling($.date,sinistre.date);
    stringStyling($.lieu,sinistre.lieu);
    stringStyling($.degats,sinistre.degats);
    stringStyling($.circonstances,sinistre.circonstances);
    stringStyling($.status,sinistre.status,'red');
    stringStyling($.choisenExpert,"Ali benDahou",Alloy.CFG.design.fonts.SecondaryColorDark);
    stringStyling($.dateRendezvous,"13/02/2019",Alloy.CFG.design.fonts.SecondaryColorDark);
    stringStyling($.numtlf,"0553859482",Alloy.CFG.design.fonts.SecondaryColorDark);
}

function buttonType(type){
    switch (type) {
        case 1: // choose Rendezvous
            $.btRendezvous.backgroundColor = Alloy.CFG.design.colors.PrimaryColor;
            $.btRendezvousText.text = L('sinistres_details_btn_choix_Rendezvous');
            break;
        case 2: // changer Rendezvous
            $.btRendezvous.backgroundColor = Alloy.CFG.design.colors.Red;
            $.btRendezvousText.text = L('sinistres_details_btn_change_Rendezvous');
            break;
        case 3: // disabeled
            $.btRendezvous.backgroundColor = Alloy.CFG.design.colors.Gray;
            $.btRendezvousText.text = L('sinistres_details_btn_change_Rendezvous');
            break;

        default:

    }
}

// change the font of the first string and color the second
function stringStyling(label, textToAdd, color){
    var attr = Ti.UI.createAttributedString({
        text: label.text + textToAdd,
        attributes: [
            {
                type: Ti.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: 14,
                    fontFamily: Alloy.CFG.design.fonts.Medium
                },
                range: [label.text.length, textToAdd.length]
            },
            {
                type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value: color,
                range: [label.text.length, textToAdd.length]
            }
        ]
    });
    label.attributedString = attr;
}
