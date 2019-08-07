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
Alloy.createController("/Sinistres/Details/details").getView().open();
