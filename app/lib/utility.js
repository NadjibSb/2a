

// PUBLIC INTERFACE
$ = module.exports = {
	resizeBackgroundImage: resizeBackgroundImage
};

// takes with & height of image + w & h of view
function resizeBackgroundImage(src, dst) {
	src.ratio = src.width / src.height;
	dst.ratio = dst.width / dst.height;
	var imgProp = {};
	if (src.ratio > dst.ratio) {
		//fix height
		imgProp.height = dst.height;
		var ratio = src.height / dst.height;
		imgProp.width = src.width / ratio;
	} else {
		//fix width
		imgProp.width = dst.width;
		var ratio = src.width / dst.width;
		imgProp.height = src.height / ratio;
	}
	return imgProp;
}
