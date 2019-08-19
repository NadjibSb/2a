var log = require( 'utility/logger' )( {
    tag: "profileEditScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");
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
    // aucun champ n'a ete modifier
    if(!dejaChanger()){
      // aller a divers
      log("aucin champs n'a ete changer")
      return
    }else{
      // if format non valid
      if(email.getValue() != emailUser) email.isValid()
      if(nomClient.getValue() != nomClientUser) nomClient.isValid()
      if(prenomClient.getValue() != prenomClientUser) prenomClient.isValid()
      if(telephone.getValue() != telephoneUser) telephone.isValid()
      
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
