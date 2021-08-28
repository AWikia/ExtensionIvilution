/* Minimal Version of themes.js for use in Ivilution */
window.MW18auto = true;
window.MW18autoDark = false;
window.MW18darkmode = false;
window.MW18ContrastNotice = false;

( function () {

	/**
	 * @class mw.boilerPlate
	 * @singleton
	 */
	mw.Ivilution = {
	};
	ColorUpdate(true);

}() );

/* Used for some wiki theme modes 
	Also used for some notifications
	Called on body element only */
function CheckTheme() {
	/* Wiki theme */
	ColorUpdate(true);
}

/* Begin Color Parsers */
function ColorTestTwin(color,color2,intensity=1,inter='hsl') {
	return chroma.mix(color,color2,0.3*intensity, inter);
}

function GetHoverColor(color1='#ffffff',color2='#000000',inter='hsl',steps=4,modi=1) {
	colors = chroma.scale([color1, color2]).mode(inter).colors(steps);
	return colors[modi];
}

function GetActiveColor(color1='#ffffff',color2='#000000',inter='hsl',steps=4,modi=1) {
	colors = chroma.scale([GetHoverColor(color1,color2,inter,steps,modi), color2]).mode(inter).colors(steps);
	return colors[modi];
}


function ColorTest(color,text=false,inv=false,dledlen=false) { // Regular Colors
	if (dledlen === true) {
		var color2 = getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color");
	} else {
		var color2 = color;
	}
	if (isLightColor(color2)) {
		if (text === true) {
			if (inv === false) {
				return getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color"); // Was #000000 and 0e191a
			} else {
				return getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color");
			}
		} else {
			if (inv === false) {
				return GetHoverColor(color, '#000000','hsl',10,3);
			} else {
				return GetHoverColor(color, '#ffffff','hsl',10,3);
			}
		}
	} else {
		if (text === true) {
			if (inv === true) {
				return getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color"); // Was #000000 and 0e191a
			} else {
				return getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color");
			}
		} else {
			if (inv === true) {
				return GetHoverColor(color, '#000000','hsl',10,3);
			} else {
				return GetHoverColor(color, '#ffffff','hsl',10,3);
			}
		}
	}


}

function SuperColorTest(color,dledlen=false) { // Double Amount
	if (dledlen === true) {
		var color2 = getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color");
	} else {
		var color2 = color;
	}
	if (isLightColor(color2)) {
		return GetActiveColor(color, '#000000','hsl',10,3);
	} else {
		return GetActiveColor(color, '#ffffff','hsl',10,3);
	}
}


function ColorInvert(color) {
	var r = 255 - chroma(color).get('rgb.r');
	var g = 255 - chroma(color).get('rgb.g');
	var b = 255 - chroma(color).get('rgb.b');
	var h = chroma(color).get('hsl.h');	
	return chroma.rgb(r,g,b).set('hsl.h', h);
}



// Only used for link and header colors
function ColorTest2(color,text=false) {
	return Color2(ColorTest(color,text));
}


function SuperColorTest2(color) {
return Color2(SuperColorTest(color));
}


// Conversion for R,G,B syntax
function Color2(color) {
	return chroma(color).get('rgb.r') + ',' + chroma(color).get('rgb.g') + ',' + chroma(color).get('rgb.b');
}

// Conversion for Hex (Unused)
function Color3(r=0,g=0,b=0) {
	return chroma('rgb(' + r + ',' + g + ',' + b + ')' ).get('hex');
}


