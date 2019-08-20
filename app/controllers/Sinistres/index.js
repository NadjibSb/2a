// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Sinistres_index",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager");

var data = [];
var _data = [];

(function constructor(){
    defaultData();
    $.sinistreSection.items = data;
})();


function defaultData(){
    // fill data
    for (var i = 0; i < 7; i++) {
        var c,
        font = {
            fontSize: 14,
            fontFamily: Alloy.CFG.design.fonts.Heavy
        };
        i%2==0 ? c=Alloy.CFG.design.fonts.PrimaryColor : c = Alloy.CFG.design.fonts.GreenColor;
        data.push({
            template: "sinistreTemplate",
            type: {
                text: "type",
                font: font
            },
            numContrat: {text: "type"},
            date: {text: "type"},
            status: {
                text: "type",
                color:c,
                font: font
            },
            image: {image: "/images/icn_cars_white.png"}
        });
        i%2==1 ? c=Alloy.CFG.design.fonts.PrimaryColor : c = Alloy.CFG.design.fonts.GreenColor;
        _data.push({
            template: "sinistreTemplate",
            type: {
                text: "histo",
                font: font
            },
            numContrat: {text: "histo"},
            date: {text: "histo"},
            status: {
                text: "histo",
                color:c,
                font: font
            },
            image: {image: "/images/icn_building_white.png"}
        });
    }
}



// Private Functions


function displayMesSinistres(e){
    // show the bottom button
    $.creatSinistre.show();
    $.bottomMargin.bottom = 60;
    // button setup
    $.removeClass($.btHistorique, 'enabled');
    $.removeClass($.btMesSinistres, 'disabled');
    $.addClass($.btHistorique, 'disabled');
    $.addClass($.btMesSinistres, 'enabled');
    $.btHistorique.children[0].color = Alloy.CFG.design.colors.PrimaryColor;
    $.btMesSinistres.children[0].color = "white";
    // update list
    $.sinistreSection.items = data;
    $.sinistreList.scrollToItem(0,0);
}

function displayHistorique(e){
    // hide the bottom button
    $.creatSinistre.hide();
    $.bottomMargin.bottom = 0;
    // button setup
    $.removeClass($.btMesSinistres, 'enabled');
    $.removeClass($.btHistorique, 'disabled');
    $.addClass($.btMesSinistres, 'disabled');
    $.addClass($.btHistorique, 'enabled');
    $.btMesSinistres.children[0].color = Alloy.CFG.design.colors.PrimaryColor;
    $.btHistorique.children[0].color = "white";
    // update list
    $.sinistreSection.items = _data;
    setTimeout(function(){
        $.sinistreList.scrollToItem(0,0);
    }, 5);

}

function creatSinistre(e){
    //Alloy.createController("/Sinistres/Details/details").getView().open();
    log("Create Sinistre");
}

function onItemclick(e){
    log(e.itemIndex);
    navManager.openWindow("/Sinistres/Details/details");
}
