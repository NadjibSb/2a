var log = require( "/utility/logger" )( {
	tag: 'navbar',
	hideLog: false
} );

$.open = function(e) {
	log("open tabhost")
	$.tabHost.open(e);
	log("fin open")
};

$.add = function(view) {
	$.tabHost.add(view);
};

$.remove = function(view) {
	$.tabHost.remove(view);
};

$.setActiveTab = function(tabIndex) {
	onTabSelected(tabIndex);
};

function getCurrentStackView() {
  Ti.API.info("la taille de stack : ",stackViewHolders[$.activeTab]);
	return stackViewHolders[$.activeTab];
};
var stackTabContact = [],
    stackTabDevis = [],
    stackTabSinistre = [],
    stackTabAgance = [],
    stackTabDivers = [];

exports.openWindow = function(windowController) {
	if (OS_ANDROID) {
		log("openWindow")
        hideAllPrevious()
		getCurrentStackView().add(windowController.container);
		getCurrentStack().push(windowController);
		callFocusOnWindow(windowController);
		fireOnChange();
	}
};
var fistTab = null;
var tabViewControllers = [];
$.activeTab = null;
// keep an array reference on all stacks to better handle the iteration over all of them.
var stackViewHolders = [$.stackContract, $.stackDevis, $.stackSinistre, $.stackAgence, $.stackDivers];

$.init = function(tabActive) {
	log("debut init")
	// --------- Tab Search ---------
	// onglet:
	var ContractTabController = createTabViewController({
		title :"Contract",
		defaultIcon : "/images/icn_checkhand_grey_tapbar.png",
		selectedIcon : "/images/icn_checkhand_blue_tapbar.png",
		tabIndex : 0
	});

	tabViewControllers.push(ContractTabController);
	$.tabBar.add(ContractTabController.getView());
	var rootControllerContract = Alloy.createController('/Contract/index');
	//---------------------------------------------

	// --------- Tab contract ---------
	var DevisTabController = createTabViewController({
		title : "Devis & Achat",
		defaultIcon : "/images/icn_devis_grey.png",
		selectedIcon : "/images/icn_devis_blue_tabbar.png",
		tabIndex : 1
	});

	tabViewControllers.push(DevisTabController);
	$.tabBar.add(DevisTabController.getView());

	var rootControllerDevis = Alloy.createController('/Devis/index');
	//---------------------------------------------

	// --------- Tab Tools ---------
	var SinistreTabController = createTabViewController({
		title : "Sinistre",
		defaultIcon : "/images/icn_sinistre_grey.png",
		selectedIcon : "/images/icn_sinistre_blue_tabbar.png",
		tabIndex : 2
	});

	tabViewControllers.push(SinistreTabController);
	$.tabBar.add(SinistreTabController.getView());

	var rootControllerSinistre = Alloy.createController('/Sinistres/index');
	//---------------------------------------------

	// --------- Tab Phonebook ---------
	var AgenceTabController = createTabViewController({
		title : "Agence",
		defaultIcon : "/images/icn_localization_grey_tapbar.png",
		selectedIcon : "/images/icn_localization_blue_tabbar.png",
		tabIndex : 3
	});

	tabViewControllers.push(AgenceTabController);
	$.tabBar.add(AgenceTabController.getView());

	var rootControllerAgence = Alloy.createController('/Agence/index');
	//---------------------------------------------

	// --------- Tab Divers ------ ---
	var DiversTabController = createTabViewController({
		title : "Divers",
		defaultIcon : "/images/icn_divers_grey_tapbar.png",
		selectedIcon : "/images/icn_divers_blue.png",
		tabIndex : 4
	});

	tabViewControllers.push(DiversTabController);
	$.tabBar.add(DiversTabController.getView());

	var rootControllerDivers = Alloy.createController('/Divers/index');
	//---------------------------------------------

	// loading the contents :
	$.stackContract.add(rootControllerContract.container);
	stackTabContact.push(rootControllerContract);
	$.stackDevis.add(rootControllerDevis.container);
	stackTabDevis.push(rootControllerDevis);
	$.stackSinistre.add(rootControllerSinistre.container);
	stackTabSinistre.push(rootControllerSinistre);
	$.stackAgence.add(rootControllerAgence.container);
	stackTabAgance.push(rootControllerAgence);
	$.stackDivers.add(rootControllerDivers.container);
	stackTabDivers.push(rootControllerDivers);
	log("avant on tab in init")
	fistTab = tabActive
};

/*
 * create the tab button not the content, just the tab : title + icon
 */