function isLightColor(color) {
	return ((chroma.contrast(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color"), color)) > 5);
}

function isSuperLightColor(color) {
	return ((chroma.contrast(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color"), color)) > 6);
}


function isSuitableColor(color,color2) {
return ((chroma.contrast(color, color2)) > 3)
}

function isSuitableColor2(color,color2) {
return ((chroma.contrast(color, color2)) > 1.5) // For Border Color
}


/* Used to udpate all dynamical variables */
function ColorUpdate(refresh=true,suitcheck=false) {
/** Page BG **/
/* Set Vars */
// content_text is Content Color
// content_text4 is Text color of Content Color
// content_text5 is Dark text color of Content Color
// content_color is Content Bg
// dropdowncolor is Dropdown Bg
// dropdowncolor3 is Automatic Content Color
// dropdowncolor2 is Content Border
if ( (window.MW18darkmode === true) ) {
	var content_text =	getComputedStyle(document.querySelector('html')).getPropertyValue("--page-background-color");
// Adaptive
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") === 'auto') {
		if (isLightColor(content_text)) {
			var content_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-text-background-color")
		} else {
			var content_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-text-background-color")
		}

	} else {
		var content_color =	getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color");
	}
//End Adaptive
} else {
	var content_color =	getComputedStyle(document.querySelector('html')).getPropertyValue("--page-background-color");
	var content_text =	getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color");
}

var content_color2 = ColorTest(content_color);
var content_color3 = SuperColorTest(content_color); // Scrollbar


if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") === 'auto') && (window.MW18darkmode === false) ) {
	if (isLightColor(content_color)) {
		var dropdowncolor3 = getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-text-background-color")
	} else {
		var dropdowncolor3 = getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-text-background-color")
	}
} else {
	var dropdowncolor3 = 'inherit';
}

if (isLightColor(content_color)) {
	var dropdowncolor = chroma.mix(content_color,getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-text-background-color"),0.15, 'hsv');
	if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") === 'auto')  ) {
		var dropdowncolor2 = chroma.mix(content_color,getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-text-background-color"),7.5, 'hsv');
	} else {
		var dropdowncolor2 = 'inherit';
	}

} else {
	var dropdowncolor = chroma.mix(content_color,getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-text-background-color"),0.15, 'hsv');
	if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") === 'auto')  ) {
		var dropdowncolor2 = chroma.mix(content_color,getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-text-background-color"),7.5, 'hsv');
	} else {
		var dropdowncolor2 = 'inherit';
	}

}

if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") != 'auto') || (window.MW18darkmode === true) ) {
	var content_text2 = ColorTest(content_text);
	var content_text3 = SuperColorTest(content_text); // Scrollbar
	var content_text4 = ColorTest(content_text,true);
	var content_text4I = ColorTest(content_text,true,true);
	colormixl = GetHoverColor(content_color,content_text,'rgb',5);
	colormix = GetActiveColor(content_color,content_text,'rgb',5);
} else {
	var content_text2 = ColorTest(dropdowncolor3);
	var content_text3 = SuperColorTest(dropdowncolor3); // Scrollbar
	var content_text4 = ColorTest(dropdowncolor3,true);
	var content_text4I = ColorTest(dropdowncolor3,true,true);
	colormixl = GetHoverColor(content_color,dropdowncolor3,'rgb',5);
	colormix = GetActiveColor(content_color,dropdowncolor3,'rgb',5);
}
	var content_text5 = ColorTest(content_text4,false);
	var content_text5I = ColorTest(content_text4I,false);

var dropdowncolorH = ColorTest(dropdowncolor);
var dropdowncolorA = SuperColorTest(dropdowncolor); // Scrollbar


document.querySelector('html').style.setProperty("--page-secondary-background-color", dropdowncolor);
document.querySelector('html').style.setProperty("--page-secondary-background-color-hover", dropdowncolorH);
document.querySelector('html').style.setProperty("--page-secondary-background-color-active", dropdowncolorA);

document.querySelector('body').style.setProperty("--page-border-background-color", dropdowncolor2);
if (window.MW18darkmode === true) {
	document.querySelector('body').style.setProperty("--page-background-color", content_color);
	document.querySelector('body').style.setProperty("--page-text-background-color", content_text);
} else {
	document.querySelector('body').style.setProperty("--page-background-color", 'inherit');
	document.querySelector('body').style.setProperty("--page-text-background-color", dropdowncolor3);
}

if (isLightColor( getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color") )) {
document.querySelector('html').style.setProperty("--page-text-gradient-color", getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color"));
document.querySelector('html').style.setProperty("--page-text-gradient-color-hover", content_text2);
} else {
document.querySelector('html').style.setProperty("--page-text-gradient-color", content_text2);
document.querySelector('html').style.setProperty("--page-text-gradient-color-hover", getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color"));
}




document.querySelector('html').style.setProperty("--page-background-color-hover", content_color2);
document.querySelector('html').style.setProperty("--page-background-color-active", content_color3); // Scrollbar
document.querySelector('html').style.setProperty("--page-text-background-color-hover", content_text2);
document.querySelector('html').style.setProperty("--page-text-background-color-active", content_text3); // Scrollbar
document.querySelector('html').style.setProperty("--page-text-foreground-color", content_text4);
document.querySelector('html').style.setProperty("--page-text-foreground-color-hover", content_text5);
document.querySelector('html').style.setProperty("--page-text-foreground-color-inverted", content_text4I);
document.querySelector('html').style.setProperty("--page-text-foreground-color-hover-inverted", content_text5I);
document.querySelector('html').style.setProperty("--page-text-background-color-page-background-color-mix-light", colormixl);
document.querySelector('html').style.setProperty("--page-text-background-color-page-background-color-mix", colormix);

// RGB
document.querySelector('html').style.setProperty("--page-secondary-background-color-rgb", Color2(dropdowncolor));
document.querySelector('html').style.setProperty("--page-secondary-background-color-hover-rgb", Color2(dropdowncolorH));
document.querySelector('html').style.setProperty("--page-secondary-background-color-active-rgb", Color2(dropdowncolorA));
document.querySelector('html').style.setProperty("--page-background-color-rgb", Color2( getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color") ));
document.querySelector('html').style.setProperty("--page-background-color-hover-rgb", Color2(content_color2));
document.querySelector('html').style.setProperty("--page-background-color-active-rgb", Color2(content_color3));
document.querySelector('html').style.setProperty("--page-text-background-color-rgb", Color2( getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color") ));
document.querySelector('html').style.setProperty("--page-text-background-color-hover-rgb", Color2(content_text2));
document.querySelector('html').style.setProperty("--page-text-background-color-active-rgb", Color2(content_text3));
document.querySelector('html').style.setProperty("--page-text-foreground-color-rgb", Color2(content_text4));
document.querySelector('html').style.setProperty("--page-text-foreground-color-hover-rgb", Color2(content_text5));
document.querySelector('html').style.setProperty("--page-text-foreground-color-inverted-rgb", Color2(content_text4I));
document.querySelector('html').style.setProperty("--page-text-foreground-color-hover-inverted-rgb", Color2(content_text5I));
document.querySelector('html').style.setProperty("--page-text-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-gradient-color") ));
document.querySelector('html').style.setProperty("--page-text-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-gradient-color-hover") ));


/** Button Color **/
/* Set Vars */
// Liatch Quirk
if ( (window.MW18darkmode === true) ) {
	document.querySelector('body').style.setProperty("--accent-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--accent-background-color")));
	if ( !(isSuitableColor2(getComputedStyle(document.querySelector('body')).getPropertyValue("--accent-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
		document.querySelector('body').style.setProperty("--accent-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--accent-background-color"),false,false,true));
	}
	if ( !(isSuitableColor2(getComputedStyle(document.querySelector('body')).getPropertyValue("--accent-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
		document.querySelector('body').style.setProperty("--accent-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--accent-background-color"),false,false,true));
	}
	if ( !(isSuitableColor2(getComputedStyle(document.querySelector('body')).getPropertyValue("--accent-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
		document.querySelector('body').style.setProperty("--accent-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--accent-background-color"),false,false,true));
	}
} else {
	document.querySelector('body').style.setProperty("--accent-background-color", 'inherit');
}


var button_color = getComputedStyle(document.querySelector('body')).getPropertyValue("--accent-background-color");
var buttoncolor1 = ColorTest(button_color,false);
var buttoncolor2 = ColorTest(button_color,true);
var buttoncolor2I = ColorTest(button_color,true,true);
var buttoncolor2t = ColorTest(buttoncolor2,false);
var buttoncolor2tI = ColorTest(buttoncolor2I,false);
var buttoncolor3 = SuperColorTest(button_color); // Scrollbar


if (isLightColor(button_color)) {
document.querySelector('html').style.setProperty("--accent-gradient-color", button_color);
document.querySelector('html').style.setProperty("--accent-gradient-color-hover", buttoncolor1);
} else {
document.querySelector('html').style.setProperty("--accent-gradient-color", buttoncolor1);
document.querySelector('html').style.setProperty("--accent-gradient-color-hover", button_color);
}

buttonmixl = GetHoverColor(content_color,button_color,'rgb',5);
buttonmix = GetActiveColor(content_color,button_color,'rgb',5);


/* Set Values */
document.querySelector('html').style.setProperty("--accent-background-color-hover", buttoncolor1);
document.querySelector('html').style.setProperty("--accent-background-color-active", buttoncolor3); // Scrollbar
document.querySelector('html').style.setProperty("--accent-foreground-color", buttoncolor2);
document.querySelector('html').style.setProperty("--accent-foreground-color-hover", buttoncolor2t);
document.querySelector('html').style.setProperty("--accent-foreground-color-inverted", buttoncolor2I);
document.querySelector('html').style.setProperty("--accent-foreground-color-hover-inverted", buttoncolor2tI);
document.querySelector('html').style.setProperty("--accent-background-color-page-background-color-mix-light", buttonmixl);
document.querySelector('html').style.setProperty("--accent-background-color-page-background-color-mix", buttonmix);
// RGB
document.querySelector('html').style.setProperty("--accent-background-color-rgb", Color2(button_color));
document.querySelector('html').style.setProperty("--accent-background-color-hover-rgb", Color2(buttoncolor1));
document.querySelector('html').style.setProperty("--accent-background-color-active-rgb", Color2(buttoncolor3));
document.querySelector('html').style.setProperty("--accent-foreground-color-rgb", Color2(buttoncolor2));
document.querySelector('html').style.setProperty("--accent-foreground-color-hover-rgb", Color2(buttoncolor2t));
document.querySelector('html').style.setProperty("--accent-foreground-color-inverted-rgb", Color2(buttoncolor2I));
document.querySelector('html').style.setProperty("--accent-foreground-color-hover-inverted-rgb", Color2(buttoncolor2tI));
document.querySelector('html').style.setProperty("--accent-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--accent-gradient-color") ));
document.querySelector('html').style.setProperty("--accent-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--accent-gradient-color-hover") ));


/** Header Color **/
/* Set Vars */
// Liatch Quirk
if ( (window.MW18darkmode === true) ) {
	document.querySelector('body').style.setProperty("--sticky-header-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--sticky-header-background-color")));
} else {
	document.querySelector('body').style.setProperty("--sticky-header-background-color", 'inherit');
}

var header_color = getComputedStyle(document.querySelector('body')).getPropertyValue("--sticky-header-background-color");
var headercolor1 = ColorTest(header_color,false);
var headercolor2 = ColorTest(header_color,true);
var headercolor2I = ColorTest(header_color,true,true);
var headercolor2t = ColorTest(headercolor2,false);
var headercolor2tI = ColorTest(headercolor2I,false);
var headercolor3 = SuperColorTest(header_color); // Scrollbar

if (isLightColor(header_color)) {
document.querySelector('html').style.setProperty("--sticky-header-gradient-color", header_color);
document.querySelector('html').style.setProperty("--sticky-header-gradient-color-hover", headercolor1);
} else {
document.querySelector('html').style.setProperty("--sticky-header-gradient-color", headercolor1);
document.querySelector('html').style.setProperty("--sticky-header-gradient-color-hover", header_color);
}

headermixl = GetHoverColor(content_color,header_color,'rgb',5);
headermix = GetActiveColor(content_color,header_color,'rgb',5);



/* Set Values */
document.querySelector('html').style.setProperty("--sticky-header-background-color-hover", headercolor1);
document.querySelector('html').style.setProperty("--sticky-header-background-color-active", headercolor3); // Scrollbar
document.querySelector('html').style.setProperty("--sticky-header-foreground-color", headercolor2);
document.querySelector('html').style.setProperty("--sticky-header-foreground-color-hover", headercolor2t);
document.querySelector('html').style.setProperty("--sticky-header-foreground-color-inverted", headercolor2I);
document.querySelector('html').style.setProperty("--sticky-header-foreground-color-hover-inverted", headercolor2tI);
document.querySelector('html').style.setProperty("--sticky-header-background-color-page-background-color-mix-light", headermixl);
document.querySelector('html').style.setProperty("--sticky-header-background-color-page-background-color-mix", headermix);
// RGB
document.querySelector('html').style.setProperty("--sticky-header-background-color-rgb", Color2(header_color));
document.querySelector('html').style.setProperty("--sticky-header-background-color-hover-rgb", Color2(headercolor1));
document.querySelector('html').style.setProperty("--sticky-header-background-color-active-rgb", Color2(headercolor3));
document.querySelector('html').style.setProperty("--sticky-header-foreground-color-rgb", Color2(headercolor2));
document.querySelector('html').style.setProperty("--sticky-header-foreground-color-hover-rgb", Color2(headercolor2t));
document.querySelector('html').style.setProperty("--sticky-header-foreground-color-inverted-rgb", Color2(headercolor2I));
document.querySelector('html').style.setProperty("--sticky-header-foreground-color-hover-inverted-rgb", Color2(headercolor2tI));
document.querySelector('html').style.setProperty("--sticky-header-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--sticky-header-gradient-color") ));
document.querySelector('html').style.setProperty("--sticky-header-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--sticky-header-gradient-color-hover") ));


