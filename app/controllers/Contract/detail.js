// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Dependencies
var log = require( '/utility/logger' )( {
		tag: "detail_contract",
		hideLog: false
} );
var navManager = require("/utility/navmanager");
var contractService = require("/dataHandler/contratService")
var session = require("/dataHandler/session")
var stringUtil = require("/utility/stringUtil")
//Variable
const contratData = args.data;
const idContrat = contratData.id
const containerLabelView = $.details
const imageEntete  = $.topBar_img
const titleEntete = $.topBar_text
//Function
function pressBack(e){
    navManager.closeWindow($.detail);
}

function getDetail(idContrat,session){
	log("le id : "+idContrat)
	contractService.getContractDetail(idContrat,session.getHeader(),(res)=>{
		//succes
		log(res)
		remplireDetail(res)
	},(code,res)=>{
		//error
		log(res)
		log(code)
	})
}

function remplireDetail(res){
	remplireEntete(res)
	for(var attribut in res){
		log(attribut)
		createView(attribut,res[attribut])
	}
}

function createView(attribut,value){
	var view = Ti.UI.createView({
		height: Ti.UI.SIZE,
		layout: 'vertical'
	})
	var label = Ti.UI.createLabel({
		top: 16,
    	left: 0,
   		bottom: 8,
    	font: {
        	fontSize: 14,
        	fontFamily: Alloy.CFG.design.fonts.Light
    	},
		   color: Alloy.CFG.design.fonts.PrimaryColor,
		height: Ti.UI.SIZE,
	})

	var viewSeparator = Ti.UI.createView({
		height: 1,
    	backgroundColor: "rgba(151,151,151,0.2)"
	})
	label.text = attribut + " : "
	let font = {
		fontSize: 14,
		fontFamily: Alloy.CFG.design.fonts.Medium
	};
	let style = {
		font : font
	}
	stringUtil.labelStyling(label,value,style)
	view.add(label)
	view.add(viewSeparator)
	containerLabelView.add(view)
}

function remplireEntete(objectData){
	switch(objectData.type){
		case "habitat" :
			imageEntete.image = "/images/icn_house_blue_title.png"
			titleEntete.text = "Multirisque Habitation"
			break;
		case "catnat" : 
			imageEntete.image = "/images/icn_catnat_blue_title.png"
			titleEntete.text = "Catastrophes naturelles"
			break;
		case "auto" :
			imageEntete.image = "/images/icn_cars_blue_title.png"
			titleEntete.text = "Automobile" 
			break;
		case "pro":
			imageEntete.image = "/images/icn_building_blue_title.png"
			titleEntete.text = "Multirisque Professionnelle"
			break
	}
}

function DoCall(){
    log("do a call")
    if(OS_ANDROID){
        Titanium.Platform.openURL('tel:0556989898');
    }else{
        Ti.Platform.openURL('tel:055-698-9890', {
            'UIApplicationOpenURLOptionsSourceApplicationKey': true
        }, function(e) {
            Ti.API.info('URL open successfully? ' + JSON.stringify(e));
        });
    }

}

function lecteurPdf(){
	
}
//Traitment

getDetail(idContrat,session)

	