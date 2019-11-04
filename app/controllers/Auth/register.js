var log = require( 'utility/logger' )( {
		tag: "registre",
		hideLog: false
	} );

const navmanager = require("/utility/navmanager"),
    httpClient = require( "/utility/httpManager" ),
    session = require("/dataHandler/session"),
    alertManager = require("/utility/alertManager");

//variable
var args = $.args,
    ouiCheck = $.imageUnchecked,
    nonCheck = $.imageChecked,
    clientContainer = $.clientContainer,
    accepte = false,
    enableClientNum = false,
    email = $.textFieldEmailR,
    telephone =$.textFieldNumTel,
    numClient = $.textFieldNumClient,
    nomClient = $.textFieldNom,
    prenomClient = $.textFieldPrenom,
    passwordCLient = $.textFieldPasswordR ,
    listCivilite = [
    	L("Mr"),
    	L("Mme")
    ],
    civiliteChoisie = {
    	choisie : false,
    	text : ""
    },
    colorLabelCivilite = Alloy.CFG.design.fonts.PrimaryColor;

//function
function pressBack(e){
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
		alertManager.show(L("signin_alert_fill_all_fields"))
		return false;
	}
	if(!emailTest || !numTelephoneTest || !nomTest || !prenomTest || !passwordCLient || (enableClientNum && !enableClientNum) ){
		return false
	}
	if(accepte){
		// traitement en cas de validite
		const title = ((civiliteChoisie.text == L("Mr")) ? 1 : 0)
		const userData = {
			email : email.getValue(),
			password : passwordCLient.getValue(),
			lastname : prenomClient.getValue(),
			name : nomClient.getValue(),
			phone : telephone.getValue(),
			title : title,
		}
		if(enableClientNum){
			userData.aa_client_id = numClient.getValue();
		}
		$.activityIndicator.show();
		//envoyer requete
		session.signup(userData,(code,response)=>{
			$.activityIndicator.hide();
			log(response)
			if(code == "HTTP_CLIENT_NETWORK_OFFLINE") alertManager.show(L("HTTP_CLIENT_NETWORK_OFFLINE"));
			else{
				var listError = response.errors
				var numberError = response.errors.length
				log(listError)
				log("nombre : "+numberError)
				if(numberError > 1){
					alertManager.show(response.errorMessage)
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
			}
		})
	}// fin if accepte
	else{
		alertManager.show(L("signin_alert_accept_conditions"))
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
		title : L("signin_status_hint")
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