/** Link Color **/
/* Set Vars */
// Liatch Quirk
if ( (window.MW18darkmode === true) ) {
	document.querySelector('body').style.setProperty("--anchor-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--anchor-background-color")));
	if ( !(isSuitableColor(getComputedStyle(document.querySelector('body')).getPropertyValue("--anchor-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
		document.querySelector('body').style.setProperty("--anchor-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--anchor-background-color"),false,false,true));
	}
	if ( !(isSuitableColor(getComputedStyle(document.querySelector('body')).getPropertyValue("--anchor-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
		document.querySelector('body').style.setProperty("--anchor-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--anchor-background-color"),false,false,true));
	}
	if ( !(isSuitableColor(getComputedStyle(document.querySelector('body')).getPropertyValue("--anchor-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
		document.querySelector('body').style.setProperty("--anchor-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--anchor-background-color"),false,false,true));
	}
} else {
	document.querySelector('body').style.setProperty("--anchor-background-color", 'inherit');
}

var link_color = getComputedStyle(document.querySelector('body')).getPropertyValue("--anchor-background-color");
var linkcolor1 = ColorTest(link_color,false);
var linkcolor2 = ColorTest(link_color,true);
var linkcolor2I = ColorTest(link_color,true,true);
var linkcolor2t = ColorTest(linkcolor2,false);
var linkcolor2tI = ColorTest(linkcolor2I,false);
var linkcolor3 = SuperColorTest(link_color); // Scrollbar



if (isLightColor(link_color)) {
document.querySelector('html').style.setProperty("--anchor-gradient-color", link_color);
document.querySelector('html').style.setProperty("--anchor-gradient-color-hover", linkcolor1);
} else {
document.querySelector('html').style.setProperty("--anchor-gradient-color", linkcolor1);
document.querySelector('html').style.setProperty("--anchor-gradient-color-hover", link_color);
}

linkmixl = GetHoverColor(content_color,link_color,'rgb',5);
linkmix = GetActiveColor(content_color,link_color,'rgb',5);


/* Set Values */
document.querySelector('html').style.setProperty("--anchor-background-color-hover", linkcolor1);
document.querySelector('html').style.setProperty("--anchor-background-color-active", linkcolor3); // Scrollbar
document.querySelector('html').style.setProperty("--anchor-foreground-color", linkcolor2);
document.querySelector('html').style.setProperty("--anchor-foreground-color-hover", linkcolor2t);
document.querySelector('html').style.setProperty("--anchor-foreground-color-inverted", linkcolor2I);
document.querySelector('html').style.setProperty("--anchor-foreground-color-hover-inverted", linkcolor2tI);
document.querySelector('html').style.setProperty("--anchor-background-color-page-background-color-mix-light", linkmixl);
document.querySelector('html').style.setProperty("--anchor-background-color-page-background-color-mix", linkmix);
// RGB
document.querySelector('html').style.setProperty("--anchor-background-color-rgb", Color2(link_color));
document.querySelector('html').style.setProperty("--anchor-background-color-hover-rgb", Color2(linkcolor1));
document.querySelector('html').style.setProperty("--anchor-background-color-active-rgb", Color2(linkcolor3));
document.querySelector('html').style.setProperty("--anchor-foreground-color-rgb", Color2(linkcolor2));
document.querySelector('html').style.setProperty("--anchor-foreground-color-hover-rgb", Color2(linkcolor2t));
document.querySelector('html').style.setProperty("--anchor-foreground-color-inverted-rgb", Color2(linkcolor2I));
document.querySelector('html').style.setProperty("--anchor-foreground-color-hover-inverted-rgb", Color2(linkcolor2tI));
document.querySelector('html').style.setProperty("--anchor-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--anchor-gradient-color") ));
document.querySelector('html').style.setProperty("--anchor-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--anchor-gradient-color-hover") ));

