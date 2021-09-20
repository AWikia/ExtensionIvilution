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
function ColorTestTwin(color1,color2,intensity=1) {
	var alpha = 0.5*intensity;
	var r = Color(color1).getRed() * (1 - alpha);
	var g = Color(color1).getGreen() * (1 - alpha);
	var b = Color(color1).getBlue() * (1 - alpha);

	var r1 = Color(color2).getRed() * alpha;
	var g1 = Color(color2).getGreen() * alpha;
	var b1 = Color(color2).getBlue() * alpha;
	return Color([(r + r1) * 255,(g + g1) * 255,(b + b1) * 255]);
}

function GetHoverColor(color1='#ffffff',color2='#000000') { // Used by color mixes
	var alpha = 0.2;
	var r = Color(color1).getRed() * (1 - alpha);
	var g = Color(color1).getGreen() * (1 - alpha);
	var b = Color(color1).getBlue() * (1 - alpha);

	var r1 = Color(color2).getRed() * alpha;
	var g1 = Color(color2).getGreen() * alpha;
	var b1 = Color(color2).getBlue() * alpha;
	return Color([(r + r1) * 255,(g + g1) * 255,(b + b1) * 255]);
}

function GetActiveColor(color1='#ffffff',color2='#000000') { // Used by color mixes
	var alpha = 0.4;
	var r = Color(color1).getRed() * (1 - alpha);
	var g = Color(color1).getGreen() * (1 - alpha);
	var b = Color(color1).getBlue() * (1 - alpha);

	var r1 = Color(color2).getRed() * alpha;
	var g1 = Color(color2).getGreen() * alpha;
	var b1 = Color(color2).getBlue() * alpha;
	return Color([(r + r1) * 255,(g + g1) * 255,(b + b1) * 255]);
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
				return Color(color).darkenByAmount( 0.2 );
			} else {
				return Color(color).lightenByAmount( 0.2 );
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
				return Color(color).darkenByAmount( 0.2 );
			} else {
				return Color(color).lightenByAmount( 0.2 );
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
				return Color(color).darkenByAmount( 0.4 );
			} else {
				return Color(color).lightenByAmount( 0.4 );
	}
}

function ColorInvert(color) {
	var r = 1 - Color(color).getRed();
	var g = 1 - Color(color).getGreen();
	var b = 1 - Color(color).getBlue();
	return Color(color).setRed(r).setGreen(g).setBlue(b).shiftHue(180);
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
	return Math.round(Color(color).getRed() * 255 ) + ',' + Math.round(Color(color).getGreen() * 255) + ',' + Math.round(Color(color).getBlue() * 255);
}


function isLightColor(color) {
	return (Color(color).getLuminance() >= 0.5)
}


function isSuperLightColor(color) {
	return (Color(color).getLuminance() >= 0.75)
}

function GetContrast(color1,color2) {
	var L1 = Color(color1).getLuminance2();
	var L2 = Color(color2).getLuminance2();
	if (L2 < L1) {
		return ( (L1 + 0.05) / (L2 + 0.05) );
	} else {
		return ( (L2 + 0.05) / (L1 + 0.05) );
	}
}


function isSuitableColor(color,color2) {
return ((chroma.contrast(color, color2)) >= 3)
}

function isSuitableColor2(color,color2) {
return ((chroma.contrast(color, color2)) >= 1.25) // For Border Color
}

function isSuitableColor3(color,color2) {
return ((chroma.contrast(color, color2)) >= 1.05) // For Border Color
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
// dropdowncolor2 is Content Border

// Liatch Quirk
// Part A
if ( (window.MW18darkmode === true) ) {
	document.querySelector('body').style.setProperty("--page-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--page-background-color")));
} else {
	document.querySelector('body').style.setProperty("--page-background-color", 'inherit');
}
var content_color = getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color");


// Part B
if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") === 'auto')) {
	if (isLightColor(content_color)) {
		var content_text = getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-text-background-color")
	} else {
		var content_text = getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-text-background-color")
	}
} else {
		var content_text = getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color");
}

