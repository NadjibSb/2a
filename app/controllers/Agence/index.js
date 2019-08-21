// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Dependencies------------------------------------------------------------------------------
var log = require( 'utility/logger' )( {
		tag: "Agence_index",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager"),
    mapsManager = require("/utility/mapsManager"),
    MapModule = require('ti.map'),
    dataService = require("/dataHandler/dataService");


// PRIVATE VARIABLES------------------------------------------------------------------------------
var MapsConfigured = false;
var selectedAnnotation = null;
var agenciesList = [];
var page=1;
const PAGE_COUNT = 10;


// CONSTRUCTOR------------------------------------------------------------------------------
(function constructor(){

    setup_refreshController();
    $.customIndicator.show();
    getData(
        ()=>{
            loadNextPage();
            $.customIndicator.hide();
        }
    );
})();


// PRIVATE FUNCTIONS ------------------------------------------------------------------------------

// EVENT HANDLERS -------------------- List

function onItemclick(e){
    navManager.openWindow("/Agence/details",1,{item:$.agencesSection.items[e.itemIndex]});
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

// FUNCTIONS -------------------- List

function getData(callback){
    dataService.getAgencies(
        (response)=>{
            agenciesList = response;
            _.isFunction( callback ) && callback();
        },
        (error)=>{
            log(error);
            _.isFunction( callback ) && callback();
        }
    );
}

function loadNextPage(){
    log('load page ' + page);
    if (agenciesList.length >0) {
        displayData(true);
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
        displayData(false);
    }
}

function displayData(isNotEmpty){
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
        getData(
            ()=>{
                control.endRefreshing();
                // initialize the list
                page = 1;
                $.agencesSection.items = []
                loadNextPage();
            }
        );
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

    log("selectedAnnotation " + selectedAnnotation);
    if (selectedAnnotation) {
        selectedAnnotation.customView.children[0].width = 40;
        selectedAnnotation.customView.children[1].width = 15;
    }
    log(e.annotation.agency.agency_id);
    log(e);
    e.annotation.customView.children[0].width = 60;
    e.annotation.customView.children[1].width = 25;
    showCard(e.annotation.agency);
    selectedAnnotation = e.annotation;
}


// FUNCTIONS -------------------- Maps

function setupMaps(){
    if(!MapsConfigured){
        if (mapsManager.checkConfig() && mapsManager.checkPermissions()) {
            log('Maps config successful');
            //zoom into my position
            Ti.Geolocation.getCurrentPosition((myPosition)=>{
                log(myPosition.coords);
                $.view_map.region = {
                    latitude: myPosition.coords.latitude,
                    longitude: myPosition.coords.longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5
                };
            });
            // add event listner
            $.view_map.addEventListener("click",onClickMap);

            // display agencies list
            dataService.getAgencies(
                (response)=>{
                    agenciesList = response;
                    addAnnotations(agenciesList);
                },
                (error)=>{
                    log(error);
                }
            );


        }else {
            // TODO: handle maps not displayed
        }
        MapsConfigured = true;
    }
}


function addAnnotations(list){
    var i =1, annotations = [];

    _.each(list,(item)=>{

        var annotation = MapModule.createAnnotation({
            latitude: 36.499290466308594-0.1*i,
            longitude: 2.381362199783325,
            //image: img.image,
            customView:getCustumView(true),
            agency:item
        });
        annotations.push(annotation);
        i++;
    });
    log("annotations done");
    $.view_map.annotations = annotations;

    //
    function getCustumView(status){
        let view = Ti.UI.createView({
            width:Ti.UI.SIZE,
            height:Ti.UI.SIZE,
            autoStyle:true,
        });
        let logo = Ti.UI.createImageView({
            width:40,
            image: "/images/icn_localization_2a_blue.png",
        });
        let img;
        status ? img ="/images/icn_oval_green_in_map.png" : img ="/images/icn_oval_red_in_map.png";
        let statusImg = Ti.UI.createImageView({
            image: img,
            width:15,
            top:0,
            left:0
        });
        view.add(logo,statusImg);
        return view
    }
}

function showCard(agency){
    $.agencyTitle_Map.text = agency.region + ' - ' + agency.agency_id;
    $.agencyAdresse_Map.text = agency.address;
    $.agencyPhone_Map.text = agency.phone[0];
    $.agencyEmail_Map.text = agency.email;
    $.agencyDetailsCard.show();
    if (!$.agencyDetailsCard.visible) {
        $.agencyDetailsCard.height = 10;
        $.agencyDetailsCard.animate({
            height : Ti.UI.SIZE,
            duration: 300,
        });
    }
    $.moreDetails.addEventListener('click',(e)=>{
        navManager.openWindow("/Agence/details",1,{item:agency});
    })
}

function closeCard(e){
    $.agencyDetailsCard.animate({
        height : 50,
        duration: 300,
    },()=>{
        $.agencyDetailsCard.hide();
    });
    if (selectedAnnotation) {
        selectedAnnotation.customView.children[0].width = 40;
        selectedAnnotation.customView.children[1].width = 15;
        selectedAnnotation = null;
    }
}