/** Content Border **/
/* Set Vars */


if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
	// Liatch Quirk

	if ( (window.MW18darkmode === true) ) {
		document.querySelector('body').style.setProperty("--page-border-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color")));
		if ( !(isSuitableColor2(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-border-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-border-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-border-background-color"),false,false,true));
		}
		if ( !(isSuitableColor2(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-border-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-border-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-border-background-color"),false,false,true));
		}
		if ( !(isSuitableColor2(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-border-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-border-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-border-background-color"),false,false,true));
		}
	}
}

var border_color =	getComputedStyle(document.querySelector('body')).getPropertyValue("--page-border-background-color");

var bordercolor1 = ColorTest(border_color,false);
var bordercolor3 = SuperColorTest(border_color); // Scrollbar
var bordercolor2 = ColorTest(border_color,true);
var bordercolor2I = ColorTest(border_color,true,true);
var bordercolor2t = ColorTest(bordercolor2,false);
var bordercolor2tI = ColorTest(bordercolor2I,false);

if (isLightColor(border_color)) {
document.querySelector('html').style.setProperty("--page-border-gradient-color", border_color);
document.querySelector('html').style.setProperty("--page-border-gradient-color-hover", bordercolor1);
} else {
document.querySelector('html').style.setProperty("--page-border-gradient-color", bordercolor1);
document.querySelector('html').style.setProperty("--page-border-gradient-color-hover", border_color);
}

bordermixl = GetHoverColor(content_color,border_color,'rgb',5);
bordermix = GetActiveColor(content_color,border_color,'rgb',5);

/* Set Values */
document.querySelector('html').style.setProperty("--page-border-background-color-hover", bordercolor1);
document.querySelector('html').style.setProperty("--page-border-background-color-active", bordercolor3); // Scrollbar
document.querySelector('html').style.setProperty("--page-border-foreground-color", bordercolor2);
document.querySelector('html').style.setProperty("--page-border-foreground-color-hover", bordercolor2t);
document.querySelector('html').style.setProperty("--page-border-foreground-color-inverted", bordercolor2I);
document.querySelector('html').style.setProperty("--page-border-foreground-color-hover-inverted", bordercolor2tI);
document.querySelector('html').style.setProperty("--page-border-background-color-page-background-color-mix-light", bordermixl);
document.querySelector('html').style.setProperty("--page-border-background-color-page-background-color-mix", bordermix);
// RGB
document.querySelector('html').style.setProperty("--page-border-background-color-rgb", Color2(border_color));
document.querySelector('html').style.setProperty("--page-border-background-color-hover-rgb", Color2(bordercolor1));
document.querySelector('html').style.setProperty("--page-border-background-color-active-rgb", Color2(bordercolor3));
document.querySelector('html').style.setProperty("--page-border-foreground-color-rgb", Color2(bordercolor2));
document.querySelector('html').style.setProperty("--page-border-foreground-color-hover-rgb", Color2(bordercolor2t));
document.querySelector('html').style.setProperty("--page-border-foreground-color-inverted-rgb", Color2(bordercolor2I));
document.querySelector('html').style.setProperty("--page-border-foreground-color-hover-inverted-rgb", Color2(bordercolor2tI));
document.querySelector('html').style.setProperty("--page-border-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-gradient-color") ));
document.querySelector('html').style.setProperty("--page-border-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-gradient-color-hover") ));


/** Body Bg **/
/* Set Vars */
// Liatch Quirk
if ( (window.MW18darkmode === true) ) {
	document.querySelector('body').style.setProperty("--community-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-color")));
} else {
	document.querySelector('body').style.setProperty("--community-background-color", 'inherit');
}

var head_color =	getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-color");
var headcolor1 = ColorTest(head_color,false);
var headcolor3 = SuperColorTest(head_color); // Scrollbar
var headcolor2 = ColorTest(head_color,true);
var headcolor2I = ColorTest(head_color,true,true);
var headcolor2t = ColorTest(headcolor2,false);
var headcolor2tI = ColorTest(headcolor2I,false);

if (isLightColor(head_color)) {
document.querySelector('html').style.setProperty("--community-gradient-color", head_color);
document.querySelector('html').style.setProperty("--community-gradient-color-hover", headcolor1);
} else {
document.querySelector('html').style.setProperty("--community-gradient-color", headcolor1);
document.querySelector('html').style.setProperty("--community-gradient-color-hover", head_color);
}

headmixl = GetHoverColor(content_color,head_color,'rgb',5);
headmix = GetActiveColor(content_color,head_color,'rgb',5);

