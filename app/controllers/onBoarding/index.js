const navmanager = require('/utility/navmanager');

// Dependencies
var log = require( 'utility/logger' )( {
		tag: "onBoarding",
		hideLog: false
	} );


// constructor
(function contructor(){
    $.treePoint.children[ $.scrollableView.currentPage ].opacity = 1;
})();

// Events Functions
function onScrollend( e ) {
	var index = $.scrollableView.currentPage;
	for( var i = 0; i < 3; i++ ) {
		$.treePoint.children[ i ].opacity = 0.5;
	}
    $.treePoint.children[ index ].opacity = 1;
}

function onScroll(e){
    if ($.scrollableView.currentPage ==2) {
        $.btStart.title = L("on_boarding_btn_begin");
    }else {
        $.btStart.title = L("on_boarding_btn_next");
    }
}

function btnClicked(e){
    if ($.scrollableView.currentPage == 2) {
        log("Go to Login");
        Ti.App.Properties.setBool( "APP_ALREADY_OPEN", true )
        log(Ti.App.Properties.getBool( "APP_ALREADY_OPEN", false ))
        navmanager.openAndCloseAll("Auth/login",0,{});
    }else {
        $.scrollableView.moveNext();
    }
}
