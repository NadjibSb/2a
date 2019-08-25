// Dependencies------------------------------------------------------------------------------
var log = require( 'utility/logger' )( {
		tag: "Agence_index",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager"),
    mapsManager = require("/utility/mapsManager"),
    MapModule = require('ti.map'),
    call_to_actions = require('/utility/calltoActions'),
    str = require("/utility/stringUtil"),
    dataService = require("/dataHandler/dataService");


// PRIVATE VARIABLES------------------------------------------------------------------------------
var MapsConfigured = false;
var mapView;
var selectedAnnotation = null;
var agenciesList = [];
var page=1;
const PAGE_COUNT = 10;
var hasLocationPermission = false;
var myCoords= {
    latitude:0,
    longitude:0
};


// CONSTRUCTOR------------------------------------------------------------------------------
(function constructor(){

    setup_refreshController();
    $.customIndicator.show();

    let callback = ()=>{
        getData(
            ()=>{
                loadNextPage();
                $.customIndicator.hide();
            }
        );
    };
    checkPositionConfig(callback,callback);


})();



// PRIVATE FUNCTIONS ------------------------------------------------------------------------------

function checkPositionConfig(successCallback,erroeCallback){
    //if has permission to access my position
    if (mapsManager.checkPermissions()) {
        hasLocationPermission= true;
        mapsManager.getMyCoords((myPosition)=>{
            myCoords = myPosition;
            _.isFunction( successCallback ) && successCallback();
        });
    }else { // if no permission
        _.isFunction( erroeCallback ) && erroeCallback();
    }
}
function getData(callback){
    dataService.getAgencies(
        (response)=>{
            agenciesList = sortList(response);
            _.isFunction( callback ) && callback();
        },
        (error)=>{
            log(error);
            _.isFunction( callback ) && callback();
        }
    );
}



// FUNCTIONS -------------------- List

function sortList(list){
    let sorted = [];
    if (list.length >0) {
        if (hasLocationPermission) {
            sorted = _.sortBy(list,function(agency){
                let ltd = Math.abs(myCoords.latitude)-Math.abs(agency.ltd),
                    lgt = Math.abs(myCoords.longitude)-Math.abs(agency.lgt);
                return (ltd+lgt)/2;
            });
        }else{
            sorted = _.sortBy(list,'region');
        }
    }
    log("sorted list "+sorted.length);
    return sorted;
}


function loadNextPage(){ //Pagination on the UI (not on the API)
    log('load page ' + page);
    if (agenciesList.length >0) {
        displayListData(true);
        let start = (page-1) * PAGE_COUNT,
            end = page * PAGE_COUNT,
            listToDisplay = $.agencesSection.items;

        //check if the whole list is displayed
        if (end > agenciesList.length) {
            end = agenciesList.length
        }else {
            $.agenceList.setMarker({
                sectionIndex:0,
                itemIndex: end-2
            });
        }
        // add the next page to the list
        log('Load element => ' + start + ' - ' +end);
        let list = agenciesList.slice(start,end);
        _.each(list,(item)=>{
            listToDisplay.push({
                template: "agenceTemplate",
                id:item.agency_id,
                title: {text: item.region + ' - '+ item.agency_id},
                adresse: {text: item.address},
                tlf: {text: item.phone[0]},
                email: {text: item.email},
            });
        });
        $.agencesSection.items = listToDisplay;
        page++;
    }else{
        displayListData(false);
    }
}

function displayListData(isNotEmpty){
    if (isNotEmpty) {
        $.agenceList.visible = true;
        $.emptyList.visible = false;
    }else {
        $.emptyList.visible = true;
        $.agenceList.visible = false;
    }
}


function setup_refreshController(){
    var control = Ti.UI.createRefreshControl({
        tintColor: Alloy.CFG.design.colors.PrimaryColor
    });
    $.agenceList.refreshControl = control;
    control.addEventListener('refreshstart',function(e){
        log('refreshstart');
        let callback = ()=>{
            getData(
                ()=>{
                    control.endRefreshing();
                    // initialize the list
                    page = 1;
                    $.agencesSection.items = []
                    loadNextPage();
                }
            );
        };
        checkPositionConfig(callback,callback);

    });
}

// EVENT HANDLERS -------------------- List

function onItemclick(e){
    navManager.openWindow("/Agence/details",1,{data: agenciesList[e.itemIndex]});
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


// FUNCTIONS -------------------- Maps

function setupMaps(){
    let tag = "MAPS";

    if (mapsManager.checkGoogleServices()) { // if true display map
        log('Google Services installed' , tag);
        // add map
        mapView = MapModule.createView({
            mapType: MapModule.NORMAL_TYPE,
            animate: true,
            regionFit: true,
            userLocation: true
        });

        if (mapsManager.checkPermissions()) {
            log('Maps permission guarteed', tag);
            //zoom into my position
            log(myCoords, "My Coords");
            mapView.region = {
                latitude: myCoords.latitude,
                longitude: myCoords.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            };
        }else {
            log('Maps permission not guarteed', tag);
            //zoom into Algiers
            let ltd = '36.739572',
                lgt = "3.088480";
            mapView.region = {
                latitude: ltd,
                longitude: lgt,
                latitudeDelta: 2,
                longitudeDelta: 2
            };
        }
        $.mapsViewContainer.add(mapView);
        addAnnotations(agenciesList);
        // add event listner
        mapView.addEventListener("click",onClickMap);

    }else { // handle maps not displayed

    }
}


function addAnnotations(list){
    let i =1, annotations = [];

    _.each(list,(item)=>{

        var annotation = MapModule.createAnnotation({
            latitude: 36.499290466308594-0.1*i,
            longitude: 2.681362199783325,
        	title : item.region + ' - ' + item.agency_id,
            image: true ? "/images/icn_localization_2a_blue.png" : "/images/icn_localization_2a_blue.png",
            //customView:getCustumView({statusOpen:true}),
            agency:item
        });
        annotations.push(annotation);
        i++;
    });
    log("done","Annotations");
    mapView.annotations = annotations;
}

// Card view in Maps
function showCard(agency){

    str.labelStyling($.moreDetails,L('agence_more_details'),{underline:true}); //underline text
    $.agencyTitle_Map.text = agency.region + ' - ' + agency.agency_id;
    $.agencyAdresse_Map.text = agency.address;
    $.agencyPhone_Map.text = agency.phone[0];
    $.agencyEmail_Map.text = agency.email;
    if (!$.agencyDetailsCard.visible) {
        $.agencyDetailsCard.animate({
            opacity:1,
            duration: 100,
        });
        $.agencyDetailsCard.show();
    }

    $.moreDetails.addEventListener('click',(e)=>{
        navManager.openWindow("/Agence/details",1,{data:agency});
    });
}

function closeCard(e){
    $.agencyDetailsCard.animate({
        opacity: 0.2,
        duration: 100,
    },()=>{
        $.agencyDetailsCard.hide();
    });
}




// EVENT HANDLERS -------------------- Maps
function displayMaps(e){
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
    setupMaps();

}
function onClickMap(e){

    if (e.annotation == selectedAnnotation) { // the maps triggers 2 click events of the same annotation
        log("egnore event");
    }else{
        log(e.annotation.agency.agency_id);
        let agency = e.annotation.agency;
        showCard(agency);
        selectedAnnotation = e.annotation;
    }
}


function seeOnMap(e){
    call_to_actions.openMaps(selectedAnnotation.agency.ltd, selectedAnnotation.agency.lgt);
}
