// PUBLIC INTERFACE
var $ = module.exports = {
	createLabel: createLabel,
	underline: underline
};

/**
 * params.underlineText text to underline
 * params.underlineTextColor color underline text
 */
function createLabel( params ) {
	var label = Ti.UI.createLabel( params );
	underline( label, label.text, label.underlineText, params.underlineTextColor, params.underlineOnly );
	return label;
};

/**
 * sous ligne une sous chaine de caractere d'un Ti.UI.Label
 * @param {Ti.UI.Label} Label
 * @param {string} full string
 * @param {string} substring to underline
 */
function underline( label, text, underlineText, color, underlineOnly ) {
	if( !label || !text || !underlineText ) {
		log.e( "underlineText Missed arguments" );
		return;
	}

	var indexSubText = text.indexOf( underlineText );
	//le text ne contient pas la sous chaine de caractere
	if( indexSubText == -1 ) {
		log.e( "underlineText sub text not found" );
		return;
	}
	var range = [ indexSubText, underlineText.length ];
	var attributes = [ {
		type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
		value: Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range: range
	} ];
	if( color ) {
		attributes.push( {
			type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
			value: color,
			range: range
		} );
	}
	if( OS_IOS && !underlineOnly ) {
		attributes.push( {
			type: Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value: Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range: range
		} );
	}

	label.setAttributedString( Titanium.UI.createAttributedString( {
		text: text,
		attributes: attributes
	} ) );
}
