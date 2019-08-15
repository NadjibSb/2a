const navmanager = require("/utility/navmanager");
var log = require( "/utility/logger" )( {
		tag: 'home',
		hideLog: false
	} );

// Arguments passed into this controller can be accessed via the `$.args` object directly or:

// variable
var args = $.args;

// function
// click en un item pour aller a une fenetre
function clickItem(e){
  var item = e.source.itemId;
  var activeTab;
  switch(item) {
    case "Contract":
      activeTab = 0
    break;
    case "devis":
        activeTab = 1
    break;
    case "sinistre":
        activeTab = 2
    break;
    case "agence":
        activeTab = 3
    break;
    case "diver":
        activeTab = 4
    break;  
  }
  navmanager.setTabGroup("tabs/index",activeTab);
  
  // envoyer un a ecran par rapport a item
}
