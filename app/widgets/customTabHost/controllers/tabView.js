var args = arguments[0] || {};
/*
args.title,
defaultIcon : args.defaultIcon,
selectedIcon : args.selectedIcon,
color : "white",
selectedColor : "red",
backgroundColor : "transparent",
selectedBackgroundColor : "transparent"
*/
$.tabTitle.text = args.title;
$.tabIcon.image = args.defaultIcon;
$.tabTitle.color = args.color;
if (args.tabIndex == 4) {
    $.tabSeparator.visible = false;
    // menu plus width diminué pour laisser de la place au tab edition digitale
    $.tabViewContainer.width = "18%";
}
else if(args.tabIndex == 1) {
    // tab edition digitale -> wording long.
    $.tabViewContainer.width = "22%";
}  

/*
 * update the display state of the tab.
 * selectedFlag -> bool update to selected / default state
 */
$.updateTabSelectionState = function(selectedFlag){
    if (selectedFlag) {
        $.tabIcon.image = args.selectedIcon;
        $.tabTitle.color = args.selectedColor;
    }
    else {
        $.tabIcon.image = args.defaultIcon;
        $.tabTitle.color = args.color;
    }
};

function onTabSelected(e) {
    args.onTabSelected(args.tabIndex);
}
    