const navmanager = require("/utility/navmanager");
var log = require( 'utility/logger' )( {
		tag: "registre",
		hideLog: false
	} );
httpClient = require( "/utility/httpManager" );
session = require("/dataHandler/session");
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
var listCivilite = [
	'Mr',
	'Mme'
];
var civiliteChoisie = {
	choisie : false,
	text : ""
};
const colorLabelCivilite = "#374379"
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
	// savoir si les champs sont valide
	emailTest = email.isValid();
	numTelephoneTest = telephone.isValid();
	if(enableClientNum) numCLient = numClient.isValid();
	nomTest = nomClient.isValid();
	prenomTest = prenomClient.isValid();
	passwordTest = passwordCLient.isValid();
	if(!civiliteChoisie.choisie) $.labelErreur.height = Ti.UI.SIZE
	else $.labelErreur.height=0
	// traitement a faire en cas de non validite
	if (champVide()){
		alert("Tous les champs du formulaire doivent être renseignés")
		return false;
	} 
	if(!emailTest || !numTelephoneTest || !nomTest || !prenomTest || !passwordCLient || (enableClientNum && !enableClientNum) ){
		return false
	}
	if(accepte){
		// traitement en cas de validite
		const title = ((civiliteChoisie.text == "Mr") ? 1 : 0)
		const userData = {
			email : email.getValue(),
			password : passwordCLient.getValue(),
			lastname : prenomClient.getValue(),
			name : nomClient.getValue(),
			phone : telephone.getValue(),
			title : title
		}
		if(enableClientNum){
			userData.aa_client_id = numClient.getValue();
		}
		$.activityIndicator.show();
		//envoyer requete
		session.signup(userData,(code,response)=>{
			$.activityIndicator.hide();
			log(response)
		})
	}// fin if accepte
	else{
		alert("Veuillez vous accepter les condition d'utilisation et la politique de Confidentialité")
	}
	

}

function champVide(){
	if(email.getValue() == "" || telephone.getValue() == "" || (enableClientNum && numClient.getValue() == "" ) || nomClient.getValue() == "" || prenomClient.getValue() == "" || passwordCLient.getValue() == "" || civiliteChoisie.choisie == false){
		return true
	}
	return false
}

function clickRecuperation(e){
	navmanager.openWindow("Auth/recuperationContract",0);
}

function toCondition(e){
	navmanager.openWindow("Auth/confidentialite",0);
}

function toPolitique(e){
	navmanager.openWindow("Auth/politique",0);
}

function changeCivilite(e){
	const options = {
		options : listCivilite,
		title : "Civilité"
	}

	const dialogCivilite = Ti.UI.createOptionDialog(options);
	dialogCivilite.show()
	dialogCivilite.addEventListener('click',(e)=>{
		const selectedIndex = e.index;
		$.labelCivilite.text = listCivilite[selectedIndex]
		$.labelCivilite.color = colorLabelCivilite
		civiliteChoisie.text = listCivilite[selectedIndex]
		civiliteChoisie.choisie = true
	})
	
}
// traitement
