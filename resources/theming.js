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
	$("body").prepend('<div style="position:absolute; top:-9999999999999999px; left:-99999999999999999999px">' +
						'<span class="ad-alert" style="color:var(--alert-background-color)"></span>' +
						'<span class="ad-warning" style="color:var(--warning-background-color)"></span>' +
						'<span class="ad-success" style="color:var(--success-background-color)"></span>' +
						'<span class="ad-message" style="color:var(--message-background-color)"></span>' +
						'<span class="page-sec" style="color:var(--page-secondary-background-color)">' + 
						'</span><span class="page-bor" style="color:var(--page-border-background-color)"></span>' +
						'</div>'
					  );	// Helper for some things
	ColorUpdate(true);

}() );


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function SupportsColorMix() {
	return CSS.supports("color","color-mix(in srgb, #34c9eb 70%, white)") || CSS.supports("color:color-mix(in srgb, #34c9eb 70%, white)") 
}

function SupportsColorContrast() {
	return CSS.supports("color","color-contrast(wheat vs tan, sienna, #d2691e)") 

}

function ForcedColors() {
	return window.matchMedia('(forced-colors: active)').matches 
}

/* Used for some wiki theme modes 
	Also used for some notifications
	Called on body element only */
function CheckTheme() {
	/* Wiki theme */
	ColorUpdate(true);
}

/* Getting non-generic color values */
function GetCommunity() {
		return getComputedStyle(document.querySelector('body')).getPropertyValue("--community-background-color");
}

function GetCommunityHeaderText() {
		return getComputedStyle(document.querySelector('body')).getPropertyValue("--community-header-text-background-color");
}


function GetPageShort() { // Like GetPage() without forced colors mode you get the unaltered page background mode (Used for checking dark mode)
		return getComputedStyle(document.querySelector('html')).getPropertyValue("--page-background-color");
}


function GetPage() {
		return getComputedStyle(document.querySelector('body')).getPropertyValue("--page-background-color");
}

function GetAnchor() {
		return getComputedStyle(document.querySelector('body')).getPropertyValue("--anchor-background-color");
}


function GetPageBorder() {
	if (SupportsColorMix()) {
		return getComputedStyle(document.querySelector('.page-bor')).getPropertyValue("color");
	} else {
		return getComputedStyle(document.querySelector('body')).getPropertyValue("--page-border-background-color");
	}
}


function GetPageText() {
		return getComputedStyle(document.querySelector('body')).getPropertyValue("--page-text-background-color");
}


function GetAccent() {
		return getComputedStyle(document.querySelector('body')).getPropertyValue("--accent-background-color");
}

function GetStickyHeader() {
	return getComputedStyle(document.querySelector('body')).getPropertyValue("--sticky-header-background-color");
}

function GetAlert() {
		return getComputedStyle(document.querySelector('.ad-alert')).getPropertyValue("color");
}


function GetWarning() {
		return getComputedStyle(document.querySelector('.ad-warning')).getPropertyValue("color");
}

function GetSuccess() {
		return getComputedStyle(document.querySelector('.ad-success')).getPropertyValue("color");
}

function GetMessage() {
		return getComputedStyle(document.querySelector('.ad-message')).getPropertyValue("color");
}

