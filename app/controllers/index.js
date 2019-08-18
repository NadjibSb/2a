
const navigationWindow = require('/utility/navmanager');
const session = require('/dataHandler/session');
const log = require('/utility/logger')({
  tag : "index",
  hidelag : false
})
var isLoginIn = session.isLogedIn();
var appAlready;

function init(){
  log("init");
  var rootView;
  //if (isLoginIn) {
    if(true){
    log("islogdin");
    rootView = "Home/index"; 
    //navigationWindow.setTabGroup(rootView)
  }else{
    var appAlready = Ti.App.Properties.getBool( "APP_ALREADY_OPEN", false );
    if (appAlready) {
      log("login")
      rootView = "Auth/login";
    }else {
      log("boarding")
      rootView = "onBoarding/index";
    }
    log("openLog")
    
  }
  navigationWindow.openWindow(rootView,0,{});
}
init()
