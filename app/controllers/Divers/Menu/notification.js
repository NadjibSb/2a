// DEPENDENCIES ------------------------------------------------------------
var log = require( 'utility/logger' )({
        tag: "notifScreen",
        hideLog: false
    }),
    dataService = require("/dataHandler/dataService");
    navManager = require("/utility/navmanager");
var args = $.args;



// PRIVATE VAR ------------------------------------------------------------
var notifications = [];


// CONSTRUCTOR ------------------------------------------------------------
(function constructor(){
    setup_refreshController();
    getData();
})();






// EVENT HANDLERS ------------------------------------------------------------
function pressBack(e){
    log("test press")
    navManager.closeWindow($.notification)
  }

function onItemClick(e){
  log(e);
}


// PRIVATE FUNCTIONS ------------------------------------------------------------

function getData(callback){
    dataService.getNotifications(
        (response)=>{
            log( response);
            let data = JSON.parse( response );
            notifications = data;
            updateList(data);
            
            _.isFunction( callback ) && callback();
        },
        (error)=>{
            log(error);
            _.isFunction( callback ) && callback();
        }
    )
}


function updateList(list){
    let listToDisplay = [];
    _.each(list,(item)=>{
        let image = getImage(item.type);
        listToDisplay.push({
            template: 'notifTemplate',
            icon: {image: image},
            title: {text: item.message},
            type:{text: item.category + ' - ' + item.text},
            num:{text: item.num},
            date: {text:'date'}
        });
    });
    $.notifSection.items = listToDisplay;

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
        getData(()=>{control.endRefreshing()});
    });
}
