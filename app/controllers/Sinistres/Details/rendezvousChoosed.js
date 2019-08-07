var str = require('/utility/stringUtil');

//constructor ------------------------------------
(function constructor(){

    // fill the choosen expert details
    str.labelStyling($.choisenExpert,"Ali benDahou");
    str.labelStyling($.dateRendezvous,"13/02/2019", Alloy.CFG.design.fonts.SecondaryColorDark);
    str.labelStyling($.numtlf,"0553859482", Alloy.CFG.design.fonts.SecondaryColorDark);
})();


// public functions ------------------------------------
exports.open = function(button,buttonText){
    var container = Ti.UI.createView({
        height: Ti.UI.SIZE
    });
    container.add($.expertDetails);
    return container; // return a view
}
exports.close = function(){
    $.expertDetails.hide()
}

// private functions ------------------------------------
