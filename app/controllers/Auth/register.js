const navmanager = require("/utility/navmanager");
var log = require( 'utility/logger' )( {
		tag: "registre",
		hideLog: false
	} );
// Arguments passed into this controller can be accessed via the `$.args` object directly or:

//variable
var args = $.args;
var ouiCheck = $.imageUnchecked
var nonCheck = $.imageChecked
var clientContainer = $.clientContainer
var accepte = false
var enableClientNum = false
var email = $.textFieldEmailR
var telephone =$.textFieldNumTel
var numClient = $.textFieldNumClient
var nomClient = $.textFieldNom
var prenomClient = $.textFieldPrenom
var passwordCLient = $.textFieldPasswordR
//function
function pressBack(e){
  log("test press")
  navmanager.closeWindow($.register,0)
}

function enableClientNum(e){
	e.source.image = "/images/icn_oval_checked.png";
	nonCheck.image = "/images/icn_oval_unchecked.png"
	clientContainer.height = Ti.UI.SIZE
	enableClientNum = true
}

function disableClientNum(e){
	e.source.image = "/images/icn_oval_checked.png";
	ouiCheck.image = "/images/icn_oval_unchecked.png"
	clientContainer.height = 0
	enableClientNum = false
}

function acceptCondition(e){
	if(accepte){
		e.source.image="/images/icn_oval_unchecked.png"
		accepte=false
	}else{
		e.source.image = "/images/icn_oval_checked.png";
		accepte=true
	} 
}

function registerButton(e){
	emailTest = email.isValid();
	numTelephoneTest = telephone.isValid();
	if(enableClientNum) numCLient = numClient.isValid();
	nomTest = nomClient.isValid();
	prenomTest = prenomClient.isValid();
	passwordTest = passwordCLient.isValid();
	if (champVide()) alert("Tous les champs du formulaire doivent être renseignés")
}

function champVide(){
	if(email.getValue() == "" || telephone.getValue() == "" || (enableClientNum && numClient.getValue() == "" ) || nomClient.getValue() == "" || prenomClient.getValue() == "" || passwordCLient.getValue() == ""){
		return true
	}
	return false
}


// traitement
