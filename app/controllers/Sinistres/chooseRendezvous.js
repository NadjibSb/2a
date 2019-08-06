// Dependencies
var log = require( 'utility/logger' )( {
		tag: "Sinistres_choix_rendezvous",
		hideLog: false
	} );

// constructor

(function constructor(){
    var data = [];

    for (var i = 0; i <6; i++) {
        var bg,text;
        i%2==0 ? bg=Alloy.CFG.design.colors.SecondaryColor : bg="rgb(176,176,176)";
        i%2==0 ? text = L('sinistres_rendezvous_btn_accepte') : text = L('sinistres_rendezvous_btn_accepted');

        data.push({
            template: 'rendezvousTemplate',
            expertName:{text:"Raouf"},
            agenceName:{text:"Sidi Yahya - 16001"},
            date:{text:"15 Aout 2019 à 15:30"},
            button:{backgroundColor:bg},
            buttonText:{text:text},
        });
    }
    $.rendezvousSection.setItems(data);
})();

//public functions

// open the rendezvous view to select an expert
exports.open =  function open(){
    $.expertslistContainer.show();
    // restore scale
    var matrix2d = Ti.UI.create2DMatrix();
    matrix2d = matrix2d.scale(1);
    $.expertslistContainer.animate({
      duration: 1,
      transform: matrix2d
    });
    // animate
    $.expertslistContainer.animate({
      height : '98%',
      top:8,
      opacity:1,
      duration: 400,
    });
    matrix2d = null;
}

// privates functions


// close rendezvous view
function close(e){
    var matrix2d = Ti.UI.create2DMatrix();
    matrix2d = matrix2d.scale(0); // scale to 1.5 times original size
    $.expertslistContainer.animate({
      top: "100%",
      opacity:0.1,
      duration: 400,
      transform: matrix2d
    },()=>{
        $.expertslistContainer.hide();
    });
    matrix2d = null;
    // renvoie du close event
    $.trigger('close', _.extend(e,{id:"test"}));
}
