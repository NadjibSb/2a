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
        i==2 ? bg="rgb(176,176,176)" : bg=Alloy.CFG.design.colors.SecondaryColor;
        i==2 ? text = L('sinistres_rendezvous_btn_accepted') : text = L('sinistres_rendezvous_btn_accepte');

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
    //$.expertslistContainer.height = "97%";
    //$.expertslistContainer.opacity =  1;
    log("enter " + $.expertslistContainer.height);
    $.expertslistContainer.show();
    // restore scale
    var matrix2d = Ti.UI.createMatrix2D();
    matrix2d = matrix2d.scale(1,1);
    $.expertslistContainer.animate({
          duration: 1,
          transform: matrix2d
        },()=>{
            log("visible "+$.expertslistContainer.visible);
            $.expertslistContainer.animate({
                height : '97%',
                top:8,
                opacity:1,
                duration: 300,
            });
    });
}

// privates functions


// close rendezvous view
function close(e){
    //$.expertslistContainer.hide();
    var matrix2d = Ti.UI.createMatrix2D();
    matrix2d = matrix2d.scale(0.2,0.2);
    $.expertslistContainer.animate({
          top: "100%",
          opacity:0.1,
          duration: 400,
          transform: matrix2d
        },()=>{
            $.expertslistContainer.hide();
    });
    // renvoie du close event
    $.trigger('close', _.extend(e.source,{id:"test"}));
}
