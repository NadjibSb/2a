// DEPENDENCIES ------------------------------------------------------------
var log = require( 'utility/logger' )({
        tag: "Divers_Notifications",
        hideLog: false
    }),
    dataService = require("/dataHandler/dataService");
    navManager = require("/utility/navmanager");



// PRIVATE VAR ------------------------------------------------------------
const CONTRACT='Contrat',SINISTRE='Sinistre';
var notifications = [],
    page = 1;



// CONSTRUCTOR ------------------------------------------------------------
(function constructor(){
    setup_refreshController();
    $.customIndicator.show();
    loadNextPage(()=>{
        $.customIndicator.hide();
    });
})();






// EVENT HANDLERS ------------------------------------------------------------
function pressBack(e){
    log("test press")
    navManager.closeWindow($.notification)
  }

function onMarkerReached(e){
    loadNextPage();
}

function onItemClick(e){
    let item = notifications[e.itemIndex];
    log('onItemClick');
    log(item);
    switch (item.category) {
        case CONTRACT:
            log(item);
            navManager.openWindow("/Contract/detail",1,{data:item});
            break;
        case SINISTRE:
            log(item);
            navManager.openWindow("/Sinistres/Details/details",1,{data:item});
            break;
        default:
            log(item);
    }
}


// PRIVATE FUNCTIONS ------------------------------------------------------------

function loadNextPage(callback){
    log("load page " +page);
    dataService.getNotificationsPerPage(page,
        (response)=>{
            if (response.list.length>0) {
                if(page==1){$.notifSection.items = []} // initialize in case of pull to refreshstart
                notifications.push(...response.list);
                displayList(response.list);
            }else if(notifications.length==0){
                displayEmptyList();
            }
            _.isFunction( callback ) && callback();
            page++;
        },
        (error)=>{
            log(error);
            if (notifications.length==0) {
                displayEmptyList();
            }
            _.isFunction( callback ) && callback();
        }
    )
}

function displayList(list){
    updateList(list);
    $.emptyList.hide();
    $.notificationsList.show();
}

function displayEmptyList(){
    $.notificationsList.hide();
    $.emptyList.show();
}


function updateList(list){
    let listToDisplay = $.notifSection.items;
    _.each(list,(item)=>{
        let image = getImage(item.type);
        listToDisplay.push({
            template: 'notifTemplate',
            icon: {image: image},
            title: {text: item.message},
            type:{text: item.category + ' - ' + item.text},
            num:{text: item.num},
            date: {text: item.timestamp}
        });
    });
    $.notifSection.items = listToDisplay;
    $.notificationsList.setMarker({
        sectionIndex:0,
        itemIndex: listToDisplay.length-4
    });

    function getImage(type){
        let image;
        switch (type) {
            case "habitat":
                image = "/images/icn_house_white.png";
                break;
            case "catnat":
                image = "/images/icn_catnat_white.png";
                break;
            case "pro":
                image = "/images/icn_building_white.png";
                break;
            case "auto":
                image = "/images/icn_cars_white.png";
                break;
            default:
                image = "/images/icn_catnat_white.png";
        }
        return image;
    }
}


function setup_refreshController(){
    var control = Ti.UI.createRefreshControl({
        tintColor: Alloy.CFG.design.colors.PrimaryColor
    });
    $.notificationsList.refreshControl = control;
    control.addEventListener('refreshstart',function(e){
        log('refreshstart');
        //initialize
        notifications = [];
        page =1;
        loadNextPage(()=>{
            control.endRefreshing();
        });
    });
}
