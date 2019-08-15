// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Agence_index",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager"),
    dataService = require("/dataHandler/agenciesService");



(function constructor(){
    var data = [];
    for (var i = 0; i < 7; i++) {
        data.push({
            template: "agenceTemplate",
            title: {text:"Sidi Mhemmed - 1604"},
            adresse: {text:"71, Rue Belkacemi Mohammed Oued Kniss"},
            tlf: {text:"027536490"},
            email: {text:"a.dzmob.com"},
        });
    }
    //$.agencesSection.items = data;

    setup_refreshController();
    loadPage(1);


})();

function loadPage(id,successCallback,errorCallback){
    dataService.getAgencies(id,
        (response)=>{
            updateList(response);
            _.isFunction( successCallback ) && successCallback( response );
        },
        (error)=>{
            log(error);
            _.isFunction( errorCallback ) && errorCallback( error );
        }
    );
}

function updateList(list){
    var listToDisplay = [];
    _.each(list,(item)=>{
        listToDisplay.push({
            template: "agenceTemplate",
            title: {text: item.region + ' - '+ item.agency_id},
            adresse: {text: item.address},
            tlf: {text: item.phone},
            email: {text: item.email},
        });
    });
    $.agencesSection.items = listToDisplay;
}

function setup_refreshController(){
    var control = Ti.UI.createRefreshControl({
        tintColor: Alloy.CFG.design.colors.PrimaryColor
    });
    $.agenceList.refreshControl = control;
    control.addEventListener('refreshstart',function(e){
        log('refreshstart');
        loadPage(1,()=>{
            control.endRefreshing();
        });
    });
}

function displayListe(e){
    // button setup
    $.removeClass($.btCarte, 'enabled');
    $.removeClass($.btListe, 'disabled');
    $.addClass($.btCarte, 'disabled');
    $.addClass($.btListe, 'enabled');
    $.btCarteText.color = Alloy.CFG.design.colors.PrimaryColor;
    $.btListeText.color = "white";
    $.btListeImg.image = "/images/icn_divers_white_big.png";
    $.btCarteImg.image = "/images/icn_localization_blue_tabbar.png";
    $.agenceList.show();
    $.maps.hide();
}

function displayCarte(e){
    // button setup
    $.removeClass($.btListe, 'enabled');
    $.removeClass($.btCarte, 'disabled');
    $.addClass($.btListe, 'disabled');
    $.addClass($.btCarte, 'enabled');
    $.btListeText.color = Alloy.CFG.design.colors.PrimaryColor;
    $.btCarteText.color = "white";
    $.btListeImg.image = "/images/icn_divers_blue.png";
    $.btCarteImg.image = "/images/icn_localization_white_big.png";
    $.agenceList.hide();
    $.maps.show();

}

function onItemclick(e){
    navManager.openWindow("/Agence/details");
}
