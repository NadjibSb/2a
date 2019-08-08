// Exemple of httpManager
/*
var session = require('/dataHandler/session');
var log = require( 'utility/logger' )( {
		tag: "index",
		hideLog: false
	} );



var data = {
    email: "a@a.com",
    password: "000"
};

session.login(
    data,
    (s)=>{
        log("success "+s);
    },
    (e)=>{
        log("error "+e);
    }
);
*/
// end of exemple -------------------------

//Alloy.createController("/onBoarding/index").getView().open();
//Alloy.createController("/Home/index").getView().open();
//Alloy.createController("/Sinistres/index").getView().open();
//Alloy.createController("/Sinistres/Details/details").getView().open();
const navigationWindow = require('/utility/navmanager')

var isLoginIn = true;
var appalready = true;

function init(){
  Ti.API.info("init");
  var rootView;
  if (isLoginIn) {
    Ti.API.info("islogdin");
    rootView = "tabs/index";
    navigationWindow.setTabGroup(rootView)
  }else{
    if (appalready) {
      //rootView = "Auth/login";
    }else {
      rootView = "onBoarding/index";
    }
    navigationWindow.openWindow(rootView,0,{});
  }

}
init()