function BestAlertColor() {
if ( (isDarkColor(GetPage())) ) {
/** V1 **/
var colors = ['#e60000', '#cc0000', '#b30000', '#990000', '#800000', '#660000', '#4d0000', '#330000', '#1a0000', '#ff1919', '#ff3333', '#ff4d4d', '#ff6666', '#ff8080', '#ff9999', '#ffb3b3', '#ffcccc', '#ffe6e6'];
var colors2= ['#e69500', '#cc8500', '#b37400', '#996300', '#805300', '#664200', '#4d3200', '#332100', '#1a1100', '#ffaf19', '#ffb833', '#ffc14d', '#ffc966', '#ffd280', '#ffdb99', '#ffe4b3', '#ffedcc', '#fff6e6'];
var colors3= ['#00e673', '#00cc66', '#00b359', '#00994d', '#008040', '#006633', '#004d26', '#00331a', '#001a0d', '#19ff8c', '#33ff99', '#4dffa6', '#66ffb3', '#80ffbf', '#99ffcc', '#b3ffd9', '#ccffe6', '#e6fff2'];
var colors4= ['#727272', '#666666', '#595959', '#4c4c4c', '#404040', '#333333', '#262626', '#191919', '#0c0c0c', '#8c8c8c', '#999999', '#a5a5a5', '#b2b2b2', '#bfbfbf', '#cccccc', '#d8d8d8', '#e5e5e5', '#f2f2f2'];

} else {
/** V1 **/
var colors = ['#ff1919', '#ff3333', '#ff4d4d', '#ff6666', '#ff8080', '#ff9999', '#ffb3b3', '#ffcccc', '#ffe6e6', '#e60000', '#cc0000', '#b30000', '#990000', '#800000', '#660000', '#4d0000', '#330000', '#1a0000'];
var colors2= ['#ffaf19', '#ffb833', '#ffc14d', '#ffc966', '#ffd280', '#ffdb99', '#ffe4b3', '#ffedcc', '#fff6e6', '#e69500', '#cc8500', '#b37400', '#996300', '#805300', '#664200', '#4d3200', '#332100', '#1a1100'];
var colors3= ['#19ff8c', '#33ff99', '#4dffa6', '#66ffb3', '#80ffbf', '#99ffcc', '#b3ffd9', '#ccffe6', '#e6fff2', '#00e673', '#00cc66', '#00b359', '#00994d', '#008040', '#006633', '#004d26', '#00331a', '#001a0d'];
var colors4= ['#8c8c8c', '#999999', '#a5a5a5', '#b2b2b2', '#bfbfbf', '#cccccc', '#d8d8d8', '#e5e5e5', '#f2f2f2', '#727272', '#666666', '#595959', '#4c4c4c', '#404040', '#333333', '#262626', '#191919', '#0c0c0c'];

}
		contrastA = (window.matchMedia('(prefers-contrast: more)').matches) ? 3.30 : 3.00
		contrastW = (window.matchMedia('(prefers-contrast: more)').matches) ? 3.20 : 2.75
		contrastS = (window.matchMedia('(prefers-contrast: more)').matches) ? 3.10 : 2.50
		contrastM = (window.matchMedia('(prefers-contrast: more)').matches) ? 3.00 : 2.25

	for (let i = 0; i < colors.length; i++) {
		if ( ((chroma.contrast(GetPage(), colors[i])) >= contrastA) && ((chroma.contrast(GetPage(), colors2[i])) >= contrastW) && ((chroma.contrast(GetPage(), colors3[i])) >= contrastS) && ((chroma.contrast(GetPage(), colors4[i])) >= contrastM) ) {
			return Color4(colors[i]);
		}
	}
	if (isLightColor(GetPage())) {
		return '153 0 0';
	} else {
		return '255 102 102';
	}

 
}


