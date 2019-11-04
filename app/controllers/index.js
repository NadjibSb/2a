const log = require('/utility/logger')({
          tag : "index",
          hidelag : false
      });
const navigationWindow = require('/utility/navmanager'),
    session = require('/dataHandler/session'),
    properties = require("/dataHandler/properties");


var isLoginIn = session.isLogedIn();
var appAlready;

function init(){
  log("____init____");
  var rootView;
  log(isLoginIn, "is loged in");
  if (isLoginIn) {
    rootView = "Home/index";
    //navigationWindow.setTabGroup(rootView)
  }else{
    var appAlready = properties.isAppAlreadyOpen();
    if (appAlready) {
      log("login", "go to");
      rootView = "Auth/login";
    }else {
      log("boarding", "go to");
      rootView = "onBoarding/index";
    }
  }
  navigationWindow.openWindow(rootView,0,{});
}
init()
