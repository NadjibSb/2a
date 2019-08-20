// Dependencies------------------------------------------------------------------------------
var log = require( 'utility/logger' )( {
		tag: "Contract_index",
		hideLog: false
	} ),
    navManager = require("/utility/navmanager"),
    stringUtil = require("/utility/stringUtil"),
    dataService = require("/dataHandler/contractService");



// PRIVATE VAR ----------------------------------------------------------------
const USER_CONTRACT_LIST = 0, OTHER_CONTRACT_LIST = 1;
var userContractList , otherContractList;



// TODO: when this tab is open, if the list is empty, send another request to get the list
// CONSTRUCTOR ----------------------------------------------------------------
(function constructor(){
    setup_refreshController();
    $.customIndicator.show();
    getData(()=>{
        $.customIndicator.hide();
    });
})();





// EVENT HANDLERS ----------------------------------------------------------------
function onItemClick(e){
    let list;
    e.sectionIndex == 0 ? list = userContractList : list = otherContractList;
    log("click on "+list[e.itemIndex]);
    navManager.openWindow("/Contract/detail",1,{data:list[e.itemIndex]});
}



// PRIVATE FUNCTIONS ----------------------------------------------------------------
function getData(callback){
    dataService.getContracts(
        (response)=>{
            if (response.data) {
                displayList(response.userContracts,response.otherContracts);
                userContractList = response.userContracts;
                otherContractList = response.otherContracts;
            }else{
                displayEmptyList();
            }
            _.isFunction( callback ) && callback();
        },
        (error)=>{
            log(error);
            displayEmptyList();
            _.isFunction( callback ) && callback();
        }
    );
}

function displayList(userContracts,otherContracts){
    updateList(userContracts,USER_CONTRACT_LIST);
    updateList(otherContracts,OTHER_CONTRACT_LIST);
    $.emptyList.hide();
    $.contractList.show();
}

function displayEmptyList(){
    $.contractList.hide();
    $.emptyList.show();
}

function updateList(list,listType){
    let listToDisplay = [],
        template,
        currentDate = new Date(),
        font = {
            fontSize: 14,
            fontFamily: Alloy.CFG.design.fonts.Heavy
        };
    //diffrent templates for the 2 lists
    listType == USER_CONTRACT_LIST ? template = "userContractTemplate": template = "otherContractTemplate";

    _.each(list,(item)=>{
        let image ,
            dateArgs = getDateArgs(item.EndDate,currentDate),
            addressOrVehicule=item.Address,
            addressOrVehiculeText = L("contract_adresse") ;
        // diffrent icons for each category
        switch (item.Type) {
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
                addressOrVehiculeText= L("contract_vehicule");
                addressOrVehicule = item.car_brand + " - " + item.car_model;
                image = "/images/icn_cars_white.png";
                break;
            default:
                image = "/images/icn_catnat_white.png";
        }

        // push item to display
        listToDisplay.push({
            template: template,
            name: {text:item.Name +' '+ item.Lastname},
            type: {
                text: item.Type,
                font: font
            },
            num: {text: item.Id},
            addressOrVehiculeText:{text: addressOrVehiculeText},
            addressOrVehicule: {text: addressOrVehicule},
            end: {
                text: dateArgs.text,
                color: dateArgs.color,
                font: font
            },
            icon: {image: image}
        })
    });
    if (listType == USER_CONTRACT_LIST) {
        $.userContractList.items = listToDisplay;
    }else {
        $.otherContractList.items = listToDisplay;
    }
    // private function
    function getDateArgs(givenDate,currentDate){
        let [day,month,year] = givenDate.split('/');
        let [d,m,y] = [currentDate.getDate(),currentDate.getMonth(),currentDate.getFullYear()];
        let current = (y*365) + ((m+1)*31) + d;
        let date = (parseInt(year)*365) +  (parseInt(month)*31) + parseInt(day);
        if (date-current == 0) {
            return { color: Alloy.CFG.design.fonts.RedColor, text: L('today')}; //red
        }else if (date-current == 1) {
            return { color: Alloy.CFG.design.fonts.RedColor, text: L('tomorrow')}; //red
        }else if (date-current<8) {
            return { color: Alloy.CFG.design.fonts.SecondaryColorDark, text: givenDate}; //orange
        }else {
            return { color: Alloy.CFG.design.fonts.PrimaryColor, text: givenDate}; //blue
        }
    }
}


function setup_refreshController(){
    var control = Ti.UI.createRefreshControl({
        tintColor: Alloy.CFG.design.colors.PrimaryColor
    });
    $.contractList.refreshControl = control;
    control.addEventListener('refreshstart',function(e){
        log('refreshstart');
        getData(()=>{control.endRefreshing();});
    });
}
