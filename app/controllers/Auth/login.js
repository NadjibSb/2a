// Arguments passed into this controller can be accessed via the `$.args` object directly or:

//variable
var args = $.args;


// function
function clickLogin(e){
  var emailtest = $.textFieldEmail.isValid();
  var passwordtest = $.textFieldPassword.isValid();


}
function clickForgot(e){
  Alloy.createController("/Auth/passwordForgot").getView().open();
  $.login.close();
}

function clickInscrire(e){
  Alloy.createController("/Auth/register").getView().open();
  $.login.close();
}

// traintement

$.login.open()