/* Set Values */
document.querySelector('html').style.setProperty("--community-background-color-hover", headcolor1);
document.querySelector('html').style.setProperty("--community-background-color-active", headcolor3); // Scrollbar
document.querySelector('html').style.setProperty("--community-foreground-color", headcolor2);
document.querySelector('html').style.setProperty("--community-foreground-color-hover", headcolor2t);
document.querySelector('html').style.setProperty("--community-foreground-color-inverted", headcolor2I);
document.querySelector('html').style.setProperty("--community-foreground-color-hover-inverted", headcolor2tI);
document.querySelector('html').style.setProperty("--community-background-color-page-background-color-mix-light", headmixl);
document.querySelector('html').style.setProperty("--community-background-color-page-background-color-mix", headmix);
// RGB
document.querySelector('html').style.setProperty("--community-background-color-rgb", Color2(head_color));
document.querySelector('html').style.setProperty("--community-background-color-hover-rgb", Color2(headcolor1));
document.querySelector('html').style.setProperty("--community-background-color-active-rgb", Color2(headcolor3));
document.querySelector('html').style.setProperty("--community-foreground-color-rgb", Color2(headcolor2));
document.querySelector('html').style.setProperty("--community-foreground-color-hover-rgb", Color2(headcolor2t));
document.querySelector('html').style.setProperty("--community-foreground-color-inverted-rgb", Color2(headcolor2I));
document.querySelector('html').style.setProperty("--community-foreground-color-hover-inverted-rgb", Color2(headcolor2tI));
document.querySelector('html').style.setProperty("--community-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-gradient-color") ));
document.querySelector('html').style.setProperty("--community-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-gradient-color-hover") ));

/** Community Header text color **/
if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-header-text-color") !== 'auto')  ) {
	// Liatch Quirk
	if ( (window.MW18darkmode === true) ) {
		headertext_color = ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--community-header-text-color"));
	} else {
		headertext_color = 'inherit';
	}


} else {
	var headertext_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--community-foreground-color");
}

document.querySelector('body').style.setProperty("--community-header-text-color", headertext_color);
var headertext_color= getComputedStyle(document.querySelector('body')).getPropertyValue("--community-header-text-color");

var headertextcolor1 = ColorTest(headertext_color,false,true,true);

document.querySelector('html').style.setProperty("--community-header-text-color-hover", headertextcolor1);

// RGB
document.querySelector('html').style.setProperty("--community-header-text-color-rgb", Color2( getComputedStyle(document.querySelector('body')).getPropertyValue("--community-header-text-color") ));
document.querySelector('html').style.setProperty("--community-header-text-color-hover-rgb", Color2(headertextcolor1));


/* Floating Header Bg */
if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--toolbar-background-color") !== 'auto')  ) {
	// Liatch Quirk
	if ( (window.MW18darkmode === true) ) {
		floating_header = ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--toolbar-background-color"));
	} else {
		floating_header = 'inherit';
	}


} else {
	var floating_header = ColorTestTwin(content_color,ColorTestTwin(header_color,button_color,1,'rgb'),2.5,'rgb');
}

document.querySelector('body').style.setProperty("--toolbar-background-color", floating_header);
var floating_color =getComputedStyle(document.querySelector('body')).getPropertyValue("--toolbar-background-color");


var floatingcolor1 = ColorTest(floating_color,false);
var floatingcolor3 = SuperColorTest(floating_color); // Scrollbar
var floatingcolor2 = ColorTest(floating_color,true);
var floatingcolor2I = ColorTest(floating_color,true,true);
var floatingcolor2t = ColorTest(floatingcolor2,false);
var floatingcolor2tI = ColorTest(floatingcolor2I,false);

if (isLightColor(floating_color)) {
document.querySelector('html').style.setProperty("--toolbar-gradient-color", floating_color);
document.querySelector('html').style.setProperty("--toolbar-gradient-color-hover", floatingcolor1);
} else {
document.querySelector('html').style.setProperty("--toolbar-gradient-color", floatingcolor1);
document.querySelector('html').style.setProperty("--toolbar-gradient-color-hover", floating_color);
}

floatmixl = GetHoverColor(content_color,floating_color,'rgb',5);
floatmix = GetActiveColor(content_color,floating_color,'rgb',5);


document.querySelector('html').style.setProperty("--toolbar-background-color-hover", floatingcolor1);
document.querySelector('html').style.setProperty("--toolbar-background-color-active", floatingcolor3); // Scrollbar
document.querySelector('html').style.setProperty("--toolbar-foreground-color", floatingcolor2);
document.querySelector('html').style.setProperty("--toolbar-foreground-color-hover", floatingcolor2t);
document.querySelector('html').style.setProperty("--toolbar-foreground-color-inverted", floatingcolor2I);
document.querySelector('html').style.setProperty("--toolbar-foreground-color-hover-inverted", floatingcolor2tI);
document.querySelector('html').style.setProperty("--toolbar-background-color-page-background-color-mix-light", floatmixl);
document.querySelector('html').style.setProperty("--toolbar-background-color-page-background-color-mix", floatmix);

// RGB
document.querySelector('html').style.setProperty("--toolbar-background-color-rgb", Color2( getComputedStyle(document.querySelector('body')).getPropertyValue("--toolbar-background-color") ));
document.querySelector('html').style.setProperty("--toolbar-background-color-hover-rgb", Color2(floatingcolor1));
document.querySelector('html').style.setProperty("--toolbar-background-color-active-rgb", Color2(floatingcolor3));
document.querySelector('html').style.setProperty("--toolbar-foreground-color-rgb", Color2(floatingcolor2));
document.querySelector('html').style.setProperty("--toolbar-foreground-color-hover-rgb", Color2(floatingcolor2t));
document.querySelector('html').style.setProperty("--toolbar-foreground-color-inverted-rgb", Color2(floatingcolor2I));
document.querySelector('html').style.setProperty("--toolbar-foreground-color-hover-inverted-rgb", Color2(floatingcolor2tI));
document.querySelector('html').style.setProperty("--toolbar-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--toolbar-gradient-color") ));
document.querySelector('html').style.setProperty("--toolbar-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--toolbar-gradient-color-hover") ));


/* This goes before compiling Generic Colors or else they will think the theme is light */
if (window.MW18darkmode) {
	$('html').attr("dark-mode", isLightColor(getComputedStyle(document.querySelector('html')).getPropertyValue("--page-background-color")) );
} else {
	$('html').attr("dark-mode", !(isLightColor(getComputedStyle(document.querySelector('html')).getPropertyValue("--page-background-color"))) );
}