if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") != 'auto') ) { // Only run this part of Liatch quirk if not in autocolorization
	if ( (window.MW18darkmode === true) ) {
		document.querySelector('body').style.setProperty("--page-text-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color")));
		if ( !(isSuitableColor(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-text-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color"),false,false,true));
		}
		if ( !(isSuitableColor(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-text-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color"),false,false,true));
		}
		if ( !(isSuitableColor(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color"), getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color"))) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-text-background-color", ColorTest(getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color"),false,false,true));
		}
	} else {
		document.querySelector('body').style.setProperty("--page-text-background-color", content_text);
	}
} else {
	document.querySelector('body').style.setProperty("--page-text-background-color", content_text);
}
		var content_text = getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color");


var content_color2 = ColorTest(content_color);
var content_color3 = SuperColorTest(content_color); // Scrollbar


if (isLightColor(content_color)) {
	var dropdowncolor = ColorTestTwin(content_color,"#000000",0.25);
	if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") === 'auto')  ) {
		var dropdowncolor2 = ColorTestTwin(content_color,"#1a1a1a",0.5);
	} else {
		var dropdowncolor2 = 'inherit';
	}

} else {
	var dropdowncolor = ColorTestTwin(content_color,"#ffffff",0.25);
	if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") === 'auto')  ) {
		var dropdowncolor2 = ColorTestTwin(content_color,"#e5e5e5",0.5);
	} else {
		var dropdowncolor2 = 'inherit';
	}

}
	var content_text2 = ColorTest(content_text);
	var content_text3 = SuperColorTest(content_text); // Scrollbar
	var content_text4 = ColorTest(content_text,true);
	var content_text4I = ColorTest(content_text,true,true);
	colormixl = GetHoverColor(content_color,content_text);
	colormix = GetActiveColor(content_color,content_text);
	var content_text5 = ColorTest(content_text4,false);
	var content_text5I = ColorTest(content_text4I,false);

var dropdowncolorH = ColorTest(dropdowncolor);
var dropdowncolorA = SuperColorTest(dropdowncolor); // Scrollbar


document.querySelector('html').style.setProperty("--page-secondary-background-color", dropdowncolor);
document.querySelector('html').style.setProperty("--page-secondary-background-color-hover", dropdowncolorH);
document.querySelector('html').style.setProperty("--page-secondary-background-color-active", dropdowncolorA);

document.querySelector('body').style.setProperty("--page-border-background-color", dropdowncolor2);


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




buttonmixl = GetHoverColor(content_color,button_color);
buttonmix = GetActiveColor(content_color,button_color);


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


headermixl = GetHoverColor(content_color,header_color);
headermix = GetActiveColor(content_color,header_color);



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




linkmixl = GetHoverColor(content_color,link_color);
linkmix = GetActiveColor(content_color,link_color);


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


bordermixl = GetHoverColor(content_color,border_color);
bordermix = GetActiveColor(content_color,border_color);

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


headmixl = GetHoverColor(content_color,head_color);
headmix = GetActiveColor(content_color,head_color);

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
	var floating_header = ColorTestTwin(content_color,ColorTestTwin(header_color,button_color,1),2.5);
}

document.querySelector('body').style.setProperty("--toolbar-background-color", floating_header);
var floating_color =getComputedStyle(document.querySelector('body')).getPropertyValue("--toolbar-background-color");


var floatingcolor1 = ColorTest(floating_color,false);
var floatingcolor3 = SuperColorTest(floating_color); // Scrollbar
var floatingcolor2 = ColorTest(floating_color,true);
var floatingcolor2I = ColorTest(floating_color,true,true);
var floatingcolor2t = ColorTest(floatingcolor2,false);
var floatingcolor2tI = ColorTest(floatingcolor2I,false);


floatmixl = GetHoverColor(content_color,floating_color);
floatmix = GetActiveColor(content_color,floating_color);


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


