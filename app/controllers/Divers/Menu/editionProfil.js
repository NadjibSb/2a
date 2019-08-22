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
var values = []
// selectedValues
var selected_values=[]
var selected_value_id_original=[]
//variable


//function
function pressBack(e){
  log("test press")
  navManager.closeWindow($.editionProfil)
}
function changeExpiration(){
  log(values)
  log(selected_values)
  navManager.openWindow("Divers/Menu/select",1,{
    onSelect : onSelect,
    values : values,
    selected_values : selected_values
  })  
}

function SauvgarderButton(){
    var emailTest,nomTest,prenomTest,telephoneTest = null
    // aucun champ n'a ete modifier
    var changedSelect = selectedIsChanged()
    if(champVide()){
      alert.show("Tous les champs du formulaire doivent être renseignés")
      return
    }
    if(!dejaChanger() && !changedSelect.isChanged){
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
      // en cas de format non valid
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
        if(changedSelect.isChanged) userUpdateData.selected = changedSelect.selected_value_id
        
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
          pressBack()  
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
              case "200" :
                log("error tel")
                telephone.setInvalid(objectValid)
              break;
              case "201" : 
              log("error email")
                email.setInvalid(objectValid)
              break;
              case "202" : 
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
  getDataSelection()
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
  log(selectedIsChanged())
  selected_values = list
  if(list.length == 0) expiration.text = "Jamais"
  else if(list.length === 1){
    expiration.text = ""
    list.forEach(value => {
    expiration.text += value.text
  })
  }else{
    expiration.text = "Sélections miltiples"
  }
}


function getDataSelection(){
  var token = Ti.App.Properties.getString( Alloy.Globals.SESSION_ID, null );
  var header = {
    Authorization : "Bearer "+token
  }
  $.activityIndicator.show();
  notification.getExperation(header,(response)=>{
    $.activityIndicator.hide();
    /*response.forEach(value =>{
      values.push(value)
    })*/
    //log(values)
    log(response)
    values= response.values
    // en cas pas de selected
    if(response.selected !== undefined){
      selected = response.selected
      selected_value_id_original = response.selected
      values.forEach(value =>{
        selected.forEach(id =>{
          if(value.id == id) {
            selected_values.push(value)
          }
        })
      })
    }
    onSelect(selected_values)
  },(code,response)=>{
    $.activityIndicator.hide();
  })
}


// test id selected are changed
function selectedIsChanged(){
  
  var isChanged = false
  var exist = false
  var selected_values_id=[] // selectesValue
  selected_values.forEach(value =>{
    selected_values_id.push(value.id)
  })
  log(selected_value_id_original)
  log(selected_values_id)
  if(selected_value_id_original.length != selected_values_id.length) isChanged = true
  else{
    selected_value_id_original.forEach(original_id=>{
      selected_values_id.forEach(id=>{
         if(original_id === id) exist = true              
      })
      log("exist"+exist)
      if(!exist) {
        isChanged = true
      }
   })
  }
  return {
    isChanged : isChanged,
    selected_value_id : selected_values_id
  }
}
//traitement

remplireData()
