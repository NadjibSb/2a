// PUBLIC INTERFACE
_.extend( $, {
	show: show,
	hide: hide,
	setMessage : setMessage,
	refreshContainer : refreshContainer,
	visible: false

} );

// PRIVATE FUNCTION

function show() {
	$.visible = true;
	$.activityIndicator.show();
	$.container.show();
}

function hide() {
	$.visible = false;
	$.container.hide();
	$.activityIndicator.hide();
}


function setMessage(message){
	$.activityIndicator.message = message;
}

function refreshContainer(){
	$.activityContainer.width = Titanium.UI.SIZE;
}