/** Alert Color **/
/* Set Vars */
var alert_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--alert-background-color");
var alertcolor1 = ColorTest(alert_color,false);
var alertcolor2 = ColorTest(alert_color,true);
var alertcolor2I = ColorTest(alert_color,true,true);
var alertcolor2t = ColorTest(alertcolor2,false);
var alertcolor2tI = ColorTest(alertcolor2I,false);
var alertcolor3 = SuperColorTest(alert_color); // Scrollbar


if (isLightColor(alert_color)) {
document.querySelector('html').style.setProperty("--alert-gradient-color", alert_color);
document.querySelector('html').style.setProperty("--alert-gradient-color-hover", alertcolor1);
} else {
document.querySelector('html').style.setProperty("--alert-gradient-color", alertcolor1);
document.querySelector('html').style.setProperty("--alert-gradient-color-hover", alert_color);
}

alertmixl = GetHoverColor(content_color,alert_color,'rgb',5);
alertmix = GetActiveColor(content_color,alert_color,'rgb',5);


/* Set Values */
document.querySelector('html').style.setProperty("--alert-background-color-hover", alertcolor1);
document.querySelector('html').style.setProperty("--alert-background-color-active", alertcolor3); // Scrollbar
document.querySelector('html').style.setProperty("--alert-foreground-color", alertcolor2);
document.querySelector('html').style.setProperty("--alert-foreground-color-hover", alertcolor2t);
document.querySelector('html').style.setProperty("--alert-foreground-color-inverted", alertcolor2I);
document.querySelector('html').style.setProperty("--alert-foreground-color-hover-inverted", alertcolor2tI);
document.querySelector('html').style.setProperty("--alert-background-color-page-background-color-mix-light", alertmixl);
document.querySelector('html').style.setProperty("--alert-background-color-page-background-color-mix", alertmix);
// RGB
document.querySelector('html').style.setProperty("--alert-background-color-rgb", Color2(alert_color));
document.querySelector('html').style.setProperty("--alert-background-color-hover-rgb", Color2(alertcolor1));
document.querySelector('html').style.setProperty("--alert-background-color-active-rgb", Color2(alertcolor3));
document.querySelector('html').style.setProperty("--alert-foreground-color-rgb", Color2(alertcolor2));
document.querySelector('html').style.setProperty("--alert-foreground-color-hover-rgb", Color2(alertcolor2t));
document.querySelector('html').style.setProperty("--alert-foreground-color-inverted-rgb", Color2(alertcolor2I));
document.querySelector('html').style.setProperty("--alert-foreground-color-hover-inverted-rgb", Color2(alertcolor2tI));
document.querySelector('html').style.setProperty("--alert-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--alert-gradient-color") ));
document.querySelector('html').style.setProperty("--alert-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--alert-gradient-color-hover") ));


/** Warning Color **/
/* Set Vars */
var warning_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--warning-background-color");
var warningcolor1 = ColorTest(warning_color,false);
var warningcolor2 = ColorTest(warning_color,true);
var warningcolor2I = ColorTest(warning_color,true,true);
var warningcolor2t = ColorTest(warningcolor2,false);
var warningcolor2tI = ColorTest(warningcolor2I,false);
var warningcolor3 = SuperColorTest(warning_color); // Scrollbar


if (isLightColor(warning_color)) {
document.querySelector('html').style.setProperty("--warning-gradient-color", warning_color);
document.querySelector('html').style.setProperty("--warning-gradient-color-hover", warningcolor1);
} else {
document.querySelector('html').style.setProperty("--warning-gradient-color", warningcolor1);
document.querySelector('html').style.setProperty("--warning-gradient-color-hover", warning_color);
}

warningmixl = GetHoverColor(content_color,warning_color,'rgb',5);
warningmix = GetActiveColor(content_color,warning_color,'rgb',5);


/* Set Values */
document.querySelector('html').style.setProperty("--warning-background-color-hover", warningcolor1);
document.querySelector('html').style.setProperty("--warning-background-color-active", warningcolor3); // Scrollbar
document.querySelector('html').style.setProperty("--warning-foreground-color", warningcolor2);
document.querySelector('html').style.setProperty("--warning-foreground-color-hover", warningcolor2t);
document.querySelector('html').style.setProperty("--warning-foreground-color-inverted", warningcolor2I);
document.querySelector('html').style.setProperty("--warning-foreground-color-hover-inverted", warningcolor2tI);
document.querySelector('html').style.setProperty("--warning-background-color-page-background-color-mix-light", warningmixl);
document.querySelector('html').style.setProperty("--warning-background-color-page-background-color-mix", warningmix);
// RGB
document.querySelector('html').style.setProperty("--warning-background-color-rgb", Color2(warning_color));
document.querySelector('html').style.setProperty("--warning-background-color-hover-rgb", Color2(warningcolor1));
document.querySelector('html').style.setProperty("--warning-background-color-active-rgb", Color2(warningcolor3));
document.querySelector('html').style.setProperty("--warning-foreground-color-rgb", Color2(warningcolor2));
document.querySelector('html').style.setProperty("--warning-foreground-color-hover-rgb", Color2(warningcolor2t));
document.querySelector('html').style.setProperty("--warning-foreground-color-inverted-rgb", Color2(warningcolor2I));
document.querySelector('html').style.setProperty("--warning-foreground-color-hover-inverted-rgb", Color2(warningcolor2tI));
document.querySelector('html').style.setProperty("--warning-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--warning-gradient-color") ));
document.querySelector('html').style.setProperty("--warning-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--warning-gradient-color-hover") ));


/** Success Color **/
/* Set Vars */
var success_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--success-background-color");
var successcolor1 = ColorTest(success_color,false);
var successcolor2 = ColorTest(success_color,true);
var successcolor2I = ColorTest(success_color,true,true);
var successcolor2t = ColorTest(successcolor2,false);
var successcolor2tI = ColorTest(successcolor2I,false);
var successcolor3 = SuperColorTest(success_color); // Scrollbar


if (isLightColor(success_color)) {
document.querySelector('html').style.setProperty("--success-gradient-color", success_color);
document.querySelector('html').style.setProperty("--success-gradient-color-hover", successcolor1);
} else {
document.querySelector('html').style.setProperty("--success-gradient-color", successcolor1);
document.querySelector('html').style.setProperty("--success-gradient-color-hover", success_color);
}

successmixl = GetHoverColor(content_color,success_color,'rgb',5);
successmix = GetActiveColor(content_color,success_color,'rgb',5);