function createTabViewController(args) {
	return Widget.createController("tabView", {
		title : args.title,
		defaultIcon : args.defaultIcon,
		selectedIcon : args.selectedIcon,
		tabIndex : args.tabIndex,
		color : "rgb(168, 168, 168)",
		selectedColor : "rgb(55 ,67 ,121)",
		onTabSelected : onTabSelected
	});
}

var onTabSelected = exports.onTabSelected = function(selectedIndex) {
	log("debut on tab selected")
	if ($.activeTab !== selectedIndex) {
		log("onTabSelected : selectedindex : "+selectedIndex)
		if ($.activeTab !== null) {
			tabViewControllers[$.activeTab].updateTabSelectionState(false);
		}
		
		tabViewControllers[selectedIndex].updateTabSelectionState(true);
		displayRequestedStack(selectedIndex);
		$.activeTab = selectedIndex;
	} else {
		// on tab reselected.
		var currentStack = getCurrentStack();
		var stackViewHolder = getCurrentStackView();
		if (currentStack.length == 1) {
			// already on the root screen;
			return;
		};
		for (var i = currentStack.length - 1; i > 0; i--) {
			stackViewHolder.remove(currentStack[i].container);
			currentStack.pop();
		}
		currentStack[0].container.show()
		
	}

	fireOnChange();
	callFocusOnWindow(getCurrentStackController());
}

function displayRequestedStack(selectedIndex) {
	_.each(stackViewHolders, function(stack, index) {
		if (index == selectedIndex) {
			log("index : " +index)
			stack.visible = true;
		} else {
			stack.visible = false;
		}
	});
}

function stackOpened(e) {
	$.activity = $.tabHost.activity;
	exports.addEventListener = $.activity.addEventListener;
	onTabSelected(fistTab);

	$.activity.addEventListener('android:back', function() {
		Ti.API.info('back button pressed');
		if (userPressedBackButton() === false) {
			if ($.activeTab == 0) {
				$.activity.finish();
			} else {
				onTabSelected(0);
			}
		}
	});
}

function onStackFocused() {
	callFocusOnWindow(getCurrentStackController());
}

function userPressedBackButton() {
	var currentStack = getCurrentStack();
	if (currentStack.length == 1) {
		return false;
	}

	var controllerToPop = getCurrentStackController();
	_.isFunction(controllerToPop.onClose) && controllerToPop.onClose();
	getCurrentStackView().remove(controllerToPop.container);
	currentStack.pop();
	var topController = getCurrentStackController();
  topController.container.show();
	fireOnChange();
	callFocusOnWindow(topController);
}

exports.userPressedBackButton = userPressedBackButton;

function getCurrentStack() {
	var currentStack;

	switch ($.activeTab) {
	case 0:
		Ti.API.info('returning currentStack : Contract');
		currentStack = stackTabContact;
		break;
	case 1:
		Ti.API.info('returning currentStack : Devis');
		currentStack = stackTabDevis;
		break;
	case 2:
		Ti.API.info('returning currentStack : emploi');
		currentStack = stackTabSinistre;
		break;
	case 3:
		Ti.API.info('returning currentStack : Agence');
		currentStack = stackTabAgance;
		break;
	case 4:
		Ti.API.info('returning currentStack : Divers Divers');
		currentStack = stackTabDivers;
		break;
	default:
		break;
	}
	Ti.API.info('currentStack has ' + currentStack.length + " controllers");
	return currentStack;
}

function getCurrentStackController() {
	var currentStack = getCurrentStack();
	return currentStack[currentStack.length - 1];
}

function callFocusOnWindow(windowController) {
	windowController.getView().fireEvent("focus", {});
	if (_.isFunction(windowController.onResume)) {
		windowController.onResume();
	}
}

var fireOnChange = function() {
	try {
		$.trigger('tabChange', {
			type : 'tabHost tab changed',
			source : $.activity,
			caller : $,
			stack : getCurrentStack(),
			controller: getCurrentStackController(),
		});
	} catch(e) {
		// most likely couldn't get a reference on the activity . do nothing
	}
};

function hideAllPrevious(){
  var currentStack = getCurrentStack();
  for (var i = 0; i < currentStack.length; i++) {
    currentStack[i].container.hide();
  }
}
exports.addEventListner = $.on;

//Scotch:
$._0 = $.stackDivers;
$._1 = $.stackAgence;
$._2 = $.stackSinistre;
$._3 = $.stackDevis;
$._4 = $.stackContract;
$.__views__ = [
	$._0,
	$._1,
	$._2,
	$._3,
	$._4,
];
