var log = require( 'utility/logger' )( {
    tag: "profileEditScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");
const session = require("/dataHandler/session");
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var dataUser = Ti.App.Properties.getObject( "SESSION_DATA", null )
var emailUser = dataUser.email
var telephoneUser = dataUser.phone
var nomClientUser = dataUser.name
var prenomClientUser = dataUser.lastname
var email = $.textFieldEmailR
var telephone =$.textFieldNumTel
var nomClient = $.textFieldNom
var prenomClient = $.textFieldPrenom
//variable


//function
function pressBack(e){
    log("test press")
    navManager.closeWindow($.editionProfil)
  }

function changeExpiration(){

}

function SauvgarderButton(){
    var emailTest,nomTest,prenomTest,telephoneTest = null
    // aucun champ n'a ete modifier
    if(!dejaChanger()){
      // aller a divers
      log("aucin champs n'a ete changer")
      return
    }else{
      // if format non valid
      emailTest = email.isValid()
      nomTest = nomClient.isValid()
      prenomTest = prenomClient.isValid()
      telephoneTest = telephone.isValid()
      log("verifier le format")
      log(emailTest)
      log(telephoneTest)
      log(nomTest)
      log(prenomTest)
      if(!emailTest || !telephoneTest || !nomTest || !prenomTest ){
        log("return because false format")
        return false
      }else{
        var token = Ti.App.Properties.getString( Alloy.Globals.SESSION_ID, null );
        const userUpdateData = {
          email : email.getValue(),
			    lastname : prenomClient.getValue(),
			    name : nomClient.getValue(),
			    phone : telephone.getValue(),
        }
        const header = {
          Authorization : "Bearer "+token
        }
        $.activityIndicator.show();
        session.updateUserData(userUpdateData,header,(res)=>{
          log("succes")  
        },(code,response)=>{
          $.activityIndicator.hide();
          var listError = response.errors
          var numberError = response.errors.length
          log(listError)
          log("nombre : "+numberError)
          if(numberError > 1){
            alert(response.errorMessage)
          } 
          listError.forEach((error,index)=>{
            var objectValid = {valid : false, message :error[0].message};
            log(error[0].code)
            switch(error[0].code){
              case "128" :
                log("error tel")
                telephone.setInvalid(objectValid)
              break;
              case "129" : 
              log("error email")
                email.setInvalid(objectValid)
              break;
              case "130" : 
              log("error client");
                numClient.setInvalid(objectValid)
              break;
            }
          })
        })
      } 
    }
}

function toEditPassword(){
  navManager.openWindow("Divers/Menu/editionPassword")
}

function remplireData(){
  email.setValue(emailUser)
  prenomClient.setValue(prenomClientUser)
  nomClient.setValue(nomClientUser)
  telephone.setValue(telephoneUser)
}

// savoir si deja une valeur a ete changer
function dejaChanger(){
  if(email.getValue() == emailUser && prenomClient.getValue() == prenomClientUser && nomClient.getValue()==nomClientUser && telephone.getValue() == telephoneUser) return false
  return true
}
//traitement

remplireData()
