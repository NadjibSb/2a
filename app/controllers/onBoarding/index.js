// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

(function contructor(){
    $.treePoint.children[ $.scrollableView.currentPage ].opacity = 1;
})();


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
        Ti.API.info('Go to Login');
    }else {
        $.scrollableView.moveNext();
    }
}
