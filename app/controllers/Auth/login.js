// Dependencies --------------------------------------------------------
var log = require( "/utility/logger" )( {
		tag: 'login',
		hideLog: false
	} );

const navmanager = require("/utility/navmanager"),
    httpClient = require( "/utility/httpManager" ),
    session = require("/dataHandler/session"),
    alert = require("/utility/alertManager");


// variables--------------------------------------------------------
var args = $.args;


// function
function clickLogin(e){
  var emailtest = $.textFieldEmail.isValid();
  var passwordtest = $.textFieldPassword.isValid();
  if (!emailtest || !passwordtest) {
    log("email pass not valid")
    return false
  }
  const data = {
    email : $.textFieldEmail.getValue(),
    password : $.textFieldPassword.getValue()
  }
  $.activityIndicator.show();
  log("debut de login");
  session.login(data,function onError(code,response){
    $.activityIndicator.hide();
    log(code);
    if(code) alert.show(L(code));
    else alert.show(response.error)

  })

}

function clickForgot(e){
  navmanager.openWindow("Auth/passwordForgot",0);
}

function clickInscrire(e){
  navmanager.openWindow("Auth/register",0);
}
