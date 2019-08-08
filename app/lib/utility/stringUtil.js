
var default_font = {
    fontSize: 14,
    fontFamily: Alloy.CFG.design.fonts.Medium
}, default_color = Alloy.CFG.design.fonts.PrimaryColor;


// PUBLIC --------------------------------------------------------------------

/*  *
    * change the font and the color of "textToAdd"
*/
exports.labelStyling = function(label, textToAdd, color=default_color ,font=default_font){
    var attr = Ti.UI.createAttributedString({
        text: label.text + textToAdd,
        attributes: [
            {
                type: Ti.UI.ATTRIBUTE_FONT,
                value: font,
                range: [label.text.length, textToAdd.length]
            },
            {
                type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value: color,
                range: [label.text.length, textToAdd.length]
            }
        ]
    });
    label.attributedString = attr;
}
