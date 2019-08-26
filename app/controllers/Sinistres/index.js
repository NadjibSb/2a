// Dependencies ---------------------------------------------------------------
var log = require( 'utility/logger' )( {
		tag: "Sinistres_index",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager"),
    dataService = require("/dataHandler/dataService");


// PRIVATE VARIABLES ---------------------------------------------------------------
var mesSinistresList = [];
var historiqueList = [];


// CONSTRUCTOR ---------------------------------------------------------------
(function constructor(){
    setup_refreshController();
    getData();
})();


// Private Functions ---------------------------------------------------------------

function getData(callback){
    dataService.getSinistresPerPage(1,
        (response)=>{
            log(response);
            mesSinistresList = serializeList(response);
            $.sinistreSection.items = mesSinistresList;
            _.isFunction( callback ) && callback();
        },
        (error)=>{
            log(error);
            _.isFunction( callback ) && callback();
    });
}

function serializeList(list){
    let listToDisplay = [], c,
        font= {
            fontSize: 14,
            fontFamily: Alloy.CFG.design.fonts.Heavy
        };

    _.each(list,(item)=>{
        fontColor = Alloy.CFG.design.fonts.PrimaryColor;

        listToDisplay.push({
            template: "sinistreTemplate",
            type: {
                text: item.type,
                font: font
            },
            numContrat: {text: item.contract_id},
            date: {text: item.disasterDate},
            status: {
                text: item.status,
                color: fontColor,
                font: font
            },
            image: {image: "/images/icn_cars_white.png"}
        })
    });
    return listToDisplay;
}



function setup_refreshController(){
    var control = Ti.UI.createRefreshControl({
        tintColor: Alloy.CFG.design.colors.PrimaryColor
    });
    $.sinistreList.refreshControl = control;
    control.addEventListener('refreshstart',function(e){
        log('refreshstart');
        getData((e)=>{
            control.endRefreshing();
        });
    });
}


// EVENT HANDLERS ---------------------------------------------------------------
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
    $.sinistreSection.items = mesSinistresList;
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
    $.sinistreSection.items = mesSinistresList;
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