/* This goes before compiling Generic Colors or else they will think the theme is light */
if (window.MW18darkmode) {
	$('body').attr("dark-mode", isLightColor(getComputedStyle(document.querySelector('html')).getPropertyValue("--page-background-color")) );
} else {
	$('body').attr("dark-mode", !(isLightColor(getComputedStyle(document.querySelector('html')).getPropertyValue("--page-background-color"))) );
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



alertmixl = GetHoverColor(content_color,alert_color);
alertmix = GetActiveColor(content_color,alert_color);


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


/** Warning Color **/
/* Set Vars */
var warning_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--warning-background-color");
var warningcolor1 = ColorTest(warning_color,false);
var warningcolor2 = ColorTest(warning_color,true);
var warningcolor2I = ColorTest(warning_color,true,true);
var warningcolor2t = ColorTest(warningcolor2,false);
var warningcolor2tI = ColorTest(warningcolor2I,false);
var warningcolor3 = SuperColorTest(warning_color); // Scrollbar



warningmixl = GetHoverColor(content_color,warning_color);
warningmix = GetActiveColor(content_color,warning_color);


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


/** Success Color **/
/* Set Vars */
var success_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--success-background-color");
var successcolor1 = ColorTest(success_color,false);
var successcolor2 = ColorTest(success_color,true);
var successcolor2I = ColorTest(success_color,true,true);
var successcolor2t = ColorTest(successcolor2,false);
var successcolor2tI = ColorTest(successcolor2I,false);
var successcolor3 = SuperColorTest(success_color); // Scrollbar



successmixl = GetHoverColor(content_color,success_color);
successmix = GetActiveColor(content_color,success_color);


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


/** Message Color **/
/* Set Vars */
var message_color = getComputedStyle(document.querySelector('html')).getPropertyValue("--message-background-color");
var messagecolor1 = ColorTest(message_color,false);
var messagecolor2 = ColorTest(message_color,true);
var messagecolor2I = ColorTest(message_color,true,true);
var messagecolor2t = ColorTest(messagecolor2,false);
var messagecolor2tI = ColorTest(messagecolor2I,false);
var messagecolor3 = SuperColorTest(message_color); // Scrollbar



messagemixl = GetHoverColor(content_color,message_color);
messagemix = GetActiveColor(content_color,message_color);


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
document.querySelector('html').style.setProperty("--page-text-background-color-hover-dledlen", ColorTest(content_text,false,false,true));
document.querySelector('html').style.setProperty("--page-text-background-color-active-dledlen", SuperColorTest(content_text,true));
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
		if ((getComputedStyle(document.querySelector('body')).getPropertyValue("--community-header-text-color") === 'auto')  ) {
				$("body").attr('community-header-text-color-auto', 'true');
		} else {
				$("body").attr('community-header-text-color-auto', 'false');
		}
		if ((getComputedStyle(document.querySelector('body')).getPropertyValue("--toolbar-background-color") === 'auto')  ) {
				$("body").attr('toolbar-background-color-auto', 'true');
		} else {
				$("body").attr('toolbar-background-color-auto', 'false');
		}
		if ((getComputedStyle(document.querySelector('body')).getPropertyValue("--page-border-background-color") === 'auto')  ) {
				$("body").attr('page-border-background-color-auto', 'true');
		} else {
				$("body").attr('page-border-background-color-auto', 'false');
		}
		if ((getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color") === 'auto')  ) {
				$("body").attr('page-text-background-color-auto', 'true');
		} else {
				$("body").attr('page-text-background-color-auto', 'false');
		}
		if ((getComputedStyle(document.querySelector('body')).getPropertyValue("--caret-color") === 'auto')  ) {
				$("body").attr('caret-color-auto', 'true');
		} else {
				$("body").attr('caret-color-auto', 'false');
		}
//	ColorUpdate(false);
}

function CheckBG() {
	var	background_mode = "standard";
	if ((getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-mode") === 'full') || (getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-mode") === 'legacy')  ) {
		var background_mode = "full";
	} else if ((getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-mode") === 'blended') || (getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-mode") === 'modern') ) {
		var background_mode = "standard";
	} else {
		var background_mode = "standard";
	}
		
	$("body").attr('community-background-mode', background_mode); // getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-mode");
	$("body").attr('community-background-size', getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-size") );
	$("body").attr('community-background-horizontal-alignment', getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-horizontal-alignment") );
	$("body").attr('community-background-vertical-alignment', getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-vertical-alignment") );
	$("body").attr('community-background-no-horizontal-tiling', getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-no-horizontal-tiling") );
	$("body").attr('community-background-no-vertical-tiling', getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-no-vertical-tiling") );
}

/* 
** BG  = Backgkround Body Display - community-background-mode attribute is ued
** BG1 = Background Vertial Position - community-background-vertical-alignment attribute is ued
** BG2 = Background Tiling (Only with Full or Contain sizing) - community-background-no-tiling attribute is used
** BG3 = Background Size - community-background-size attribute is used
** BG4 = Background Horizontal Position - community-background-horizontal-alignment attribute is ued
*/
