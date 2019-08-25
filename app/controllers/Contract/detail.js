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
var dateArgs = require("utility/dateUtil")
//Variable
const contratData = args.data;
const idContrat = contratData.id
const containerLabelView = $.details
const imageEntete  = $.topBar_img
const titleEntete = $.topBar_text
var phone="00000000000";
const containerAppel = $.containerAppel
const containerPdf = $.lecturePdfContainer
//Function
function pressBack(e){
    navManager.closeWindow($.detail);
}

function getDetail(idContrat,session){
	log("le id : "+idContrat)
	$.activityIndicator.show()
	contractService.getContractDetail(idContrat,session.getHeader(),(res)=>{
		//succes
		log(res)
		contractService.getPhoneNumber(session.getHeader(),(resPhone)=>{
			phone = setPhone(resPhone.fields)
			remplireDetail(res.fields)
			$.activityIndicator.hide()
			containerAppel.show()
			containerPdf.show()
		},(code,res)=>{
			pressBack()
		})
		
	},(code,res)=>{
		//error
		log(res)
		log(code)
		pressBack()
	})
}


function remplireDetail(res){
	remplireEntete(contratData)
	res.forEach(champ =>{
		log(champ.fieldName)
		createView(champ.fieldName,champ.value)
	})
		
}

function createView(attribut,value){
	var dateitem;
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

	if(attribut == "Date de fin d'effet du contrat"){
		dateitem = dateArgs.getDataArgs(value,new Date())
		style.color = dateitem.color
		value = dateitem.text
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

function setPhone(listNumber){
	var phoneNumber;
	listNumber.forEach(value=>{
		if(value.type == contratData.type) phoneNumber = value.phone 
	})
	return phoneNumber
}
function DoCall(){
	log(phone)
    if(OS_ANDROID){
        Titanium.Platform.openURL('tel:'+phone);
    }else{
        Ti.Platform.openURL('tel:'+phone, {
            'UIApplicationOpenURLOptionsSourceApplicationKey': true
        }, function(e) {
            Ti.API.info('URL open successfully? ' + JSON.stringify(e));
        });
    }

}

function lecteurPdf(){
	navManager.openWindow("/Contract/pdfAffichage")
}
//Traitment
containerAppel.hide()
containerPdf.hide()
getDetail(idContrat,session)

