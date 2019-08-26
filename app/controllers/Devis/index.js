// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var log = require( 'utility/logger' )( {
    tag: "devisScreen",
    hideLog: false
} );
var contractService = require("/dataHandler/contratService")
var session = require("/dataHandler/session")
const navManager = require("/utility/navmanager");
const alert = require("/utility/alertManager")
const component = require("/utility/componeneUtil")
const str = require("/utility/stringUtil");

//_.extend($,{
    //constructor : constructor
//})
// variable 

var buttonContainer = $.containerButton
var nonDispoContainer = $.containerDispo
//function
function avoirPhoneNumber(){
    log("avoir phone number")
    $.reesayer.hide()
    $.activityIndicator.show()
        contractService.getPhoneNumber(session.getHeader(),(res)=>{
            log(res);
            var listAppel = res.fields
            listAppel.forEach(contract => {
                remplireButton(contract.type,contract.longType,contract.phone)
            })
            $.activityIndicator.hide()
            $.scrollContainer.show()
            
        },(code,res)=>{
            log(res);
            log(code)
            $.activityIndicator.hide()
            $.scrollContainer.hide()
            $.reesayer.show()
            //alert.show("Vérifier votre connexion et réessayer")
            
        })
    
  };


function remplireButton(type,longType,phone){
    var view = Ti.UI.createView({
        color: "white",
        backgroundColor: "#374379",
        height: 46,
        borderRadius: 5,
        left: 25,
        right: 25,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 16,
            fontWeight: "semibold"
        },
        top:14
    })
    var ImageString = avoirIconButton(type)
    var image = Ti.UI.createImageView({
        left: 15,
        image : ImageString
    })
    var label = Ti.UI.createLabel({
        text : longType,
        left: 43,
        color: "#ffffff",
        font: {
            fontFamily : Alloy.CFG.design.fonts.Medium,    
          }
    })

    view.add(image)
    view.add(label)
    view.addEventListener('click',()=>{
        navManager.openWindow("/Devis/detail",1,{type : longType})
    })
    buttonContainer.add(view)

}

function avoirIconButton(type){
    var image = ""
    switch(type){
        case "habitat":
            image = "/images/icn_house_white.png"
            break;
        case "pro":
            image = "/images/icn_building_white.png"
            break;
        case "auto":
            image = "/images/icn_cars_white.png"    
            break;
        case "catnat":
            image = "/images/icn_catnat_white.png"
           break;
    }
    return image
}

function reesayer(){
    avoirPhoneNumber()
}

function avoirAgenceNonDisop(){
    var listNonDispo = [
        {
            type : "Agricole",
            icon : "/images/icn_house_white.png"
        },
        {
            type : "Tronsport",
            icon : "/images/icn_house_white.png"
        }
    ]
    // cree la liste
    listNonDispo.forEach(item =>{
        var viewContainer = Ti.UI.createView()
        component.addClass($,viewContainer,[
            "hSize",
            "vlayout"
        ])
        var view = Ti.UI.createView({
        })
        component.addClass($,view,[
            "devisButton"
        ])
        var image = Ti.UI.createImageView({
            left : 15,
            image : item.icon
        })
        var label = Ti.UI.createLabel({
            text : item.type,
            left: 43,
            color: "#ffffff",
            font: {
                fontFamily : Alloy.CFG.design.fonts.Medium,    
              }
        })
        
        //LabelDesc
        var labeldesc = Ti.UI.createLabel({
            text : "Produit bientôt disponible, pour plus d’information veuillez passer à l’agence 2a la plus proche de chez vous.",
            left:25,
            right:25,
            top : 13
        })
        component.addClass($,labeldesc,[
            "labelDivers",
            "fontMedium"
        ])

        //label Agence
        const viewAgence = Ti.UI.createView({
            right : 25,
            top : 13,
            bottom : 13
        })
        component.addClass($,viewAgence,[
            "hSize",
            "wSize",
        ])

        const imageLocation = Ti.UI.createImageView({
            image : "/images/icn_localization_gold.png"
        })
        component.addClass($,imageLocation,[
            "icon"
        ])

        const labelLocation = Ti.UI.createLabel({
            left : 20,
            font : {
                fontSize : 14,
                fontFamily: Alloy.CFG.design.fonts.Medium
            },
            color: Alloy.CFG.design.fonts.SecondaryColorDark,
        })
        str.labelStyling(labelLocation, "Agences 2a", {underline:true});
        viewAgence.add(imageLocation)
        viewAgence.add(labelLocation)
        viewAgence.addEventListener('click',()=>{
            navManager.changeTab(3)
        })
        // fin labelAgence

        view.add(image)
        view.add(label)
        viewContainer.add(view)
        viewContainer.add(labeldesc)
        viewContainer.add(viewAgence)
        nonDispoContainer.add(viewContainer) 
    })

}


//traintement

(function constructor(){
    $.reesayer.hide()
    $.scrollContainer.hide()
    avoirPhoneNumber()
    avoirAgenceNonDisop()
})()
