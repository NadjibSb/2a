const navmanager = require("/utility/navmanager");
var log = require( 'utility/logger' )( {
		tag: "passwordForgot",
		hideLog: false
	} );
httpClient = require( "/utility/httpManager" );
session = require("/dataHandler/session");
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function pressBack(e){
  log("test press")
  navmanager.closeWindow($.passwordForgot,0)
}
function resetPassword(){
	var emailtest = $.textFieldemailForgot.isValid();
	if (!emailtest) {
		log("email pass not valid")
		return false
	}
	const data = {
		email : $.textFieldemailForgot.getValue(),
	}
	$.activityIndicator.show();
	log("debut de requete de forgot")
	session.resetPassword(data,e=>{
		log(e.message);
		$.activityIndicator.hide();
		alert('E-mail de réinitialisation du mot de passe envoyé')
		pressBack();
	},(code,response)=>{
		log(e+" "+response);
		$.activityIndicator.hide();
		alert('L’utilisateur n’existe pas, veuillez vérifier l’identifiant spécifié')
	})
}
