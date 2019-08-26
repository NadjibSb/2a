// Dependencies ---------------------------------------------------------------
var log = require( 'utility/logger' )( {
		tag: "Sinistres_index",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager"),
    dataService = require("/dataHandler/dataService");


// PRIVATE VARIABLES ---------------------------------------------------------------
const MySinistre_TAB = 0, History_TAB = 1;
var mesSinistresList = [];
var historiqueList = [],
    currentPage_s = 1,
    currentPage_h = 1,
    selectedTab = MySinistre_TAB;


// CONSTRUCTOR ---------------------------------------------------------------
(function constructor(){
    setup_refreshController();
    $.customIndicator.show();
    initializeList(MySinistre_TAB, ()=>{
        $.customIndicator.hide();
    });
})();


// Private Functions ---------------------------------------------------------------


function initializeList(currentTab, callback){
    switch (currentTab) {
        case MySinistre_TAB:
            currentPage_s = 1;
            mesSinistresList = [];
            getData(currentPage_s, MySinistre_TAB, (e)=>{
                $.sinistreSection.items = serializeList(mesSinistresList);
                _.isFunction( callback ) && callback();
            });
            break;

        case History_TAB:
            currentPage_h = 1;
            historiqueList = [];
            getData(currentPage_h, History_TAB, (e)=>{
                $.sinistreSection.items = serializeList(historiqueList);
                _.isFunction( callback ) && callback();
            });
            break;
    }
}

function getData(page, currentTab, callback){
    switch (currentTab) {
        case MySinistre_TAB:
            dataService.getMySinistresPerPage(page,
                (response)=>{
                    mesSinistresList = response;
                    _.isFunction( callback ) && callback();
                },
                (error)=>{
                    log(error);
                    _.isFunction( callback ) && callback();
            });
            break;

        case History_TAB:
            dataService.getSinistresHistoryPerPage(page,
                (response)=>{
                    historiqueList = response;
                    _.isFunction( callback ) && callback();
                },
                (error)=>{
                    log(error);
                    _.isFunction( callback ) && callback();
            });
            break;
    }
}


function switchList(currentTab){
    let list;
    switch (currentTab) {
        case MySinistre_TAB:
            mesSinistresList.length > 0 ? $.sinistreSection.items = serializeList(mesSinistresList) : initializeList(MySinistre_TAB);
            break;

        case History_TAB:
            historiqueList.length > 0 ? $.sinistreSection.items = serializeList(historiqueList) : initializeList(History_TAB);
            break;
    }
}


function setup_refreshController(){
    var control = Ti.UI.createRefreshControl({
        tintColor: Alloy.CFG.design.colors.PrimaryColor
    });
    $.sinistreList.refreshControl = control;
    control.addEventListener('refreshstart',function(e){
        log('refreshstart');
        initializeList(selectedTab, ()=>{
            control.endRefreshing();
        });
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
        let img = getIcon(item.type),
            status = getStatus(item.status);

        listToDisplay.push({
            template: "sinistreTemplate",
            type: {
                text: item.type,
                font: font
            },
            numContrat: {text: item.contract_id},
            date: {text: item.disasterDate},
            status: {
                text: status.text,
                color: status.color,
                font: font
            },
            image: {image: img}
        })
    });
    return listToDisplay;

    function getIcon(category){
        switch (category) {
            case "habitat":
                return "/images/icn_house_white.png";
            case "catnat":
                return "/images/icn_catnat_white.png";
            case "pro":
                return "/images/icn_building_white.png";
            case "auto":
                return "/images/icn_cars_white.png";
            default:
                return "/images/icn_catnat_white.png";
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

// EVENT HANDLERS ---------------------------------------------------------------
function tabChanged(e){
    switch (selectedTab) {
        case MySinistre_TAB: //display History_TAB
            selectedTab = History_TAB;
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
            switchList(selectedTab);
            setTimeout(function(){
                if ($.sinistreSection.items.length > 0) {
                    $.sinistreList.scrollToItem(0,0);
                }
            }, 5);
            break;

        case History_TAB: // display MySinistre_TAB
            selectedTab = MySinistre_TAB;
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
            switchList(selectedTab);
            if ($.sinistreSection.items.length > 0) {
                $.sinistreList.scrollToItem(0,0);
            }
            break;
    }
}

function creatSinistre(e){
    //Alloy.createController("/Sinistres/Details/details").getView().open();
    log("Create Sinistre");
}

function onItemclick(e){
    let list;
    selectedTab == MySinistre_TAB ? list = mesSinistresList : list = historiqueList;
    log(list[e.itemIndex].id, 'item clicked ');
    navManager.openWindow("/Sinistres/Details/details",1,{data: list[e.itemIndex].id});
}
