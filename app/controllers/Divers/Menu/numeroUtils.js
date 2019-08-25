var log = require( 'utility/logger' )( {
    tag: "numeroutilScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");
const dataService = require("/dataHandler/dataService")
const session = require("/dataHandler/session")
var stringUtil = require("/utility/stringUtil")
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var containerScroll = $.scrollContainer
var labelContainer = $.labelEntete
//variable


//function
function pressBack(e){
    log("test press")
    navManager.closeWindow($.numeroUtils)
}


function getNumeroContact(){
  $.activityIndicator.show()
  dataService.getPhoneContact(session.getHeader(),(res)=>{
    log(res)
    remplireView(res)
    labelContainer.show()
    $.activityIndicator.hide()

  },(code,res)=>{
    log(res)
    log(code)
    pressBack()
  })
}

function remplireView(phones){
  for(category in phones){
    remplireCategorieView(category,phones[category])
  }
}

function remplireCategorieView(category,phones){
  // for one category
  addCategory(category)
  // for name in category
  addPhones(phones)
  //add to view
}


function addClass(view,listClass){
  listClass.forEach(classs =>{
    $.addClass(view,classs)
  })
}


function addCategory(category){
  var categoryView = Ti.UI.createView()
  addClass(categoryView,[
    "hSize",
    "category"
  ])

  var labelCategory = Ti.UI.createLabel({
  })
  labelCategory.text = category
  addClass(labelCategory,[
    "labelLogin",
    "fontHeavy",
  ])
  categoryView.add(labelCategory)

  containerScroll.add(categoryView)
}

function addPhones(phones){
  for(phone in phones){
    var viewPhone = Ti.UI.createView()
    addClass(viewPhone,[
      "hlayout",
      "hSize",
      "phone"
    ])
    let labelPhone = Ti.UI.createLabel({
      text : phone+" : "
    })
    addClass(labelPhone,[
      'labelLogin',
      "fontLight",
      "labelNum"
    ])
    viewPhone.add(labelPhone)
    // pour chaque num
    phones[phone].forEach(phone =>{
      log(phone)
      var style = {
        color : "#cd7e43",
        underline : true 
      }
      let labelPhone = Ti.UI.createLabel({
      })
      addClass(labelPhone,[
        'labelLogin',
        "fontLight"
      ])  
      stringUtil.labelStyling(labelPhone,phone,style)

      labelPhone.addEventListener('click',()=>{
        require("/utility/callUtil").doCall(phone)
      })

      let labelslash= Ti.UI.createLabel({
        text : " / "
      })
      addClass(labelslash,[
        'labelLogin',
        "fontLight",
        "labelNum"
      ])
      
      viewPhone.add(labelPhone)
      viewPhone.add(labelslash)
    })
    containerScroll.add(viewPhone)  
  }
}
//traitement
labelContainer.hide()
getNumeroContact()