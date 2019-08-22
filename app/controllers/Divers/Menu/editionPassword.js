var log = require( 'utility/logger' )( {
    tag: "passEditScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");
const session = require("/dataHandler/session");
const alert = require("//utility/alertManager")
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var dataUser = Ti.App.Properties.getObject( "SESSION_DATA", null )


//variable
var passwordUser = dataUser.password
var passwordA = $.textFieldPasswordR
var passwordN =$.textFieldPasswordN
var passwordC = $.textFieldPasswordC

//function
function pressBack(e){
    log("test press")
    navManager.closeWindow($.editionPassword)
}
function SauvgarderButton(){
  // si les champs sont vide
  if(champVide()){
    alert.show({
      title : "Formulaire incomplet",
      message : "Tous les champs du formulaire doivent être renseignés"
    })
    return 
  }
  
  //validite
  passwordATest = passwordA.isValid();
  passwordNTest = passwordN.isValid();
  passwordCTest = passwordC.isValid();
  if(!passwordATest || !passwordNTest || !passwordCTest) return

  if(passwordN.getValue() !== passwordC.getValue()){
    passwordC.setInvalid({
      valid : false,
      message : "Les deux mots de passe ne correspondent pas"
    })
    return
  } 
  
  // if valid
  var token = Ti.App.Properties.getString( Alloy.Globals.SESSION_ID, null );
        const userUpdatepassword = {
          currentPassword : passwordA.getValue(),
			    password : passwordN.getValue(),
			  }
        const header = {
          Authorization : "Bearer "+token
        }
  $.activityIndicator.show();
  session.changePassword(userUpdatepassword,header,()=>{
    //succes
    $.activityIndicator.hide();
    alert.show("Mot de passe changé avec succes")
    //go to divers
  },(code,response)=>{
    //error
    $.activityIndicator.hide();
			var listError = response.errors[0]
			var numberError = response.errors.length
			log(listError)
			log("nombre : "+numberError)
				var objectValid = {valid : false, message :listError.message};
				passwordA.setInvalid(objectValid)
  })

}

function champVide(){
  if(passwordA.getValue() == "" || passwordN.getValue() =="" || passwordC.getValue()=="") return true
  return false

}

//traitement