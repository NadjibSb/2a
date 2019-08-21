var log = require( 'utility/logger' )( {
    tag: "profileEditScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");
const session = require("/dataHandler/session");
const alert = require("/utility/alertManager");
const notification = require("/dataHandler/notificationHandler")
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
var expiration = $.labelExpiration
const listValueExperiation = {}
//variable


//function
function pressBack(e){
  log("test press")
  navManager.closeWindow($.editionProfil)
}
function changeExpiration(){
  var token = Ti.App.Properties.getString( Alloy.Globals.SESSION_ID, null );
  var header = {
    Authorization : "Bearer "+token
  }
  $.activityIndicator.show();
  var values = [
    {
        id : 1,
        text : "1 semaine",
        days : 7   
    },
    {
        id : 2,
        text : "2 semaine",
        days : 7  
    },
    {
        id : 3,
        text : "3 semaine",
        days : 7  
    },
    {   
        id : 4,
        text : "4 semaine",
        days : 7  
    }
  ];
  var selected_values = [
    {
      id : 1,
      text : "1 semaine",
      days : 7  
    }
  ]
  notification.getExperation(header,(response)=>{
    $.activityIndicator.hide();
    /*response.forEach(value =>{
      values.push(value)
    })*/
    //log(values)
    log(response)
    navManager.openWindow("Divers/Menu/select",1,{
      onSelect : onSelect,
      values : values,
      selected_values : selected_values
    })
  },(code,response)=>{
    $.activityIndicator.hide();
  })
  
}

function SauvgarderButton(){
    var emailTest,nomTest,prenomTest,telephoneTest = null
    // aucun champ n'a ete modifier

    if(champVide()){
      alert.show("Tous les champs du formulaire doivent être renseignés")
      return
    }
    if(!dejaChanger()){
      // aller a divers
      navManager.closeWindow($.editionProfil)
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
        const userUpdateData = {}
        if(email.getValue() != emailUser) userUpdateData.email = email.getValue()
        if(prenomClient.getValue() != prenomClientUser) userUpdateData.lastname = prenomClient.getValue()
        if(nomClient.getValue()!= nomClientUser) userUpdateData.name = nomClient.getValue()
        if(telephone.getValue() != telephoneUser) userUpdateData.phone = telephone.getValue()

        log(userUpdateData)
        const header = {
          Authorization : "Bearer "+token
        }
        for( var key in header ) {
          log( key + header[ key ] );
        }
        $.activityIndicator.show();
        session.updateUserData(userUpdateData,header,function(){
          $.activityIndicator.hide();
          log("succes")  
        },(code,response)=>{
          $.activityIndicator.hide();
          var listError = response.errors
          var numberError = response.errors.length
          log(listError)
          log("nombre : "+numberError)
          if(numberError > 1){
            // en cas de probleme
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

// return true if there is a empty champ
function champVide(){
    if(email.getValue() == "" || prenomClient.getValue() =="" || nomClient.getValue()=="" || telephone.getValue() == "") return true
    return false

}

function onSelect(list){
  if(list.length == 0) expiration.text = "Jamais"
  else{
    expiration.text = ""
    list.forEach(value => {
    expiration.text += value.text+", "
  })
  }
}
//traitement

remplireData()
