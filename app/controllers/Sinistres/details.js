// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Sinistres_details",
		hideLog: false
	} );

// Constructor
(function constructor(){
    var sinistre = {
        type: 'Auto',
        numContrat: "007-12345/093",
        adresse: "rue 54 cité lhouma Alger Algerie",
        date: "13/02/2019",
        lieu: "Mosta",
        degats: 'blzlk v lknvre noknr',
        circonstances: "langyue langue text, langyue langue text, langyue langue text, langyue langue text, langyue langue text, langyue langue text,",
        status: "activé"
    }

    $.topBar_text.text = sinistre.type;
    stringStyling($.num_contrat,sinistre.numContrat);
    stringStyling($.adresse,sinistre.adresse);
    stringStyling($.date,sinistre.date);
    stringStyling($.lieu,sinistre.lieu);
    stringStyling($.degats,sinistre.degats);
    stringStyling($.circonstances,sinistre.circonstances);
    stringStyling($.status,sinistre.status,'red');
    //$.btRendezvous.hide();
    //openModal();
    $.chooseRendezvousView.open();
})();


function openRendezvousView(e){
    $.chooseRendezvousView.open();
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
                    fontFamily: Alloy.CFG.design.fonts.Light
                },
                range: [0, label.text.length-1]
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

function close(e){
    log(e);
}
