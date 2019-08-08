var tabGroup;
var stackController = [];
var controllerGarbage;
var test = "t";
var currentNavWindow= null;

// set Tabgroup
exports.setTabGroup = function(path) {
  // sauvgarder tab group
  var controller = Alloy.createController(path, {});
	tabGroup = controller.tabGroup;
  //si android
	if (OS_ANDROID) {
		tabGroup.init();
		tabGroup.on('tabChange', function(evt) {
			updateTitle(evt);
		});
		exports.userPressedBackButton = tabGroup.userPressedBackButton;
	}
  controller.getView().open();
  if (OS_IOS && currentNavWindow) {
    currentNavWindow.close();
    currentNavWindow = null;
  }


};

// open the window
var openWindow = exports.openWindow = function(path,tabgroup=1,params=null) {
	try {
		var controller = Alloy.createController(path, params);
    Ti.API.info("taille stack cont :"+tailleStack(stackController));
    // si tabgroup
    if (tabgroup) {
      if (OS_ANDROID) {
  			tabGroup.openWindow(controller);
  		} else {
        Ti.API.info("in ios tab group");
  			tabGroup.activeTab.open(controller.getView());
  		}
    // sinon tab group
    }else{
      stackController.push(controller);
      Ti.API.info("taille stack apres push cont :"+tailleStack(stackController));
      // si android
      if (OS_ANDROID) {
        // quand on press back
        controller.getView().addEventListener('android:back',()=>{
          var cont = stackController.pop();
          Ti.API.info("apres le pop :"+tailleStack(stackController));
          cont.getView().close();
        })
        //ouvrire la view
        controller.getView().open();
      //sinon ios
      }else{
        Ti.API.info("je suis sur ios");
        if(currentNavWindow){
          //il existe deja un nav windows
          Ti.API.info("there is a navwindow");
          currentNavWindow.openWindow(controller.getView());
        }else{
          // il n'existe pas deja un navigationWindow
          var navigationWindow = Ti.UI.createNavigationWindow( {
      			window: controller.getView(),
      		} );
          navigationWindow.hideNavBar();
          controller.closeWindow = function(  ) {
      			navigationWindow.popToRootWindow();
      			navigationWindow.close();
      		};
          currentNavWindow = navigationWindow;
          currentNavWindow.open()
        }
      }
    }
		return controller;
	} catch(e) {
    Ti.API.info(e);
	}
};

// to close window
var closeWindow = exports.closeWindow = function(window,tabgroup=1) {
  if (tabgroup) {
    if (OS_IOS) {
      Ti.API.info("close window");
  		tabGroup.activeTab.close(window);
  	} else {
        tabGroup.userPressedBackButton();
  	}
    // if not tab group
  }else{

  }
};

// pour ouvrire un liste de window et
exports.openAndCloseAll = function(path,tabgroup,params){
  if(OS_ANDROID){
    var stack = stackController;
    stackController=[];
    Ti.API.info(stack.length);
    openWindow(path,tabgroup,params);
    // vider la liste
    for (var i = 0; i < stack.length; i++) {
      var cont=stack.pop();
      cont.getView().close();
    }

    Ti.API.info("after boucle stack "+tailleStack(stackController));
  }else{
    tmpControllers=currentNavWindow;
    currentNavWindow = null;
    openWindow(path,tabgroup,params);
    tmpControllers.close();

  }
};

var previousEvent;
var previousStackSize = 0;
var tailleStack = function(stackController){
  return stackController.length
}
var updateTitle = function(evt) {
	var $$ = evt.caller;
	var currentStack = evt.stack;
	var view = $$.viewTitle;
	var controller = evt.controller;
	var title = evt.controller.getView().title;

	if(previousEvent && _.isFunction(previousEvent.controller.cleanupTitle)){
		previousEvent.controller.cleanupTitle(view, title, $$);
	}

	if (_.isFunction(controller.updateTitle)){// La priorité au callback s'il existe
		evt.controller.updateTitle(view, title, $$);
	}else if (currentStack.length > 1) {
		view.removeAllChildren();
		titleViews.oneLabel(view, controller.getView().title);
	} else if(previousStackSize != 1) {
		view.removeAllChildren();
		titleViews.logo(view);
	}

	previousEvent = evt;
	previousStackSize = currentStack.length;
};