function ActiveColorSet() { // Debugging material
	var set = ['255 25 25', '255 51 51', '255 77 77', '255 102 102', '255 128 128', '255 153 153', '255 179 179', '255 204 204', '255 230 230', '230 0 0', '204 0 0', '179 0 0', '153 0 0', '128 0 0', '102 0 0', '77 0 0', '51 0 0', '26 0 0'].indexOf($('html').attr("alert-color"))
var colors = ['#ff1919', '#ff3333', '#ff4d4d', '#ff6666', '#ff8080', '#ff9999', '#ffb3b3', '#ffcccc', '#ffe6e6', '#e60000', '#cc0000', '#b30000', '#990000', '#800000', '#660000', '#4d0000', '#330000', '#1a0000'];
var colors2= ['#ffaf19', '#ffb833', '#ffc14d', '#ffc966', '#ffd280', '#ffdb99', '#ffe4b3', '#ffedcc', '#fff6e6', '#e69500', '#cc8500', '#b37400', '#996300', '#805300', '#664200', '#4d3200', '#332100', '#1a1100'];
var colors3= ['#19ff8c', '#33ff99', '#4dffa6', '#66ffb3', '#80ffbf', '#99ffcc', '#b3ffd9', '#ccffe6', '#e6fff2', '#00e673', '#00cc66', '#00b359', '#00994d', '#008040', '#006633', '#004d26', '#00331a', '#001a0d'];
var colors4= ['#8c8c8c', '#999999', '#a5a5a5', '#b2b2b2', '#bfbfbf', '#cccccc', '#d8d8d8', '#e5e5e5', '#f2f2f2', '#727272', '#666666', '#595959', '#4c4c4c', '#404040', '#333333', '#262626', '#191919', '#0c0c0c'];
	var s = 'This theme uses set ' + set + ' of generic colors:' +
		   '\n Alert Color: ' + colors[set] + 
		   '\n Warning Color: ' + colors2[set] + 
		   '\n Success Color: ' + colors3[set] + 
		   '\n Message Color: ' + colors4[set]
	alert(s)
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
		var color2 = GetPage();
	} else {
		var color2 = color;
	}
	var func = (isLightColor(color2));
	if (func) {
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

// Conversion for R,G,B syntax
function Color2(color) {
	return Math.round(Color(color).getRed() * 255 ) + ',' + Math.round(Color(color).getGreen() * 255) + ',' + Math.round(Color(color).getBlue() * 255);
}

function Color4(color) {
	return Math.round(Color(color).getRed() * 255 ) + ' ' + Math.round(Color(color).getGreen() * 255) + ' ' + Math.round(Color(color).getBlue() * 255);
}

function setLightful(color,prop="page-text") {
	$("html").attr("light-" + prop, isLightColor(color))
}

function isLightColor(color) {
	var c1 = (chroma.contrast('#000000',  Color(color).toString()))
	var c2 = (chroma.contrast('#ffffff',  Color(color).toString()))
	var contrast = (window.matchMedia('(prefers-contrast: more)').matches) ? 7 : 4.5
	var contrast2 = (window.matchMedia('(prefers-contrast: more)').matches) ? 3 : 4.5
	if (c1 > c2) {
		return (c1 >= contrast )
	} else {
		return (c2 < contrast2 )
	}
}

function isDarkColor(color) {
	return !isLightColor(color)
}

function isSuperLightColor(color) {
	var c1 = (chroma.contrast('#000000',  Color(color).toString()))
	var contrast = (window.matchMedia('(prefers-contrast: more)').matches) ? 13 : 10
	return (c1 >= contrast )
}

function isSuperDarkColor(color) {
	var c1 = (chroma.contrast('#ffffff',  Color(color).toString()))
	var contrast = (window.matchMedia('(prefers-contrast: more)').matches) ? 13 : 10
	return (c1 >= contrast )
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
var contrast = (window.matchMedia('(prefers-contrast: more)').matches) ? 4.5 : 3
return ((chroma.contrast(color, color2)) >= contrast)
}

function isSuitableColor2(color,color2) {
var contrast = (window.matchMedia('(prefers-contrast: more)').matches) ? 1.75 : 1.25
return ((chroma.contrast(color, color2)) >= contrast) // For Border Color
}

function isSuitableColor3(color,color2) {
var contrast = (window.matchMedia('(prefers-contrast: more)').matches) ? 4.5 : 3
return ((chroma.contrast(color, color2)) >= contrast)
}


/* Used to udpate all dynamical variables */
function ColorUpdate(refresh=true) {
if (refresh === true) {
	CheckAdapt();
	/** Foreground Colors **/
	document.querySelector('html').style.setProperty("--light-theme-foreground-color-hover", ColorTest(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color")) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-hover", ColorTest(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color")) );

	document.querySelector('html').style.setProperty("--light-theme-foreground-color-rgb", Color2(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color")) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-rgb", Color2(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color")) );

	document.querySelector('html').style.setProperty("--light-theme-foreground-color-hover-rgb", Color2(ColorTest(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color"))) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-hover-rgb", Color2(ColorTest(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color"))) );
}


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
var content_color =  GetPage();


// Part B

if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") != 'auto') ) { // Only run this part of Liatch quirk if not in autocolorization
	if ( (window.MW18darkmode === true) ) {
		document.querySelector('body').style.setProperty("--page-text-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color")));
	} else {
		document.querySelector('body').style.setProperty("--page-text-background-color", 'inherit');
	}
		if ( !(isSuitableColor(GetPageText(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-text-background-color", ColorTest(GetPageText(),false,false,true));
			if ( !(isSuitableColor(GetPageText(), GetPage())) )  { // If still not legible
				document.querySelector('body').style.setProperty("--page-text-background-color", ColorTest(GetPageText(),false,false,true));
				if ( !(isSuitableColor(GetPageText(), GetPage())) )  { // If still not legible
					document.querySelector('body').style.setProperty("--page-text-background-color", ColorTest(GetPageText(),false,false,true));
					if ( !(isSuitableColor(GetPageText(), GetPage())) )  { // If still not legible
						document.querySelector('body').style.setProperty("--page-text-background-color", ColorTest(GetPageText(),false,false,true));
					}
				}
			}
		}

} else {
	document.querySelector('body').style.setProperty("--page-text-background-color", 'inherit');
}

	var content_text =  GetPageText();

var content_color2 = ColorTest(content_color);

var adjustment = (window.matchMedia('(prefers-contrast: more)').matches) ? 0.35 : 0.25

if (!SupportsColorMix()) {
	if (isLightColor(content_color)) {
		var dropdowncolor = ColorTestTwin(content_color,"#000000",adjustment);
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") === 'auto')  ) {
			var dropdowncolor2 = ColorTestTwin(content_color,"#000000",adjustment*2);
		} else {
			var dropdowncolor2 = 'inherit';
		}
	} else {
		var dropdowncolor = ColorTestTwin(content_color,"#ffffff",adjustment);
		if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") === 'auto')  ) {
			var dropdowncolor2 = ColorTestTwin(content_color,"#ffffff",adjustment*2);
		} else {
			var dropdowncolor2 = 'inherit';
		}
	}
	document.querySelector('body').style.setProperty("--page-border-background-color", dropdowncolor2);
} else {
	document.querySelector('body').style.setProperty("--page-border-background-color", 'inherit');
}
	var content_text2 = ColorTest(content_text,false,true,true);
	setLightful(content_text,'page-text');
	if (!SupportsColorContrast()) {
	setLightful(content_text2,'page-text-hover');
	}
	if (!SupportsColorMix()) {
		colormixl = GetHoverColor(content_color,content_text);
		colormix = GetActiveColor(content_color,content_text);
	}
	if (SupportsColorMix()) {
		var dropdowncolor = getComputedStyle(document.querySelector('.page-sec')).getPropertyValue("color")
		var dropdowncolor2 = getComputedStyle(document.querySelector('.page-bor')).getPropertyValue("color")
	}
var dropdowncolorH = ColorTest(dropdowncolor,false,false,true);

if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--page-secondary-background-color", dropdowncolor);
}
document.querySelector('html').style.setProperty("--page-secondary-background-color-hover", dropdowncolorH);



document.querySelector('html').style.setProperty("--page-background-color-hover", content_color2);
document.querySelector('html').style.setProperty("--page-text-background-color-hover", content_text2);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--page-text-background-color-page-background-color-mix-light", colormixl);
	document.querySelector('html').style.setProperty("--page-text-background-color-page-background-color-mix", colormix);
}
// RGB
document.querySelector('html').style.setProperty("--page-secondary-background-color-rgb", Color2(dropdowncolor));
document.querySelector('html').style.setProperty("--page-background-color-rgb", Color2( GetPage() ));
document.querySelector('html').style.setProperty("--page-text-background-color-rgb", Color2( GetPageText() ));
document.querySelector('html').style.setProperty("--page-text-background-color-hover-rgb", Color2(content_text2));


/** Button Color **/
/* Set Vars */
// Liatch Quirk
if ( (window.MW18darkmode === true) ) {
	document.querySelector('body').style.setProperty("--accent-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--accent-background-color")));
} else {
	document.querySelector('body').style.setProperty("--accent-background-color", 'inherit');
}
		if ( !(isSuitableColor2(GetAccent(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--accent-background-color", ColorTest(GetAccent(),false,false,true));
		}
		if ( !(isSuitableColor2(GetAccent(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--accent-background-color", ColorTest(GetAccent(),false,false,true));
		}
		if ( !(isSuitableColor2(GetAccent(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--accent-background-color", ColorTest(GetAccent(),false,false,true));
		}
		if ( !(isSuitableColor2(GetAccent(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--accent-background-color", ColorTest(GetAccent(),false,false,true));
		}


var button_color = GetAccent();
var buttoncolor1 = ColorTest(button_color,false);
setLightful(button_color,'accent');
if (!SupportsColorContrast()) {
	setLightful(buttoncolor1,'accent-hover');
}
if (!SupportsColorMix()) {
	buttonmixl = GetHoverColor(content_color,button_color);
	buttonmix = GetActiveColor(content_color,button_color);
}

/* Set Values */
document.querySelector('html').style.setProperty("--accent-background-color-hover", buttoncolor1);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--accent-background-color-page-background-color-mix-light", buttonmixl);
	document.querySelector('html').style.setProperty("--accent-background-color-page-background-color-mix", buttonmix);
}
// RGB
document.querySelector('html').style.setProperty("--accent-background-color-rgb", Color2(button_color));


/** Header Color **/
/* Set Vars */
// Liatch Quirk
if ( (window.MW18darkmode === true) ) {
	document.querySelector('body').style.setProperty("--sticky-header-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--sticky-header-background-color")));
} else {
	document.querySelector('body').style.setProperty("--sticky-header-background-color", 'inherit');
}

var header_color = GetStickyHeader();
var headercolor1 = ColorTest(header_color,false);
setLightful(header_color,'sticky-header');
if (!SupportsColorContrast()) {
	setLightful(headercolor1,'sticky-header-hover');
}

if (!SupportsColorMix()) {
	headermixl = GetHoverColor(content_color,header_color);
	headermix = GetActiveColor(content_color,header_color);
}


/* Set Values */
document.querySelector('html').style.setProperty("--sticky-header-background-color-hover", headercolor1);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--sticky-header-background-color-page-background-color-mix-light", headermixl);
	document.querySelector('html').style.setProperty("--sticky-header-background-color-page-background-color-mix", headermix);
}
// RGB
document.querySelector('html').style.setProperty("--sticky-header-background-color-rgb", Color2(header_color));


/** Link Color **/
/* Set Vars */
// Liatch Quirk
if ( (window.MW18darkmode === true) ) {
	document.querySelector('body').style.setProperty("--anchor-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--anchor-background-color")));
} else {
	document.querySelector('body').style.setProperty("--anchor-background-color", 'inherit');
}
		if ( !(isSuitableColor(GetAnchor(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--anchor-background-color", ColorTest(GetAnchor(),false,false,true));
		}
		if ( !(isSuitableColor(GetAnchor(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--anchor-background-color", ColorTest(GetAnchor(),false,false,true));
		}
		if ( !(isSuitableColor(GetAnchor(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--anchor-background-color", ColorTest(GetAnchor(),false,false,true));
		}
		if ( !(isSuitableColor(GetAnchor(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--anchor-background-color", ColorTest(GetAnchor(),false,false,true));
		}

var link_color = GetAnchor();
var linkcolor1 = ColorTest(link_color,false,false,true);
setLightful(link_color,'anchor');
if (!SupportsColorContrast()) {
	setLightful(linkcolor1,'anchor-hover');
}

if (!SupportsColorMix()) {
	linkmixl = GetHoverColor(content_color,link_color);
	linkmix = GetActiveColor(content_color,link_color);
}

/* Set Values */
document.querySelector('html').style.setProperty("--anchor-background-color-hover", linkcolor1);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--anchor-background-color-page-background-color-mix-light", linkmixl);
	document.querySelector('html').style.setProperty("--anchor-background-color-page-background-color-mix", linkmix);
}
// RGB
document.querySelector('html').style.setProperty("--anchor-background-color-rgb", Color2(link_color));

/** Content Border **/
/* Set Vars */


if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
	// Liatch Quirk

	if ( (window.MW18darkmode === true) ) {
		document.querySelector('body').style.setProperty("--page-border-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color")));
	}
		if ( !(isSuitableColor2(GetPageBorder(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-border-background-color", ColorTest(GetPageBorder(),false,false,true));
		}
		if ( !(isSuitableColor2(GetPageBorder(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-border-background-color", ColorTest(GetPageBorder(),false,false,true));
		}
		if ( !(isSuitableColor2(GetPageBorder(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-border-background-color", ColorTest(GetPageBorder(),false,false,true));
		}
		if ( !(isSuitableColor2(GetPageBorder(), GetPage())) )  { // If still not legible
			document.querySelector('body').style.setProperty("--page-border-background-color", ColorTest(GetPageBorder(),false,false,true));
		}

}

var border_color =	GetPageBorder();

var bordercolor1 = ColorTest(border_color);
setLightful(border_color,'page-border');
if (!SupportsColorContrast()) {
	setLightful(bordercolor1,'page-border-hover');
}

if (!SupportsColorMix()) {
	bordermixl = GetHoverColor(content_color,border_color);
	bordermix = GetActiveColor(content_color,border_color);
}

/* Set Values */
document.querySelector('html').style.setProperty("--page-border-background-color-hover", bordercolor1);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--page-border-background-color-page-background-color-mix-light", bordermixl);
	document.querySelector('html').style.setProperty("--page-border-background-color-page-background-color-mix", bordermix);
}
// RGB
document.querySelector('html').style.setProperty("--page-border-background-color-rgb", Color2(border_color));


/** Body Bg **/
/* Set Vars */
// Liatch Quirk
if ( (window.MW18darkmode === true) ) {
	document.querySelector('body').style.setProperty("--community-background-color", ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-color")));
} else {
	document.querySelector('body').style.setProperty("--community-background-color", 'inherit');
}

var head_color =	GetCommunity();
var headcolor1 = ColorTest(head_color,false,false,true);
setLightful(head_color,'community');
if (!SupportsColorContrast()) {
	setLightful(headcolor1,'community-hover');
}

if (!SupportsColorMix()) {
	headmixl = GetHoverColor(content_color,head_color);
	headmix = GetActiveColor(content_color,head_color);
}

/* Set Values */
document.querySelector('html').style.setProperty("--community-background-color-hover", headcolor1);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--community-background-color-page-background-color-mix-light", headmixl);
	document.querySelector('html').style.setProperty("--community-background-color-page-background-color-mix", headmix);
}
// RGB
document.querySelector('html').style.setProperty("--community-background-color-rgb", Color2(head_color));

/** Community Header text color **/
if ((getComputedStyle(document.querySelector('html')).getPropertyValue("--community-header-text-background-color") !== 'auto')  ) {
	// Liatch Quirk
	if ( (window.MW18darkmode === true) ) {
		headertext_color = ColorInvert(getComputedStyle(document.querySelector('html')).getPropertyValue("--community-header-text-background-color"));
	} else {
		headertext_color = 'inherit';
	}


} else {
	var headertext_color = 'inherit'
}

document.querySelector('body').style.setProperty("--community-header-text-background-color", headertext_color);
var headertext_color= GetCommunityHeaderText();

var headertextcolor1 = ColorTest(headertext_color,false,true,true);
	setLightful(headertext_color,'community-header-text');
if (!SupportsColorContrast()) {
	setLightful(headertextcolor1,'community-header-text-hover');
}

document.querySelector('html').style.setProperty("--community-header-text-background-color-hover", headertextcolor1);

// RGB
document.querySelector('html').style.setProperty("--community-header-text-background-color-rgb", Color2( getComputedStyle(document.querySelector('body')).getPropertyValue("--community-header-text-background-color") ));
document.querySelector('html').style.setProperty("--community-header-text-background-color-hover-rgb", Color2(headertextcolor1));


/* This goes before compiling Generic Colors or else they will think the theme is light */
	
	$('html').attr("dark-mode", (isDarkColor(GetPage())) );
	if (window.MW18darkmode) {
		$('html').attr("dark-mode-adjusted", isLightColor( GetPageShort() ));
	} else {
		$('html').attr("dark-mode-adjusted", !(isLightColor( GetPageShort() ) ));
	}


	$('html').attr("alert-color",BestAlertColor() );
	setLightful(GetAlert(),'alert');
	setLightful(GetWarning(),'warning');
	setLightful(GetSuccess(),'success');
	setLightful(GetMessage(),'message');
	
/** Alert Color **/
/* Set Vars */
var alert_color = GetAlert();
var alertcolor1 = ColorTest(alert_color,false,false,true);
if (!SupportsColorContrast()) {
	setLightful(alertcolor1,'alert-hover');
}

if (!SupportsColorMix()) {
	alertmixl = GetHoverColor(content_color,alert_color);
	alertmix = GetActiveColor(content_color,alert_color);
} else {
}



/* Set Values */
document.querySelector('html').style.setProperty("--alert-background-color-hover", alertcolor1);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--alert-background-color-page-background-color-mix-light", alertmixl);
	document.querySelector('html').style.setProperty("--alert-background-color-page-background-color-mix", alertmix);
}
// RGB
document.querySelector('html').style.setProperty("--alert-background-color-rgb", Color2(alert_color));


/** Warning Color **/
/* Set Vars */
var warning_color = GetWarning();
var warningcolor1 = ColorTest(warning_color,false,false,true);
if (!SupportsColorContrast()) {
	setLightful(warningcolor1,'warning-hover');
} else {
	$('body').attr("warning-color",Color2(GetWarning()));
}

if (!SupportsColorMix()) {
	warningmixl = GetHoverColor(content_color,warning_color);
	warningmix = GetActiveColor(content_color,warning_color);
}

/* Set Values */
document.querySelector('html').style.setProperty("--warning-background-color-hover", warningcolor1);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--warning-background-color-page-background-color-mix-light", warningmixl);
	document.querySelector('html').style.setProperty("--warning-background-color-page-background-color-mix", warningmix);
}
// RGB
document.querySelector('html').style.setProperty("--warning-background-color-rgb", Color2(warning_color));


/** Success Color **/
/* Set Vars */
var success_color = GetSuccess();
var successcolor1 = ColorTest(success_color,false,false,true);
if (!SupportsColorContrast()) {
	setLightful(successcolor1,'success-hover');
} else {
	$('body').attr("success-color",Color2(GetSuccess()) );
}

if (!SupportsColorMix()) {
	successmixl = GetHoverColor(content_color,success_color);
	successmix = GetActiveColor(content_color,success_color);
}

/* Set Values */
document.querySelector('html').style.setProperty("--success-background-color-hover", successcolor1);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--success-background-color-page-background-color-mix-light", successmixl);
	document.querySelector('html').style.setProperty("--success-background-color-page-background-color-mix", successmix);
}
// RGB
document.querySelector('html').style.setProperty("--success-background-color-rgb", Color2(success_color));


/** Message Color **/
/* Set Vars */
var message_color = GetMessage();
var messagecolor1 = ColorTest(message_color,false,false,true);
if (!SupportsColorContrast()) {
	setLightful(messagecolor1,'message-hover');
} else {
	$('body').attr("message-color",Color2(GetMessage()) );
}

if (!SupportsColorMix()) {
	messagemixl = GetHoverColor(content_color,message_color);
	messagemix = GetActiveColor(content_color,message_color);
}

/* Set Values */
document.querySelector('html').style.setProperty("--message-background-color-hover", messagecolor1);
if (!SupportsColorMix()) {
	document.querySelector('html').style.setProperty("--message-background-color-page-background-color-mix-light", messagemixl);
	document.querySelector('html').style.setProperty("--message-background-color-page-background-color-mix", messagemix);
}
// RGB
document.querySelector('html').style.setProperty("--message-background-color-rgb", Color2(message_color));




if (refresh === true) {
	CheckBG()
}
// SocialCompile();


}


function CheckAdapt() {
		if ((getComputedStyle(document.querySelector('body')).getPropertyValue("--community-header-text-color") === 'auto')  ) {
				$("body").attr('community-header-text-background-color-auto', 'true');
		} else {
				$("body").attr('community-header-text-background-color-auto', 'false');
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
