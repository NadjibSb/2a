var log = require( 'utility/logger' )( {
		tag: "passwordForgot",
		hideLog: false
	} );

const navmanager = require("/utility/navmanager"),
    httpClient = require( "/utility/httpManager" ),
    session = require("/dataHandler/session");


var args = $.args;

function pressBack(e){
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
		alert(L("pswdForgot_alert_success"));
		pressBack();
	},(code,response)=>{
		log(code+" "+response);
		$.activityIndicator.hide();
		alert(L("pswdForgot_alert_failed"));
	})
}
