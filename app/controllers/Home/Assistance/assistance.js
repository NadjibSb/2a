//Dependencies
var log = require( 'utility/logger' )( {
    tag: "assistance_home",
    hideLog: false
} );
var contractService = require("/dataHandler/contratService")
var session = require("/dataHandler/session")

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var dejaOuvert = false;


//variable
var rootContainer  = $.listAppelContainer
var buttonContainer = $.containerButton
//function
exports.open = function open(){
    avoirPhoneNumber()
    log("enter " + rootContainer.height);
    rootContainer.show();
    // restore scale
    var matrix2d = Ti.UI.createMatrix2D();
    matrix2d = matrix2d.scale(1,1);
    rootContainer.animate({
          duration: 1,
          transform: matrix2d
        },()=>{
            log("visible "+rootContainer.visible);
            rootContainer.animate({
                height : '50%',
                top:"25%",
                opacity:1,
                duration: 300,
            });
            
    });
}

function close(e){
    var matrix2d = Ti.UI.createMatrix2D();
    matrix2d = matrix2d.scale(0.2,0.2);
    rootContainer.animate({
          top: "100%",
          opacity:0.1,
          duration: 400,
          transform: matrix2d
        },()=>{
            rootContainer.hide();
    });
    log(e.source)
    // renvoie du close event
    $.trigger('close', _.extend(e.source,{id:"test"}));
}

exports.remplireButton = function remplireButton(type,longType,phone){
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
        require("/utility/callUtil").doCall(phone)
    })
    buttonContainer.add(view)

}


exports.avoirPhoneNumber = function avoirPhoneNumber(){
    log("avoir phone number")
    if(!dejaOuvert){
        contractService.getPhoneNumber(session.getHeader(),(res)=>{
            log(res);
            var listAppel = res.fields
            listAppel.forEach(contract => {
                remplireButton(contract.type,contract.longType,contract.phone)
            })
            dejaOuvert=true
        },(code,res)=>{
            log(res);
            log(code)
        })
    }
  };

exports.avoirIconButton = function avoirIconButton(type){
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
//Traitement
