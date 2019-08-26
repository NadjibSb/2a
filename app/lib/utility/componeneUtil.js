exports.addClass = function addClass($,view,listClass){
    listClass.forEach(classs =>{
      $.addClass(view,classs)
    })
  }