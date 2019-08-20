const log = require('/utility/logger')({
  tag : "stringUtil",
  hidelag : false
});

// PUBLIC --------------------------------------------------------------------

/*  *
    * change the font and the color of "textToAdd"
*/
exports.labelStyling = function(label, textToAdd,args){
    var attributes = [];
    if (args) {
        if (args.color) {
            attributes.push({
                type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value: args.color,
                range: [label.text.length, textToAdd.length]
            })
        }
        if(args.font){
            attributes.push({
                type: Ti.UI.ATTRIBUTE_FONT,
                value: args.font,
                range: [label.text.length, textToAdd.length]
            })
        }
    }
    var attr = Ti.UI.createAttributedString({
        text: label.text + textToAdd,
        attributes: attributes
    });
    label.attributedString = attr;
}
