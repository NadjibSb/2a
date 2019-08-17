// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Agence_index",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager"),
    mapsManager = require("/utility/mapsManager"),
    MapModule = require('ti.map'),
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


// PRIVATE FUNCTIONS ------------------------------------------------------------------------------

// EVENT HANDLERS --------------------

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
    setupMaps();

}

// FUNCTIONS --------------------

function setupMaps(){
    if (mapsManager.checkConfig()) {
        Ti.Geolocation.getCurrentPosition((myPosition)=>{
            $.view_map.region = {
                latitude: myPosition.coords.latitude,
                longitude: myPosition.coords.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            };

            // Test
            var annotation = MapModule.createAnnotation({
                latitude: myPosition.coords.latitude,
                longitude: myPosition.coords.longitude,
                //title: L('agence'),
                //subtitle: 'Mountain View, CA',
                image: "/images/icn_localization_2a_blue_big.png",
                animate:true,
                myid: 1 // Custom property to uniquely identify this annotation.
            });
            var annotation2 = MapModule.createAnnotation({
                latitude: myPosition.coords.latitude-0.2,
                longitude: myPosition.coords.longitude+0.2,
                //title: L('agence'),
                //subtitle: 'Mountain View, CA',
                image: "/images/icn_localization_2a_blue.png",
                animate:true,
                myid: 1 // Custom property to uniquely identify this annotation.
            });
            $.view_map.annotations = [annotation,annotation2];
            function onClickMap(e){
                log(e);
            }
            $.view_map.addEventListener("click",onClickMap);
        });
    }else {
        // TODO: handle maps not displayed
    }
}

function addAnnotations(list){
    $.view_map.annotations = [];
    _.each(list,(item)=>{
        var annotation = MapModule.createAnnotation({
            latitude: item.ltd,
            longitude: item.lgt,
            title: L('agence') + item.region + ' - ' + item.agency_id,
            //subtitle: 'Mountain View, CA',
            pincolor: MapModule.ANNOTATION_BLUE,
            myid: item.agency_id // Custom property to uniquely identify this annotation.
        });
        $.view_map.annotations.push(annotation);
    });
}

function loadPage(id,successCallback,errorCallback){
    dataService.getAgencies(id,
        (response)=>{
            updateList(response);
            //addAnnotations(response);
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
            id:item.agency_id,
            title: {text: item.region + ' - '+ item.agency_id},
            adresse: {text: item.address},
            tlf: {text: item.phone[0]},
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
        loadPage(1,
            ()=>{
                control.endRefreshing();
            },
            ()=>{
                control.endRefreshing();
            }
        );
    });
}
