// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var log = require( 'utility/logger' )( {
		tag: "Home_index",
		hideLog: false
	} );
// variable
var args = $.args;

// function
// click en un item pour aller a une fenetre
function clickItem(e){
  var item = e.source.itemId;
  log(item)
  // envoyer un a ecran par rapport a item
}