/* Set Values */
document.querySelector('html').style.setProperty("--success-background-color-hover", successcolor1);
document.querySelector('html').style.setProperty("--success-background-color-active", successcolor3); // Scrollbar
document.querySelector('html').style.setProperty("--success-foreground-color", successcolor2);
document.querySelector('html').style.setProperty("--success-foreground-color-hover", successcolor2t);
document.querySelector('html').style.setProperty("--success-foreground-color-inverted", successcolor2I);
document.querySelector('html').style.setProperty("--success-foreground-color-hover-inverted", successcolor2tI);
document.querySelector('html').style.setProperty("--success-background-color-page-background-color-mix-light", successmixl);
document.querySelector('html').style.setProperty("--success-background-color-page-background-color-mix", successmix);
// RGB
document.querySelector('html').style.setProperty("--success-background-color-rgb", Color2(success_color));
document.querySelector('html').style.setProperty("--success-background-color-hover-rgb", Color2(successcolor1));
document.querySelector('html').style.setProperty("--success-background-color-active-rgb", Color2(successcolor3));
document.querySelector('html').style.setProperty("--success-foreground-color-rgb", Color2(successcolor2));
document.querySelector('html').style.setProperty("--success-foreground-color-hover-rgb", Color2(successcolor2t));
document.querySelector('html').style.setProperty("--success-foreground-color-inverted-rgb", Color2(successcolor2I));
document.querySelector('html').style.setProperty("--success-foreground-color-hover-inverted-rgb", Color2(successcolor2tI));
document.querySelector('html').style.setProperty("--success-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--success-gradient-color") ));
document.querySelector('html').style.setProperty("--success-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--success-gradient-color-hover") ));


/** Message Color **/
/* Set Vars */
var message_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--message-background-color");
var messagecolor1 = ColorTest(message_color,false);
var messagecolor2 = ColorTest(message_color,true);
var messagecolor2I = ColorTest(message_color,true,true);
var messagecolor2t = ColorTest(messagecolor2,false);
var messagecolor2tI = ColorTest(messagecolor2I,false);
var messagecolor3 = SuperColorTest(message_color); // Scrollbar


if (isLightColor(message_color)) {
document.querySelector('html').style.setProperty("--message-gradient-color", message_color);
document.querySelector('html').style.setProperty("--message-gradient-color-hover", messagecolor1);
} else {
document.querySelector('html').style.setProperty("--message-gradient-color", messagecolor1);
document.querySelector('html').style.setProperty("--message-gradient-color-hover", message_color);
}

messagemixl = GetHoverColor(content_color,message_color,'rgb',5);
messagemix = GetActiveColor(content_color,message_color,'rgb',5);


/* Set Values */
document.querySelector('html').style.setProperty("--message-background-color-hover", messagecolor1);
document.querySelector('html').style.setProperty("--message-background-color-active", messagecolor3); // Scrollbar
document.querySelector('html').style.setProperty("--message-foreground-color", messagecolor2);
document.querySelector('html').style.setProperty("--message-foreground-color-hover", messagecolor2t);
document.querySelector('html').style.setProperty("--message-foreground-color-inverted", messagecolor2I);
document.querySelector('html').style.setProperty("--message-foreground-color-hover-inverted", messagecolor2tI);
document.querySelector('html').style.setProperty("--message-background-color-page-background-color-mix-light", messagemixl);
document.querySelector('html').style.setProperty("--message-background-color-page-background-color-mix", messagemix);
// RGB
document.querySelector('html').style.setProperty("--message-background-color-rgb", Color2(message_color));
document.querySelector('html').style.setProperty("--message-background-color-hover-rgb", Color2(messagecolor1));
document.querySelector('html').style.setProperty("--message-background-color-active-rgb", Color2(messagecolor3));
document.querySelector('html').style.setProperty("--message-foreground-color-rgb", Color2(messagecolor2));
document.querySelector('html').style.setProperty("--message-foreground-color-hover-rgb", Color2(messagecolor2t));
document.querySelector('html').style.setProperty("--message-foreground-color-inverted-rgb", Color2(messagecolor2I));
document.querySelector('html').style.setProperty("--message-foreground-color-hover-inverted-rgb", Color2(messagecolor2tI));
document.querySelector('html').style.setProperty("--message-gradient-color-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--message-gradient-color") ));
document.querySelector('html').style.setProperty("--message-gradient-color-hover-rgb", Color2( getComputedStyle(document.querySelector('html')).getPropertyValue("--message-gradient-color-hover") ));


/* Article Link Colors */
document.querySelector('html').style.setProperty("--anchor-background-color-hover-dledlen", ColorTest(link_color,false,false,true));
document.querySelector('html').style.setProperty("--anchor-background-color-active-dledlen", SuperColorTest(link_color,true));
document.querySelector('html').style.setProperty("--accent-background-color-hover-dledlen", ColorTest(button_color,false,false,true));
document.querySelector('html').style.setProperty("--accent-background-color-active-dledlen", SuperColorTest(button_color,true));
document.querySelector('html').style.setProperty("--page-border-background-color-hover-dledlen", ColorTest(border_color,false,false,true));
document.querySelector('html').style.setProperty("--page-border-background-color-active-dledlen", SuperColorTest(border_color,true));
document.querySelector('html').style.setProperty("--community-background-color-hover-dledlen", ColorTest(head_color,false,false,true));
document.querySelector('html').style.setProperty("--community-background-color-active-dledlen", SuperColorTest(head_color,true));
document.querySelector('html').style.setProperty("--sticky-header-background-color-hover-dledlen", ColorTest(header_color,false,false,true));
document.querySelector('html').style.setProperty("--sticky-header-background-color-active-dledlen", SuperColorTest(header_color,true));
if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") != 'auto') || (window.MW18darkmode === true) ) {
	document.querySelector('html').style.setProperty("--page-text-background-color-hover-dledlen", ColorTest(content_text,false,false,true));
	document.querySelector('html').style.setProperty("--page-text-background-color-active-dledlen", SuperColorTest(content_text,true));
} else {
	document.querySelector('html').style.setProperty("--page-text-background-color-hover-dledlen", ColorTest(dropdowncolor3,false,false,true));
	document.querySelector('html').style.setProperty("--page-text-background-color-active-dledlen", SuperColorTest(dropdowncolor3,true));
}
document.querySelector('html').style.setProperty("--toolbar-background-color-hover-dledlen", ColorTest(floating_color,false,false,true));
document.querySelector('html').style.setProperty("--toolbar-background-color-active-dledlen", SuperColorTest(floating_color,true));
document.querySelector('html').style.setProperty("--alert-background-color-hover-dledlen", ColorTest(alert_color,false,false,true));
document.querySelector('html').style.setProperty("--alert-background-color-active-dledlen", SuperColorTest(alert_color,true));
document.querySelector('html').style.setProperty("--warning-background-color-hover-dledlen", ColorTest(warning_color,false,false,true));
document.querySelector('html').style.setProperty("--warning-background-color-active-dledlen", SuperColorTest(warning_color,true));
document.querySelector('html').style.setProperty("--success-background-color-hover-dledlen", ColorTest(success_color,false,false,true));
document.querySelector('html').style.setProperty("--success-background-color-active-dledlen", SuperColorTest(success_color,true));
document.querySelector('html').style.setProperty("--message-background-color-hover-dledlen", ColorTest(message_color,false,false,true));
document.querySelector('html').style.setProperty("--message-background-color-active-dledlen", SuperColorTest(message_color,true));



