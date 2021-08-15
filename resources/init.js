( function () {

	/**
	 * @class mw.boilerPlate
	 * @singleton
	 */
	mw.Ivilution = {
	};
	$('html').addClass("ivilution-loaded");
	var body_classes = $('body').attr('class').split(' ');
	for (let i = 0; i < body_classes.length; i++) {
		$('html').addClass("config-" + body_classes[i]);
	}

}() );
