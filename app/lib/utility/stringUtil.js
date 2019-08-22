const log = require('/utility/logger')({
  tag : "stringUtil",
  hidelag : false
});

// PUBLIC --------------------------------------------------------------------

/*  *
    * change the font and the color of "textToAdd"
    ** args{
            color = '#AAA',
            font = font{
                        fontSize:16
                    },
            underline = true
        }
*/
exports.labelStyling = function(label, textToAdd,args){
    let attributes = [],
        range,
        text;
    //if label has no text
    if (label.text) {
        range = [label.text.length,textToAdd.length];
        text = label.text + textToAdd;
    }else {
        range = [0,textToAdd.length];
        text = textToAdd;
    }
    if (args) {
        if (args.color) {
            attributes.push({
                type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value: args.color,
                range: range
            })
        }
        if(args.font){
            attributes.push({
                type: Ti.UI.ATTRIBUTE_FONT,
                value: args.font,
                range: range
            })
        }
        if (args.underline) {
            attributes.push({
                type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
        		value: Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
        		range: range
            })
        }
    }
    var attr = Ti.UI.createAttributedString({
        text: text,
        attributes: attributes
    });
    label.attributedString = attr;
}