/* Cursor Theme */
if (refresh === true) {
	CheckBG()
	CheckAdapt()
}

}


function CheckAdapt() {
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--toolbar-background-color") === 'auto')  ) {
				$("body").attr('toolbar-background-color-auto', 'true');
		} else {
				$("body").attr('toolbar-background-color-auto', 'false');
		}
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") === 'auto')  ) {
				$("body").attr('page-border-background-color-auto', 'true');
		} else {
				$("body").attr('page-border-background-color-auto', 'false');
		}
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") === 'auto')  ) {
				$("body").attr('page-text-background-color-auto', 'true');
		} else {
				$("body").attr('page-text-background-color-auto', 'false');
		}
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--caret-color") === 'auto')  ) {
				$("body").attr('caret-color-auto', 'true');
		} else {
				$("body").attr('caret-color-auto', 'false');
		}
//	ColorUpdate(false);
}

function CheckBG() {
	var	background_mode = "standard";
	if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") === 'full') || (getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") === 'legacy')  ) {
		var background_mode = "full";
	} else if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") === 'blended') || (getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") === 'modern') ) {
		var background_mode = "standard";
	} else {
		var background_mode = "standard";
	}
		
	if ($("body.options").length ) { // Don't run if not on Preferences Page
	/* BG */ // Background Style
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") === 'full') || (getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") === 'legacy')  ) {
				document.querySelector('input#BG_2').checked = true;
				document.querySelector('input#BG_1').checked = false;
				document.querySelector('input#BG_3').checked = false;
		} else if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") === 'blended') || (getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") === 'modern') ) {
				document.querySelector('input#BG_3').checked = true;
				document.querySelector('input#BG_1').checked = false;
		} else {
				document.querySelector('input#BG_3').checked = true;
				document.querySelector('input#BG_1').checked = false;
		}
	/* BG1 */ // Background Vertical Alingment
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-vertical-alignment") === 'center')   ) {
				document.querySelector('input#BG1_2').checked = true;
				document.querySelector('input#BG1_1').checked = false;
				document.querySelector('input#BG1_3').checked = false;
		} else if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-vertical-alignment") === 'bottom')  ) {
				document.querySelector('input#BG1_3').checked = true;
				document.querySelector('input#BG1_1').checked = false;
				document.querySelector('input#BG1_2').checked = false;
		} else {
				document.querySelector('input#BG1_1').checked = true;
				document.querySelector('input#BG1_2').checked = false;
				document.querySelector('input#BG1_3').checked = false;
		}
	/* BG2 */ // Background Tiling
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-no-tiling") === 'true') && !($("html.contrast.win10").length)  ) {
				document.querySelector('input#BG2').checked = true;
		} else {
				document.querySelector('input#BG2').checked = false;
		}
	/* BG3 */
	/*
	**
	cover-off items are disabled when background-size is on Cover
	stretch-off items are disabled when background-size is on Stretched
	noncover-off items are enabled only if background-size is on Cover
	noncover-off items are enabled only if background-size is on Cover
	**
	*/
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-size") === 'contain')  ) {
				document.querySelector('input#BG3_2').checked = true;
				document.querySelector('input#BG3_1').checked = false;
				document.querySelector('input#BG3_3').checked = false;
				document.querySelector('input#BG3_4').checked = false;
				$(".cover-off").removeAttr('disabled');
				$(".stretch-off").removeAttr('disabled');
				$(".noncover-off").attr('disabled', 'true');
		} else if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-size") === 'stretched')  ) {
				document.querySelector('input#BG3_3').checked = true;
				document.querySelector('input#BG3_1').checked = false;
				document.querySelector('input#BG3_2').checked = false;
				document.querySelector('input#BG3_4').checked = false;
				$(".cover-off").removeAttr('disabled');
				$(".stretch-off").attr('disabled', 'true');
				$(".noncover-off").attr('disabled', 'true');
		} else if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-size") === 'full') ) {
				document.querySelector('input#BG3_4').checked = true;
				document.querySelector('input#BG3_1').checked = false;
				document.querySelector('input#BG3_2').checked = false;
				document.querySelector('input#BG3_3').checked = false;
				$(".cover-off").removeAttr('disabled');
				$(".stretch-off").removeAttr('disabled');
				$(".noncover-off").attr('disabled', 'true');
		} else { // Cover
				document.querySelector('input#BG3_1').checked = true;
				document.querySelector('input#BG3_2').checked = false;
				document.querySelector('input#BG3_3').checked = false;
				document.querySelector('input#BG3_4').checked = false;
				$(".noncover-off").removeAttr('disabled');
				$(".stretch-off").removeAttr('disabled');
				$(".cover-off").attr('disabled', 'true');
		}
	/* BG4 */ // Background Vertical Alingment
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-horizontal-alignment") === 'left')   ) {
				document.querySelector('input#BG4_2').checked = true;
				document.querySelector('input#BG4_1').checked = false;
				document.querySelector('input#BG4_3').checked = false;
		} else if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-horizontal-alignment") === 'right')  ) {
				document.querySelector('input#BG4_3').checked = true;
				document.querySelector('input#BG4_1').checked = false;
				document.querySelector('input#BG4_2').checked = false;
		} else {
				document.querySelector('input#BG4_1').checked = true;
				document.querySelector('input#BG4_2').checked = false;
				document.querySelector('input#BG4_3').checked = false;
		}

	}

	$("body").attr('community-background-mode', background_mode); // getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode");
	$("body").attr('community-background-size', getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-size") );
	$("body").attr('community-background-horizontal-alignment', getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-horizontal-alignment") );
	$("body").attr('community-background-vertical-alignment', getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-vertical-alignment") );
	$("body").attr('community-background-no-tiling', getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-no-tiling") );
}
