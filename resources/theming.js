/* Minimal Version of themes.js for use in Ivilution */
window.MW18darkmode = false;
window.MW18spdarkmode = 0; // 0 = No special behavior | 1 = Inverted Colors Dark | 2 = Grayscale | 3 = Yellow Tint | 4 = Blue Tint | 5 = Inverted Colors Light | 6 = Temperature | 7 = Inverted Temperature
window.MW18devicetheme = 'light';
window.MW18wikitheme = 'standard';
window.MW18contrastmode = 'auto';
window.MW18ActiveTheme = 'single';
window.MW18ActiveThemeMode = 'none';
window.MW18ActiveColors = 'standard';
window.MW18DCMMode = 'classic';
/* Some Theming Colors */
/* Contrast Values */
window.MW18lowContrast = 1.25;
window.MW18highContrast = 3.00;

( function () {

	/**
	 * @class mw.boilerPlate
	 * @singleton
	 */
	mw.Ivilution = {
	};
	$("body").prepend('<div style="position:absolute; top:-9999999999999999px; left:-99999999999999999999px">' +
		'<span class="fc-mozbuttonface" style="color:-moz-dialog"></span>' +
		'<span class="fc-mozbuttontext" style="color:-moz-dialogtext"></span>' +
		'<span class="fc-buttonface" style="color:buttonface"></span>' +
		'<span class="fc-buttontext" style="color:buttontext"></span>' +
		'<span class="fc-canvas" style="color:canvas;"></span>' +
		'<span class="fc-linktext" style="color:linktext;"></span>' +
		'<span class="fc-graytext" style="color:graytext;"></span>' +
		'<span class="fc-canvastext" style="color:canvastext;"></span>' +
		'<span class="fc-highlight" style="color:highlight;"></span>' +
		'<span class="fc-background" style="color:background;"></span>' +
		'<span class="fc-activecaption" style="color:activecaption;"></span>' +
		'<span class="fc-inactivecaption" style="color:inactivecaption;"></span>' +
		'<div class="cpe-theming visualcolors-standard theme-single"></div>' +
						'</div>' +
		'<div class="top-gap"></div>' +
		'<div class="focus-overlay" tabindex="-1"></div>'
					  );	// Helper for some things
	document.querySelector('body').setAttribute('tabindex',-1); // Add the CPE button class
	document.querySelector('body').focus();
	$("head").append('<style class="theming"></style>');
	window.MW18PageColor = GetCanvasShort();
	window.MW18PageColorFG = '#000000';
	window.MW18BgColor = GetDesktop();
	ColorUpdate(true);
	console.log("Ivilution has been succesfully initialized")
}() );


/* Dummied out */
function contrastmode(theme='auto', repaint=true, save=true) {
}

function colortheme(theme='auto', repaint=true, save=true) {
}

/* End dummied out */

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

function ForcedColorMode() {
	mode = ['standard','basic','simple','classic'].indexOf(window.MW18DCMMode);
	return (mode == -1) ? 0 : mode;
}


/* Used for some wiki theme modes 
	Also used for some notifications
	Called on body element only */
function CheckTheme() {
	/* Wiki theme */
	ColorUpdate(true);
}

/* Getting non-generic color values */
function GetDesktop() {
	if (ForcedColors()) {
		if 	(CSS.supports("color","-moz-dialog")) {
			var button = getComputedStyle(document.querySelector('.fc-mozbuttonface')).getPropertyValue("color");
		} else {
			var button = getComputedStyle(document.querySelector('.fc-buttonface')).getPropertyValue("color");
		}
		return [getComputedStyle(document.querySelector('.fc-background')).getPropertyValue("color"), button, getComputedStyle(document.querySelector('.fc-activecaption')).getPropertyValue("color"), getComputedStyle(document.querySelector('.fc-canvas')).getPropertyValue("color")][ForcedColorMode()];
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-color").trim();
	}
}

function GetDesktopImage(trimmed=false) {
	var img = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image").trim();
	if ( (img === 'none') || (img === "'none'") || (img === '"none"')) {
		return '';
	} else if (trimmed) {
		return img.replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("");
	} else {
		return 'url(' + img.replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("") + ')';
	}
}

/*
GetAutoColorDesktop()
var s = window.MW18AutoAccent;
s
*/
function GetAutoColorDesktop() {
const myImg = new Image();
myImg.crossOrigin = "Anonymous";
myImg.onload =  () => {
 const x = document.createElement('canvas');
    x.width=myImg.width
    x.height=myImg.height
  const context = x.getContext('2d');
  context.drawImage(myImg, 0, 0);
  const {
    data
  } = context.getImageData((Math.round(myImg.width /2) - 1), (Math.round(myImg.height /2) - 1), 1, 1);
  if (myImg.src === '""') {
	window.MW18AutoAccent = '';
  } else {
	window.MW18AutoAccent = chroma('rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')').hex();
	
  }
}

var img = GetDesktopImage(true);

if (img == '""') {
	window.MW18AutoAccent = '';
} else {
	myImg.src = img;
}
}

function GetDesktopText() {
	if (ForcedColors()) {
//		return getComputedStyle(document.querySelector('.fc-buttontext')).getPropertyValue("color");
		var color = window.MW18BgColor;
		return GetForegroundVariables(color)[4];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-text-background-color") === 'auto') {
		var color = window.MW18BgColor;
		return GetForegroundVariables(color)[4];
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-text-background-color").trim();
	}
}


function GetCanvasShort() { // Like GetCanvas() without forced colors mode you get the unaltered page background mode (Used for checking dark mode)
	if (ForcedColors()) {
		return getComputedStyle(document.querySelector('.fc-canvas')).getPropertyValue("color");
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-background-color").trim();
	}
}


function GetCanvas() {
	if (ForcedColors()) {
		return getComputedStyle(document.querySelector('.fc-canvas')).getPropertyValue("color");
	} else {
		return window.MW18PageColor;
	}
}

function GetCanvas2() { // Like GetCanvas() without forced colors mode you get the unaltered page background mode (Used for checking dark mode)
	if (ForcedColors()) {
		if 	(CSS.supports("color","-moz-dialog")) {
			return getComputedStyle(document.querySelector('.fc-mozbuttonface')).getPropertyValue("color");
		} else {
			return getComputedStyle(document.querySelector('.fc-buttonface')).getPropertyValue("color");
		}
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-secondary-background-color").trim();
	}
}


function GetHyperlink() {
	if (ForcedColors()) {
		return getComputedStyle(document.querySelector('.fc-linktext')).getPropertyValue("color");
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--hyperlink-background-color").trim();
	}
}


function GetInactiveText() {
	if (ForcedColors()) {
		return getComputedStyle(document.querySelector('.fc-graytext')).getPropertyValue("color");
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-text-background-color") === 'auto') {
		return ColorTestTwin(window.MW18PageColor,window.MW18PageColorFG,window.MW18FinalContrast*2);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-text-background-color").trim();
	}
}


function GetCanvasText() {
	if (ForcedColors()) {
		return getComputedStyle(document.querySelector('.fc-canvastext')).getPropertyValue("color");
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color") === 'auto') {
		var color = window.MW18PageColor;
		return GetForegroundVariables(color)[4];
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color").trim();
	}
}


function GetCanvasText2() {
	if (ForcedColors()) {
		if 	(CSS.supports("color","-moz-dialogtext")) {
			return getComputedStyle(document.querySelector('.fc-mozbuttontext')).getPropertyValue("color");
		} else {
			return getComputedStyle(document.querySelector('.fc-buttontext')).getPropertyValue("color");
		}
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-secondary-background-color") === 'auto') {
		return GetCanvasText();
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-secondary-background-color").trim();
	}
}


function GetHighlight() {
	if (ForcedColors()) {
		return [getComputedStyle(document.querySelector('.fc-highlight')).getPropertyValue("color"),getComputedStyle(document.querySelector('.fc-linktext')).getPropertyValue("color"),getComputedStyle(document.querySelector('.fc-highlight')).getPropertyValue("color"),getComputedStyle(document.querySelector('.fc-highlight')).getPropertyValue("color")][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color") === 'auto') {
		return GetHyperlink();
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color").trim();
	}
}

function GetActiveTitle() {
	if (ForcedColors()) {
		if 	(CSS.supports("color","-moz-dialog")) {
			var button = getComputedStyle(document.querySelector('.fc-mozbuttontext')).getPropertyValue("color");
		} else {
			var button = getComputedStyle(document.querySelector('.fc-buttontext')).getPropertyValue("color");
		}
		return [getComputedStyle(document.querySelector('.fc-activecaption')).getPropertyValue("color"),getComputedStyle(document.querySelector('.fc-linktext')).getPropertyValue("color"),button,getComputedStyle(document.querySelector('.fc-linktext')).getPropertyValue("color")][ForcedColorMode()];


	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color") === 'auto') {
		return GetHyperlink();
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color").trim();
	}
}

function GetInactiveTitle() {
	if (ForcedColors()) {
		return [getComputedStyle(document.querySelector('.fc-inactivecaption')).getPropertyValue("color"),getComputedStyle(document.querySelector('.fc-canvas')).getPropertyValue("color"),getComputedStyle(document.querySelector('.fc-canvastext')).getPropertyValue("color"),getComputedStyle(document.querySelector('.fc-graytext')).getPropertyValue("color")][ForcedColorMode()];


	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color") === 'auto') {
		return GetInactiveText();
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color").trim();
	}
}


function GetAlert() {
		return BestAlertColor()[0];
}

function GetPause() {
		return BestAlertColor()[1];
}

function GetWarning() {
		return BestAlertColor()[2];
}

function GetSuccess() {
		return BestAlertColor()[3];
}

function GetProgress() {
		return BestAlertColor()[4];
}

function GetMessage() {
		return BestAlertColor()[5];
}

function GetCustomFont() {
	var img = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--custom-font").trim();
		return img.replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
}

function GetCustomFont2() {
	var img = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--custom-secondary-font").trim();
		return img.replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
}


function ContrastRatio() {

	if (MW18contrastmode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 2.00 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.50 : 1.0
	} else if (MW18contrastmode == 'low') {
		return 1.00
	} else if (MW18contrastmode == 'med-low') {
		return 1.25
	} else if (MW18contrastmode == 'med') {
		return 1.50
	} else if (MW18contrastmode == 'med-hi') {
		return 1.75
	} else if (MW18contrastmode == 'hi') {
		return 2.00
	} else if (MW18contrastmode == 'hi-vhi') {
		return 2.25
	} else if (MW18contrastmode == 'vhi') {
		return 2.50
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 2.00 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.50 : 1.0
	}
}

function ContrastRatio2() {

	if (MW18contrastmode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.35 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.30 : 0.25
	} else if (MW18contrastmode == 'low') {
		return 0.25
	} else if (MW18contrastmode == 'med-low') {
		return 0.275
	} else if (MW18contrastmode == 'med') {
		return 0.30
	} else if (MW18contrastmode == 'med-hi') {
		return 0.325
	} else if (MW18contrastmode == 'hi') {
		return 0.35
	} else if (MW18contrastmode == 'hi-vhi') {
		return 0.375
	} else if (MW18contrastmode == 'vhi') {
		return 0.40
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.35 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.30 : 0.25
	}
}

function BestAlertColor() {
var page = window.MW18PageColor;
var invpage = page;
hueshift =  parseInt(getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-hue-shift"));

if (isLightColor(page)) { // ( chroma(page).get('hsl.l') < 0.5)
	var colors = ['96%', '94%', '92%', '90%', '88%', '86%', '84%', '82%', '80%', '78%', '76%', '74%', '72%', '70%', '68%', '66%', '64%', '62%', '60%', '58%', '56%', '54%', '46%', '44%', '42%', '40%', '38%', '36%', '34%', '32%', '30%', '28%', '26%', '24%', '22%', '20%', '18%', '16%', '14%', '12%', '10%', '8%', '6%', '4%']
} else {
	var colors = ['4%', '6%', '8%', '10%', '12%', '14%', '16%', '18%', '20%', '22%', '24%', '26%', '28%', '30%', '32%', '34%', '36%', '38%', '40%', '42%', '44%', '46%', '54%', '56%', '58%', '60%', '62%', '64%', '66%', '68%', '70%', '72%', '74%', '76%', '78%', '80%', '82%', '84%', '86%', '88%', '90%', '92%', '94%', '96%']
}

		alerth = 360
		pauseh = 20
		warningh = 45
		successh = 167
		progressh = 220
		messageh = -1
		

		
		contrastA = window.MW18highContrast*ContrastRatio()*1
		contrastP = window.MW18highContrast*ContrastRatio()*1
		contrastW = window.MW18highContrast*ContrastRatio()*1
		contrastS = window.MW18highContrast*ContrastRatio()*1
		contrastP = window.MW18highContrast*ContrastRatio()*1
		contrastM = window.MW18highContrast*ContrastRatio()*1

	for (let i = 0; i < colors.length; i++) {
		var color = chroma('hsl(0,100%,' + colors[i] + ')').hex(); // Base Color
		var alert = chroma(ColorTestTwin(color, invpage, 0,alerth+hueshift)).set('hsl.s',1); // Alert
		var alertsat = chroma(alert).get('hsl.s'); // Saturation of Alert Color
		var alertlight =  chroma(alert).get('hsl.l') // Lightness of Alert Color
		var pause = chroma(alert).set('hsl.h',pauseh+hueshift).set('hsl.s',alertsat).set('hsl.l', alertlight);  // Pause
		var warn = chroma(alert).set('hsl.h',warningh+hueshift).set('hsl.s',alertsat).set('hsl.l', alertlight);  // Warning
		var done = chroma(alert).set('hsl.h',successh+hueshift).set('hsl.s',alertsat).set('hsl.l', alertlight); // Success
		var progress = chroma(alert).set('hsl.h',progressh+hueshift).set('hsl.s',alertsat).set('hsl.l', alertlight); // Progress
		var info = chroma(ColorTestTwin(color, invpage, 0,messageh)).set('hsl.l', alertlight); // Message
		if ( ((chroma.contrast(page, alert)) >= contrastA) && ((chroma.contrast(page, pause)) >= contrastP) && ((chroma.contrast(page, warn)) >= contrastW) && ((chroma.contrast(page, done)) >= contrastS) && ((chroma.contrast(page, progress)) >= contrastP) && ((chroma.contrast(page, info)) >= contrastM) ) {
			return [alert, pause, warn, done, progress, info];
		}
	}

	/* If no color can be found legible, fallback to pre-Nickel behavior */	
				if (isLightColor(page)) { // ( chroma(page).get('hsl.l') < 0.5)
					return [chroma('hsl('+ alerth+hueshift + ', 100%, 4%)'),chroma('hsl('+ pauseh+hueshift + ', 100%, 4%)'),chroma('hsl('+ warningh+hueshift + ', 100%, 4%)'),chroma('hsl('+ successh+hueshift + ', 100%, 4%)'),chroma('hsl('+ progressh+hueshift + ', 100%, 4%)'),chroma('hsl('+ alerth + ', 0%, 4%)')]
				} else {
					return [chroma('hsl('+ alerth+hueshift + ', 100%, 96%)'),chroma('hsl('+ pauseh+hueshift + ', 100%, 96%)'),chroma('hsl('+ warningh+hueshift + ', 100%, 96%)'),chroma('hsl('+ successh+hueshift + ', 100%, 96%)'),chroma('hsl('+ progressh+hueshift + ', 100%, 96%)'),chroma('hsl('+ alerth + ', 0%, 96%)')]
				}

 
}

/* Get Foreground Variables */

function GetForegroundVariables(color) {
	if (isSemiLightColor(color)) {
		var fc1 =  getComputedStyle(document.querySelector('body')).getPropertyValue("--light-theme-text-background-color");
		var fc2 =  getComputedStyle(document.querySelector('body')).getPropertyValue("--light-theme-text-background-color-rgb");
		var fc3 =  getComputedStyle(document.querySelector('body')).getPropertyValue("--light-theme-text-background-color-hover");
		var fc4 =  getComputedStyle(document.querySelector('body')).getPropertyValue("--light-theme-text-background-color-hover-rgb");
	} else {
		var fc1 =  getComputedStyle(document.querySelector('body')).getPropertyValue("--dark-theme-text-background-color");
		var fc2 =  getComputedStyle(document.querySelector('body')).getPropertyValue("--dark-theme-text-background-color-rgb");
		var fc3 =  getComputedStyle(document.querySelector('body')).getPropertyValue("--dark-theme-text-background-color-hover");
		var fc4 =  getComputedStyle(document.querySelector('body')).getPropertyValue("--dark-theme-text-background-color-hover-rgb");
	}
	if (isLightColor(color)) {
		return ['var(--light-theme-foreground-color)', 'var(--light-theme-foreground-color-hover)', 'var(--light-theme-foreground-color-rgb)', 'var(--light-theme-foreground-color-hover-rgb)', fc1, fc2, fc3, fc4]
	} else {
		return ['var(--dark-theme-foreground-color)', 'var(--dark-theme-foreground-color-hover)', 'var(--dark-theme-foreground-color-rgb)', 'var(--dark-theme-foreground-color-hover-rgb)', fc1, fc2, fc3, fc4]
	}
}


/* Get Gradient Variables */
function GetGradientVariable(color,name="canvas") {
	if (isLightColor(color)) {
		return ['var(--' + name + '-background-color)', 'var(--' + name + '-background-color-hover)']
	} else {
		return ['var(--' + name + '-background-color-hover)', 'var(--' + name + '-background-color)']
	}
}


/* Downloads all modificative values of the current selected theme to a file */
function DownloadTheme(full=false) {
	wordfilter2 = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-hover")
	if ( wordfilter2 == "" ) {
		wordfilter2 == 'initial'
	}
	if (full) { // For use without Theme Management
		result = '.visualcolors-standard.theme-A {\n' + // Beginning
				// Body BG
				 '--desktop-background-image:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-image")  + ';\n' +
				 '--desktop-background-image-filter:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-image-filter")  + ';\n' +
				// Body Color
				 '--desktop-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-color")  + ';\n' +
				 '--desktop-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-color-hover")  + ';\n' +
				 '--desktop-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-fadeout-color")  + ';\n' +
				 '--desktop-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-gradient-color")  + ';\n' +
				 '--desktop-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-gradient-color-hover")  + ';\n' +
				 '--desktop-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-foreground-color")  + ';\n' +
				 '--desktop-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-foreground-color-hover")  + ';\n' +
				 '--desktop-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-foreground-color-inverted")  + ';\n' +
				 '--desktop-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-alternative-foreground-color")  + ';\n' +
				 '--desktop-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-alternative-foreground-color-hover")  + ';\n' +
				 '--desktop-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-color-rgb")  + ';\n' +
				 '--desktop-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-foreground-color-rgb")  + ';\n' +
				 '--desktop-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-foreground-color-hover-rgb")  + ';\n' +
				 '--desktop-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-alternative-foreground-color-rgb")  + ';\n' +
				 '--desktop-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-alternative-foreground-color-hover-rgb")  + ';\n' +
				// Superbar Text Color
				 '--desktop-text-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-background-color")  + ';\n' +
				 '--desktop-text-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-background-color-hover")  + ';\n' +
				 '--desktop-text-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-fadeout-color")  + ';\n' +
				 '--desktop-text-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-gradient-color")  + ';\n' +
				 '--desktop-text-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-gradient-color-hover")  + ';\n' +
				 '--desktop-text-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-foreground-color")  + ';\n' +
				 '--desktop-text-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-foreground-color-hover")  + ';\n' +
				 '--desktop-text-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-alternative-foreground-color")  + ';\n' +
				 '--desktop-text-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-alternative-foreground-color-hover")  + ';\n' +
				 '--desktop-text-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-background-color-rgb")  + ';\n' +
				 '--desktop-text-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-background-color-hover-rgb")  + ';\n' +
				 '--desktop-text-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-foreground-color-rgb")  + ';\n' +
				 '--desktop-text-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-foreground-color-hover-rgb")  + 
';\n' +
				 '--desktop-text-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-alternative-foreground-color-rgb")  + ';\n' +
				 '--desktop-text-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-text-alternative-foreground-color-hover-rgb")  + ';\n' +
				// Body BG Settings
				 '--desktop-background-size:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-size")  + ';\n' +
				 '--desktop-background-horizontal-alignment:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-horizontal-alignment")  + ';\n' +
				 '--desktop-background-vertical-alignment:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-vertical-alignment")  + ';\n' +
				 '--desktop-background-no-horizontal-tiling:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-no-horizontal-tiling")  + ';\n' +
				 '--desktop-background-no-vertical-tiling:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-no-vertical-tiling")  + ';\n' +
				 // Page Color
				 '--canvas-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-background-color")  + ';\n' +
				 '--canvas-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-background-color-hover")  + ';\n' +
				 '--canvas-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-fadeout-color")  + ';\n' +
				 '--canvas-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-gradient-color")  + ';\n' +
				 '--canvas-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-gradient-color-hover")  + ';\n' +
				 '--canvas-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-foreground-color")  + ';\n' +
				 '--canvas-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-foreground-color-hover")  + ';\n' +
				 '--canvas-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-alternative-foreground-color")  + ';\n' +
				 '--canvas-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-alternative-foreground-color-hover")  + ';\n' +
				 '--canvas-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-background-color-rgb")  + ';\n' +
				 '--canvas-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-foreground-color-rgb")  + ';\n' +
				 '--canvas-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-foreground-color-hover-rgb")  + ';\n' +
				 '--canvas-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-alternative-foreground-color-rgb")  + ';\n' +
				 '--canvas-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // 2nd Page Color
				 '--canvas-secondary-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-background-color")  + ';\n' +
				 '--canvas-secondary-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-background-color-hover")  + ';\n' +
				 '--canvas-3d-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-3d-background-color")  + ';\n' +
				 '--canvas-3d-background-color-dark:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-3d-background-color-dark")  + ';\n' +
				 '--canvas-secondary-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-fadeout-color")  + ';\n' +
				 '--canvas-secondary-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-gradient-color")  + ';\n' +
				 '--canvas-secondary-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-gradient-color-hover")  + ';\n' +
				 '--canvas-secondary-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-foreground-color")  + ';\n' +
				 '--canvas-secondary-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-foreground-color-hover")  + ';\n' +
				 '--canvas-secondary-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-alternative-foreground-color")  + ';\n' +
				 '--canvas-secondary-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-alternative-foreground-color-hover")  + ';\n' +
				 '--canvas-secondary-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-background-color-rgb")  + ';\n' +
				 '--canvas-secondary-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-foreground-color-rgb")  + ';\n' +
				 '--canvas-secondary-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-foreground-color-hover-rgb")  + ';\n' +
				 '--canvas-secondary-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-alternative-foreground-color-rgb")  + ';\n' +
				 '--canvas-secondary-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-alternative-foreground-color-hover-rgb")  + ';\n' +

				 // Page Border Color
				 '--inactive-text-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-background-color")  + ';\n' +
				 '--inactive-text-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-background-color-hover")  + ';\n' +
				 '--inactive-text-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-fadeout-color")  + ';\n' +
				 '--inactive-text-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-gradient-color")  + ';\n' +
				 '--inactive-text-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-gradient-color-hover")  + ';\n' +
				 '--inactive-text-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-foreground-color")  + ';\n' +
				 '--inactive-text-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-foreground-color-inverted")  + ';\n' +
				 '--inactive-text-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-foreground-color-hover")  + ';\n' +
				 '--inactive-text-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-alternative-foreground-color")  + ';\n' +
				 '--inactive-text-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-alternative-foreground-color-hover")  + ';\n' +
				 '--inactive-text-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-background-color-rgb")  + ';\n' +
				 '--inactive-text-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-foreground-color-rgb")  + ';\n' +
				 '--inactive-text-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-foreground-color-hover-rgb")  + ';\n' +
				 '--inactive-text-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-alternative-foreground-color-rgb")  + ';\n' +
				 '--inactive-text-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Page Text Color
				 '--canvas-text-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-background-color")  + ';\n' +
				 '--canvas-text-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-background-color-hover")  + ';\n' +
				 '--canvas-text-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-fadeout-color")  + ';\n' +
				 '--canvas-text-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-gradient-color")  + ';\n' +
				 '--canvas-text-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-gradient-color-hover")  + ';\n' +
				 '--canvas-text-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-foreground-color")  + ';\n' +
				 '--canvas-text-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-foreground-color-hover")  + ';\n' +
				 '--canvas-text-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-foreground-color-inverted")  + ';\n' +
				 '--canvas-text-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-alternative-foreground-color")  + ';\n' +
				 '--canvas-text-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-alternative-foreground-color-hover")  + ';\n' +
				 '--canvas-text-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-background-color-rgb")  + ';\n' +
				 '--canvas-text-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-background-color-hover-rgb")  + ';\n' +
				 '--canvas-text-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-foreground-color-rgb")  + ';\n' +
				 '--canvas-text-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-foreground-color-hover-rgb")  + ';\n' +
				 '--canvas-text-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-alternative-foreground-color-rgb")  + ';\n' +
				 '--canvas-text-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // 2nd Page Text Color
				 '--canvas-text-secondary-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-background-color")  + ';\n' +
				 '--canvas-text-secondary-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-background-color-hover")  + ';\n' +
				 '--canvas-text-secondary-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-fadeout-color")  + ';\n' +
				 '--canvas-text-secondary-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-gradient-color")  + ';\n' +
				 '--canvas-text-secondary-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-gradient-color-hover")  + ';\n' +
				 '--canvas-text-secondary-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-foreground-color")  + ';\n' +
				 '--canvas-text-secondary-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-foreground-color-hover")  + ';\n' +
				 '--canvas-text-secondary-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-foreground-color-inverted")  + ';\n' +
				 '--canvas-text-secondary-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-alternative-foreground-color")  + ';\n' +
				 '--canvas-text-secondary-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-alternative-foreground-color-hover")  + ';\n' +
				 '--canvas-text-secondary-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-background-color-rgb")  + ';\n' +
				 '--canvas-text-secondary-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-background-color-hover-rgb")  + ';\n' +
				 '--canvas-text-secondary-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-foreground-color-rgb")  + ';\n' +
				 '--canvas-text-secondary-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-foreground-color-hover-rgb")  + ';\n' +
				 '--canvas-text-secondary-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-alternative-foreground-color-rgb")  + ';\n' +
				 '--canvas-text-secondary-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-text-secondary-alternative-foreground-color-hover-rgb")  + ';\n' +

				 // Accent Color
				 '--highlight-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-background-color")  + ';\n' +
				 '--highlight-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-background-color-hover")  + ';\n' +
				 '--highlight-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-fadeout-color")  + ';\n' +
				 '--highlight-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-gradient-color")  + ';\n' +
				 '--highlight-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-gradient-color-hover")  + ';\n' +
				 '--highlight-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-foreground-color")  + ';\n' +
				 '--highlight-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-foreground-color-hover")  + ';\n' +
				 '--highlight-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-foreground-color-inverted")  + ';\n' +
				 '--highlight-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-alternative-foreground-color")  + ';\n' +
				 '--highlight-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-alternative-foreground-color-hover")  + ';\n' +
				 '--highlight-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-background-color-rgb")  + ';\n' +
				 '--highlight-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-foreground-color-rgb")  + ';\n' +
				 '--highlight-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-foreground-color-hover-rgb")  + ';\n' +
				 '--highlight-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-alternative-foreground-color-rgb")  + ';\n' +
				 '--highlight-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Secondary Accent Color
				 '--hyperlink-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-background-color")  + ';\n' +
				 '--hyperlink-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-background-color-hover")  + ';\n' +
				 '--hyperlink-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-fadeout-color")  + ';\n' +
				 '--hyperlink-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-gradient-color")  + ';\n' +
				 '--hyperlink-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-gradient-color-hover")  + ';\n' +
				 '--hyperlink-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-foreground-color")  + ';\n' +
				 '--hyperlink-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-foreground-color-hover")  + ';\n' +
				 '--hyperlink-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-foreground-color-inverted")  + ';\n' +
				 '--hyperlink-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-alternative-foreground-color")  + ';\n' +
				 '--hyperlink-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-alternative-foreground-color-hover")  + ';\n' +
				 '--hyperlink-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-background-color-rgb")  + ';\n' +
				 '--hyperlink-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-background-color-hover-rgb")  + ';\n' +
				 '--hyperlink-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-foreground-color-rgb")  + ';\n' +
				 '--hyperlink-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-foreground-color-hover-rgb")  + ';\n' +
				 '--hyperlink-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-alternative-foreground-color-rgb")  + ';\n' +
				 '--hyperlink-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // 2nd Secondary Accent Color
				 '--hyperlink-secondary-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-secondary-background-color")  + ';\n' +
				 '--hyperlink-secondary-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-secondary-background-color-hover")  + ';\n' +
				 '--hyperlink-secondary-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-secondary-background-color-rgb")  + ';\n' +
				 // 3rd Secondary Accent Color
				 '--hyperlink-tertiary-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-tertiary-background-color")  + ';\n' +
				 '--hyperlink-tertiary-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-tertiary-background-color-hover")  + ';\n' +
				 '--hyperlink-tertiary-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--hyperlink-tertiary-background-color-rgb")  + ';\n' +

				 // Tertiary Accent Color
				 '--active-title-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-background-color")  + ';\n' +
				 '--active-title-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-background-color-hover")  + ';\n' +
				 '--active-title-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-fadeout-color")  + ';\n' +
				 '--active-title-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-gradient-color")  + ';\n' +
				 '--active-title-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-gradient-color-hover")  + ';\n' +
				 '--active-title-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-foreground-color")  + ';\n' +
				 '--active-title-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-foreground-color-hover")  + ';\n' +
				 '--active-title-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-foreground-color-inverted")  + ';\n' +
				 '--active-title-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-alternative-foreground-color")  + ';\n' +
				 '--active-title-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-alternative-foreground-color-hover")  + ';\n' +

				 '--active-title-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-background-color-rgb")  + ';\n' +
				 '--active-title-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-foreground-color-rgb")  + ';\n' +
				 '--active-title-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-foreground-color-hover-rgb")  + ';\n' +
				 '--active-title-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-alternative-foreground-color-rgb")  + ';\n' +
				 '--active-title-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Quaternary Accent Color
				 '--inactive-title-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-background-color")  + ';\n' +
				 '--inactive-title-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-background-color-hover")  + ';\n' +
				 '--inactive-title-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-fadeout-color")  + ';\n' +
				 '--inactive-title-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-gradient-color")  + ';\n' +
				 '--inactive-title-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-gradient-color-hover")  + ';\n' +
				 '--inactive-title-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-foreground-color")  + ';\n' +
				 '--inactive-title-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-foreground-color-hover")  + ';\n' +
				 '--inactive-title-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-foreground-color-inverted")  + ';\n' +
				 '--inactive-title-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-alternative-foreground-color")  + ';\n' +
				 '--inactive-title-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-alternative-foreground-color-hover")  + ';\n' +
				 '--inactive-title-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-background-color-rgb")  + ';\n' +
				 '--inactive-title-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-foreground-color-rgb")  + ';\n' +
				 '--inactive-title-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-foreground-color-hover-rgb")  + ';\n' +
				 '--inactive-title-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-alternative-foreground-color-rgb")  + ';\n' +
				 '--inactive-title-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Alert
				 '--alert-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-background-color")  + ';\n' +
				 '--alert-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-background-color-hover")  + ';\n' +
				 '--alert-background-color-hover-2:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-background-color-hover-2")  + ';\n' +
				 '--alert-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-fadeout-color")  + ';\n' +
				 '--alert-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-gradient-color")  + ';\n' +
				 '--alert-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-gradient-color-hover")  + ';\n' +
				 '--alert-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-foreground-color")  + ';\n' +
				 '--alert-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-foreground-color-hover")  + ';\n' +
				 '--alert-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-foreground-color-inverted")  + ';\n' +
				 '--alert-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-alternative-foreground-color")  + ';\n' +
				 '--alert-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-alternative-foreground-color-hover")  + ';\n' +
				 '--alert-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-background-color-rgb")  + ';\n' +
				 '--alert-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-foreground-color-rgb")  + ';\n' +
				 '--alert-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-foreground-color-hover-rgb")  + ';\n' +
				 '--alert-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-alternative-foreground-color-rgb")  + ';\n' +
				 '--alert-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--alert-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Pause
				 '--pause-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-background-color")  + ';\n' +
				 '--pause-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-background-color-hover")  + ';\n' +
				 '--pause-background-color-hover-2:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-background-color-hover-2")  + ';\n' +
				 '--pause-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-fadeout-color")  + ';\n' +
				 '--pause-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-gradient-color")  + ';\n' +
				 '--pause-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-gradient-color-hover")  + ';\n' +
				 '--pause-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-foreground-color")  + ';\n' +
				 '--pause-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-foreground-color-hover")  + ';\n' +
				 '--pause-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-foreground-color-inverted")  + ';\n' +
				 '--pause-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-alternative-foreground-color")  + ';\n' +
				 '--pause-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-alternative-foreground-color-hover")  + ';\n' +
				 '--pause-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-background-color-rgb")  + ';\n' +
				 '--pause-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-foreground-color-rgb")  + ';\n' +
				 '--pause-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-foreground-color-hover-rgb")  + ';\n' +
				 '--pause-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-alternative-foreground-color-rgb")  + ';\n' +
				 '--pause-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--pause-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Warning
				 '--warning-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-background-color")  + ';\n' +
				 '--warning-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-background-color-hover")  + ';\n' +
				 '--warning-background-color-hover-2:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-background-color-hover-2")  + ';\n' +
				 '--warning-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-fadeout-color")  + ';\n' +
				 '--warning-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-gradient-color")  + ';\n' +
				 '--warning-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-gradient-color-hover")  + ';\n' +
				 '--warning-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-foreground-color")  + ';\n' +
				 '--warning-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-foreground-color-hover")  + ';\n' +
				 '--warning-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-foreground-color-inverted")  + ';\n' +
				 '--warning-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-alternative-foreground-color")  + ';\n' +
				 '--warning-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-alternative-foreground-color-hover")  + ';\n' +
				 '--warning-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-background-color-rgb")  + ';\n' +
				 '--warning-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-foreground-color-rgb")  + ';\n' +
				 '--warning-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-foreground-color-hover-rgb")  + ';\n' +
				 '--warning-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-alternative-foreground-color-rgb")  + 
';\n' +
				 '--warning-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--warning-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Success
				 '--success-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-background-color")  + ';\n' +
				 '--success-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-background-color-hover")  + ';\n' +
				 '--success-background-color-hover-2:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-background-color-hover-2")  + ';\n' +
				 '--success-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-fadeout-color")  + ';\n' +
				 '--success-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-gradient-color")  + ';\n' +
				 '--success-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-gradient-color-hover")  + ';\n' +
				 '--success-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-foreground-color")  + ';\n' +
				 '--success-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-foreground-color-hover")  + ';\n' +
				 '--success-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-foreground-color-inverted")  + ';\n' +
				 '--success-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-alternative-foreground-color")  + ';\n' +
				 '--success-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-alternative-foreground-color-hover")  + ';\n' +
				 '--success-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-background-color-rgb")  + ';\n' +
				 '--success-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-foreground-color-rgb")  + ';\n' +
				 '--success-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-foreground-color-hover-rgb")  + ';\n' +
				 '--success-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-alternative-foreground-color-rgb")  + ';\n' +
				 '--success-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--success-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Progress
				 '--progress-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-background-color")  + ';\n' +
				 '--progress-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-background-color-hover")  + ';\n' +
				 '--progress-background-color-hover-2:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-background-color-hover-2")  + ';\n' +
				 '--progress-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-fadeout-color")  + ';\n' +
				 '--progress-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-gradient-color")  + ';\n' +
				 '--progress-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-gradient-color-hover")  + ';\n' +
				 '--progress-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-foreground-color")  + ';\n' +
				 '--progress-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-foreground-color-hover")  + ';\n' +
				 '--progress-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-foreground-color-inverted")  + ';\n' +
				 '--progress-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-alternative-foreground-color")  + ';\n' +
				 '--progress-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-alternative-foreground-color-hover")  + ';\n' +
				 '--progress-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-background-color-rgb")  + ';\n' +
				 '--progress-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-foreground-color-rgb")  + ';\n' +
				 '--progress-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-foreground-color-hover-rgb")  + ';\n' +
				 '--progress-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-alternative-foreground-color-rgb")  + ';\n' +
				 '--progress-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--progress-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Message
				 '--message-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-background-color")  + ';\n' +
				 '--message-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-background-color-hover")  + ';\n' +
				 '--message-background-color-hover-2:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-background-color-hover-2")  + ';\n' +
				 '--message-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-fadeout-color")  + ';\n' +
				 '--message-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-gradient-color")  + ';\n' +
				 '--message-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-gradient-color-hover")  + ';\n' +
				 '--message-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-foreground-color")  + ';\n' +
				 '--message-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-foreground-color-hover")  + ';\n' +
				 '--message-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-foreground-color-inverted")  + ';\n' +
				 '--message-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-alternative-foreground-color")  + ';\n' +
				 '--message-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-alternative-foreground-color-hover")  + ';\n' +
				 '--message-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-background-color-rgb")  + ';\n' +
				 '--message-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-foreground-color-rgb")  + ';\n' +
				 '--message-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-foreground-color-hover-rgb")  + ';\n' +
				 '--message-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-alternative-foreground-color-rgb")  + ';\n' +
				 '--message-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--message-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Miscs
				 '--custom-font:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--custom-font")  + ';\n' +
				 '--custom-secondary-font:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--custom-secondary-font")  + ';\n' +
				 '--border-radius:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--border-radius")  + ';\n' +
				 '--icon-filter:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--icon-filter")  + ';\n' +
				 '--icon-filter-hover:' + wordfilter2  + ';\n' +
				 '--icon-filter-duration:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--icon-filter-duration")  + ';\n' +
				 '--icon-filter-delay:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--icon-filter-delay")  + ';\n' +
				 '--system-acryllic-opacity:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--system-acryllic-opacity")  + ';\n' +
				 '--system-generic-color-hue-shift:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--system-generic-color-hue-shift")  + ';\n' +
				 '}' // Ending
	} else { // For use with Theme Management
		result = '.visualcolors-standard.theme-A {\n' + // Beginning
				 '--desktop-background-image:' + GetDesktopImage()  + ';\n' +
				 '--desktop-background-image-filter:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-filter")  + ';\n' +
				 '--desktop-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-color")  + ';\n' +
				 '--desktop-text-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-text-background-color")  + ';\n' +
				 '--desktop-background-size:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-size")  + ';\n' +
				 '--desktop-background-horizontal-alignment:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-horizontal-alignment")  + ';\n' +
				 '--desktop-background-vertical-alignment:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-vertical-alignment")  + ';\n' +
				 '--desktop-background-no-horizontal-tiling:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-horizontal-tiling")  + ';\n' +
				 '--desktop-background-no-vertical-tiling:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-vertical-tiling")  + ';\n' +
				 '--canvas-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-background-color")  + ';\n' +
				 '--canvas-secondary-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-secondary-background-color")  + ';\n' +
				 '--inactive-text-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-text-background-color")  + ';\n' +
				 '--canvas-text-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color")  + ';\n' +
				 '--canvas-text-secondary-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-secondary-background-color")  + ';\n' +
				 '--highlight-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color")  + ';\n' +
				 '--hyperlink-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--hyperlink-background-color")  + ';\n' +
				 '--active-title-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color")  + ';\n' +
				 '--inactive-title-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color")  + ';\n' +
				 '--custom-font:' + GetCustomFont()  + ';\n' +
				 '--custom-secondary-font:' + GetCustomFont2()  + ';\n' +
				 '--border-radius:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--border-radius")  + ';\n' +
				 '--icon-filter:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter")  + ';\n' +
				 '--icon-filter-hover:' + wordfilter2  + ';\n' +
				 '--icon-filter-duration:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-duration")  + ';\n' +
				 '--icon-filter-delay:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-delay")  + ';\n' +
				 '--system-acryllic-opacity:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-acryllic-opacity")  + ';\n' +
				 '--system-generic-color-hue-shift:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-hue-shift")  + ';\n' +

				 '}' // Ending
	}
	alert('Once you save the file, put the stylesheet contents to MediaWiki:Common.css for use in the wiki or upload it to any website.');
	DownloadData(result,'MyTheme','css');
}


/* Begin Color Parsers */
function ColorTestTwin(color1,color2,intensity=1,hue='nil') {
	var alpha = 0.5*intensity;
	if (hue === 'nil') {
		return chroma.mix(color1, color2, alpha, 'rgb');
	} else if (hue === -1) {
		return chroma.mix(color1, color2, alpha, 'rgb').set('hsl.s', 0).set('hsl.h', 0);
	} else {
		return chroma.mix(color1, color2, alpha, 'rgb').set('hsl.h', hue);
	}
}


function ColorTest(color,color2) { // Regular Colors
	var dledlen = (color2 != undefined) ? true : false; // Disable Doulgido Dledlen
	if (dledlen === false) {
		var color2 = color;
	}
	var func = (isLightColor(color2));
	var light = chroma(color).get('hsl.l')
	if (func) {
		return chroma(color).set('hsl.l', light-0.2);
	} else {
		return chroma(color).set('hsl.l', light+0.2);
	}
}


function MiniColorTest(color) { // Regular Colors
	var color2 = GetCanvas();
	var func = (isLightColor(color2));
	var light = chroma(color).get('hsl.l');
	if (func) {
		return chroma(color).set('hsl.l', light-0.02).hex();
	} else {
		return chroma(color).set('hsl.l', light+0.02).hex();
	}
}


function MiniColorTest2(color) { // Regular Colors
	var color2 = window.MW18BgColor;
	var func = (isLightColor(color2));
	var light = chroma(color).get('hsl.l');
	if (func) {
		return chroma(color).set('hsl.l', light-0.02).hex();
	} else {
		return chroma(color).set('hsl.l', light+0.02).hex();
	}
}

function MiniColorTest3(color,color2) { // Regular Colors
	var func = (isLightColor(color2));
	var light = chroma(color).get('hsl.l');
	if (func) {
		return chroma(color).set('hsl.l', light-0.02).hex();
	} else {
		return chroma(color).set('hsl.l', light+0.02).hex();
	}
}


function ColorInvert(color) {
	if (window.MW18spdarkmode === 6) { // Special Case
		var color2 = color;
		var color = chroma( chroma.temperature(chroma(color2).temperature()) ).hex();
	}
	if (window.MW18spdarkmode === 7) { // Special Case
		var color2 = color;
		var color = chroma( chroma.temperature(40000 - chroma(color2).temperature()) ).hex();
	}
	if ( (window.MW18darkmode === true) ) {
		var r = 255 - chroma(color).get('rgb.r');
		var g = 255 - chroma(color).get('rgb.g');
		var b = 255 - chroma(color).get('rgb.b');
	} else {
		var r = chroma(color).get('rgb.r');
		var g = chroma(color).get('rgb.g');
		var b = chroma(color).get('rgb.b');

	}
	

	var h = chroma(color).get('lch.h');
	var h2 = chroma(color).get('hsl.h');
	var invcolor = chroma('rgb(' + (255 - r) + ',' + (255 - g) + ',' + (255 - b) + ')');
	var hi = chroma(invcolor).get('lch.h');
	var h2i = chroma(invcolor).get('hsl.h');
	var page = [
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.h', h).set('hsl.h', h2),   // Sp Dark Mode 0 (Normal)
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b),									  // Sp Dark Mode 1 (Reversi Dark)
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.c', 0).set('hsl.s', 0),    // Sp Dark Mode 2 (Grayscale)
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.h', h).set('hsl.h', 60),   // Sp Dark Mode 3 (Yellow Tint)
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.h', h).set('hsl.h', 240),  // Sp Dark Mode 4 (Blue Tint)
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.h', hi).set('hsl.h', h2i), // Sp Dark Mode 5 (Reversi Light)
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.h', h).set('hsl.h', h2),   // Sp Dark Mode 6 (Hot Temperature)
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.h', h).set('hsl.h', h2),   // Sp Dark Mode 7 (Cold Temperature)
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.h', h).set('hsl.h', 0),    // Sp Dark Mode 8 (Red Tint)
				chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.h', h).set('hsl.h', 120),  // Sp Dark Mode 9 (Green Tint)
			   ][window.MW18spdarkmode];
	return page

}




// Only used for link and header colors
function ColorTest2(color,color2) {
	return Color2(ColorTest(color,color2));
}

// Conversion for R,G,B syntax
function Color2(color) {
	return chroma(color).get('rgb.r') + ',' + chroma(color).get('rgb.g') + ',' + chroma(color).get('rgb.b');
}

function isLightColor(color) {
/*
	var c1 = (chroma.contrast('#000000',  chroma(color)))
	var c2 = (chroma.contrast('#ffffff',  chroma(color)))
	return (c1 > c2);

 return chroma(color).lch()[0] >= 50
*/
	return chroma.deltaE('#000000', color) > chroma.deltaE('#ffffff', color);
}

function isSemiLightColor(color) {
/*
	var c1 = (chroma.contrast(getComputedStyle(document.querySelector('body')).getPropertyValue("--light-theme-text-background-color"),  chroma(color)))
	var c2 = (chroma.contrast(getComputedStyle(document.querySelector('body')).getPropertyValue("--dark-theme-text-background-color"),  chroma(color)))
	return (c1 > c2);
*/
	return chroma.deltaE('#e6e6e6', color) > chroma.deltaE('#3a3a3a', color);
}


function isDarkColor(color) {
	return !isLightColor(color)
}

function isSuitableColor(color,color2) {
var contrast = window.MW18highContrast*ContrastRatio()
return ((chroma.contrast(color, color2)) >= contrast)
}

function isSuitableColor2(color,color2) {
var contrast = window.MW18lowContrast*ContrastRatio()
return ((chroma.contrast(color, color2)) >= contrast) // For Border Color
}



/* End Color Parsers */

/* Used to udpate all dynamical variables */
function ColorUpdate(refresh=true) {
if (refresh === true) {
	var theme = window.MW18wikitheme;
	var style = window.MW18devicetheme;
	colortheme(theme, style, false,false);
	var cmode = window.MW18contrastmode;
	contrastmode(cmode, false,false);
	/** Foreground Colors 
	document.querySelector('html').style.setProperty("--light-theme-foreground-color-hover", ColorTest(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color")) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-hover", ColorTest(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color")) );

	document.querySelector('html').style.setProperty("--light-theme-foreground-color-rgb", Color2(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color")) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-rgb", Color2(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color")) );

	document.querySelector('html').style.setProperty("--light-theme-foreground-color-hover-rgb", Color2(ColorTest(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color"))) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-hover-rgb", Color2(ColorTest(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color"))) );
	**/
}

//	ToggleTheme(window.MW18ActiveTheme,false,false);
//	VisualColor(window.MW18ActiveColors,false,false);
	if (ForcedColors()) {
		var colorstyle =".color-management-on { display:none!important;}\n"
	} else {
		var colorstyle= ".color-management-off { display:none!important;}\n"
	}

if (refresh) {
//	GetAutoColorDesktop();
//alert(window.MW18AutoAccent);
}

/** Page BG **/
/* Set Vars */
// content_text is Content Color
// content2_text is Dropdown Color
// content_text4 is Text color of Content Color
// content_text5 is Dark text color of Content Color
// content_color is Content Bg
// dropdowncolor is Dropdown Bg
// dropdowncolor2 is Content Border

var content_color =  GetCanvasShort();

/* This goes before compiling Generic Colors or else they will think the theme is light */

// Liatch Quirk
	var content_color = ColorInvert(content_color)

	window.MW18PageColor = content_color;
	var darkpage = isLightColor(content_color);
		var oldtheme = window.MW18ActiveThemeMode;
		if (!(darkpage)) {
			 window.MW18ActiveThemeMode = 'dark';
		} else {
			 window.MW18ActiveThemeMode = 'light';
		}
		if (oldtheme === 'none') {
			document.querySelector('html').classList.add("theme-fandomdesktop-" +  window.MW18ActiveThemeMode);
		} else if (oldtheme != window.MW18ActiveThemeMode ) {
			document.querySelector('html').classList.replace("theme-fandomdesktop-" +  oldtheme,"theme-fandomdesktop-" +  window.MW18ActiveThemeMode);
		}


var content_color2 = ColorTest(content_color);

var adjustment = ContrastRatio2();
window.MW18FinalContrast = adjustment;

	if (darkpage) {
		var lightness = '#000000';
	} else {
		var lightness = '#ffffff';
	}
		window.MW18PageColorFG = lightness

if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-secondary-background-color") == 'auto') ) {
	if (darkpage) {
		var dropdowncolor = ColorTestTwin(content_color,"#000000",adjustment);
	} else {
		var dropdowncolor = ColorTestTwin(content_color,"#ffffff",adjustment);
	}
} else {
	var dropdowncolor = GetCanvas2();
	var dropdowncolor = ColorInvert(dropdowncolor);
}
	var darkpage2 = isLightColor(dropdowncolor);
	if (darkpage2) {
		var lightness3 = '#000000';
		var c3dlight = 0.75;
		var c3ddark = 0.5;
	} else {
		var lightness3 = '#ffffff';
		var c3dlight = 0.5;
		var c3ddark = 0.75;
	}

var dropdowncolor2 = GetInactiveText();
var dropdowncolorH = ColorTest(dropdowncolor,content_color);

/** Page text color **/
var content_text= GetCanvasText();

if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color") !== 'auto')  ) {
	// Liatch Quirk
		var content_text = ColorInvert(content_text);
	
		while ( ( !(isSuitableColor(content_text, content_color)) ) && (content_text !== lightness) ) {
			var content_text= MiniColorTest(content_text);
		}

}

var content_text1 = ColorTest(content_text);

/** 2nd Page text color **/
var content2_text= GetCanvasText2();


if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color") == 'auto') && (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-secondary-background-color") == 'auto')  ) {
} else {
	// Liatch Quirk
		var content2_text = ColorInvert(content2_text);
	
		while ( ( !(isSuitableColor(content2_text, dropdowncolor)) ) && (content2_text !== lightness3) ) {
			var content2_text= MiniColorTest3(content2_text,dropdowncolor);
		}
}


var content2_text1 = ColorTest(content2_text,content_text);


/** Caret Color **/
/* Set Vars */
var caret_color = GetActiveTitle();
// Liatch Quirk
		var caret_color = ColorInvert(caret_color);

var caretcolor1 = ColorTest(caret_color);


/** Caret 2 Color **/
/* Set Vars */
var caret2_color = GetInactiveTitle();
// Liatch Quirk
		var caret2_color = ColorInvert(caret2_color);

var caret2color1 = ColorTest(caret2_color);



/** Button Color **/
/* Set Vars */

var button_color = GetHighlight();

// Liatch Quirk
	var button_color = ColorInvert(button_color);
		while ( ( !(isSuitableColor2(button_color, content_color)) ) && (button_color !== lightness)  ) {
			var button_color= MiniColorTest(button_color);
		}



var buttoncolor1 = ColorTest(button_color);


	lunacolor = caret_color
var lightcaret = isLightColor(lunacolor);
if (lightcaret) {
	var lightness4 = '#000000';
} else {
	var lightness4 = '#ffffff';
}

/** Link Color **/
/* Set Vars */
var link_color = GetHyperlink();

// Liatch Quirk
	var link_color = ColorInvert(link_color);
	var link2_color = link_color;
	var link3_color = link_color;
	
		while ( ( !(isSuitableColor(link_color, content_color)) ) && (link_color !== lightness) ) {
			var link_color= MiniColorTest(link_color);
		}
		while ( ( !(isSuitableColor(link2_color, dropdowncolor)) ) && (link2_color !== lightness3) ) {
			var link2_color= MiniColorTest3(link2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColor(link3_color, lunacolor)) ) && (link3_color !== lightness4) ) {
			var link3_color= MiniColorTest3(link3_color,lunacolor);
		}


var linkcolor1 = ColorTest(link_color,content_color);
var link2color1 = ColorTest(link2_color,content_color);
var link3color1 = ColorTest(link3_color,lunacolor);


/** Content Border **/
/* Set Vars */

var border_color =	dropdowncolor2;

if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-text-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
	// Liatch Quirk

		var border_color = ColorInvert(border_color);

		while ( ( !(isSuitableColor2(border_color, content_color)) ) && (border_color !== lightness)  ) {
			var border_color= MiniColorTest(border_color);
		}


}


var bordercolor1 = ColorTest(border_color);


/** Body Bg **/
/* Set Vars */

var head_color =	GetDesktop();



// Liatch Quirk
		var head_color = ColorInvert(head_color);
	var lighthead = isLightColor(head_color);
	if (lighthead) {
		var lightness2 = '#000000';
	} else {
		var lightness2 = '#ffffff';
	}

window.MW18BgColor = head_color


var headcolor1 = ColorTest(head_color,content_color);

/** Community Header text color **/

var headertext_color= GetDesktopText();

if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-text-background-color") !== 'auto')  ) {
	// Liatch Quirk
		var headertext_color = ColorInvert(headertext_color);

		if ((window.MW18spdarkmode === 6) || (window.MW18spdarkmode === 7)) {
			while ( ( !(isSuitableColor(headertext_color, head_color)) ) && (headertext_color !== lightness2)  ) {
				var headertext_color= MiniColorTest2(headertext_color);
			}
		}/* else {
			while ( ( !(isSuitableColor2(headertext_color, head_color)) ) && (headertext_color !== lightness2)  ) {
				var headertext_color= MiniColorTest2(headertext_color);
			}
		}
		*/

}


var headertextcolor1 = ColorTest(headertext_color,content_text);


/* Generic Colors */
var generic = BestAlertColor();

/** Alert Color **/
/* Set Vars */
var alert_color = generic[0];
var alertcolor1 = ColorTest(alert_color,content_color);
var alertcolor2 = ColorTest(alert_color);

/** Pause Color **/
/* Set Vars */
var pause_color = generic[1];
var pausecolor1 = ColorTest(pause_color,content_color);
var pausecolor2 = ColorTest(pause_color);

/** Warning Color **/
/* Set Vars */
var warning_color = generic[2];
var warningcolor1 = ColorTest(warning_color,content_color);
var warningcolor2 = ColorTest(warning_color);

/** Success Color **/
/* Set Vars */
var success_color = generic[3];
var successcolor1 = ColorTest(success_color,content_color);
var successcolor2 = ColorTest(success_color);

/** Progress Color **/
/* Set Vars */
var progress_color = generic[4];
var progresscolor1 = ColorTest(progress_color,content_color);
var progresscolor2 = ColorTest(progress_color);

/** Message Color **/
/* Set Vars */
var message_color = generic[5];
var messagecolor1 = ColorTest(message_color,content_color);
var messagecolor2 = ColorTest(message_color);

var img = GetDesktopImage();
var imgfilter = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-filter");

if (imgfilter == 'none') {
	var imgfilter = 'opacity(1)';
}


// Gradient Sets
		// Dledlen
		var alert_gradient= GetGradientVariable(content_color,'alert');
		var pause_gradient= GetGradientVariable(content_color,'pause');
		var warning_gradient = GetGradientVariable(content_color,'warning');
		var success_gradient = GetGradientVariable(content_color,'success');
		var progress_gradient = GetGradientVariable(content_color,'progress');
		var message_gradient = GetGradientVariable(content_color,'message');
		var dropdowncolor_gradient = GetGradientVariable(content_color,'canvas-secondary');
		var head_gradient = GetGradientVariable(content_color,'desktop');
		var link_gradient = GetGradientVariable(content_color,'hyperlink');

		// Inverted Dledlen
		var content2_text_gradient = GetGradientVariable(content_text,'canvas-text-secondary');
		var headertext_gradient = GetGradientVariable(content_text,'desktop-text')[0]
var content_color_gradient = GetGradientVariable(content_color,'canvas');
var content_text_gradient = GetGradientVariable(content_text,'canvas-text');
var button_gradient = GetGradientVariable(button_color,'highlight');
var border_gradient = GetGradientVariable(border_color,'inactive-text');
var caret_gradient = GetGradientVariable(caret_color,'active-title');
var caret2_gradient = GetGradientVariable(caret2_color,'inactive-title');

// Foreground texts
var alert_fg = GetForegroundVariables(alert_color);
var pause_fg = GetForegroundVariables(pause_color);
var warning_fg = GetForegroundVariables(warning_color);
var success_fg = GetForegroundVariables(success_color);
var progress_fg = GetForegroundVariables(progress_color);
var message_fg = GetForegroundVariables(message_color);
var content_color_fg = GetForegroundVariables(content_color);
var dropdowncolor_fg = GetForegroundVariables(dropdowncolor);
var content_text_fg = GetForegroundVariables(content_text);
var content2_text_fg = GetForegroundVariables(content2_text);
var button_fg = GetForegroundVariables(button_color);
var link_fg = GetForegroundVariables(link_color);
var border_fg = GetForegroundVariables(border_color);
var head_fg = GetForegroundVariables(head_color);
var headertext_fg = GetForegroundVariables(headertext_color);
var caret_fg = GetForegroundVariables(caret_color);
var caret2_fg = GetForegroundVariables(caret2_color);

	wordfilter2 = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-hover")
	if ( wordfilter2 == "" ) {
		wordfilter2 == 'initial'
	}

var invfilters = [
					['opacity(1)', 'opacity(1) invert(1) hue-rotate(180deg)'],											  // Sp Dark Mode 0 (Normal)
					['opacity(1)', 'opacity(1) invert(1)'],					 											  // Sp Dark Mode 1 (Reversi Dark)
					['grayscale(100%)', 'invert(1) grayscale(100%)'],						  							  // Sp Dark Mode 2 (Grayscale)
					['sepia(1) hue-rotate(20deg)', 'invert(1) sepia(1) hue-rotate(20deg)'],  							  // Sp Dark Mode 3 (Yellow Tint)
					['sepia(1) hue-rotate(200deg)', 'invert(1) sepia(1) hue-rotate(200deg)'], 							  // Sp Dark Mode 4 (Blue Tint)
					['hue-rotate(180deg)','invert(1) hue-rotate(180deg)'],												  // Sp Dark Mode 5 (Reversi Light)
					['opacity(0.5) sepia(1)', 'invert(1) opacity(0.5) sepia(1)'], 										  // Sp Dark Mode 6 (Hot Temperature)
					['opacity(0.5) sepia(1) hue-rotate(180deg)', 'invert(1) opacity(0.5) sepia(1) hue-rotate(180deg)'],   // Sp Dark Mode 7 (Cold Temperature)
					['sepia(1) hue-rotate(320deg)', 'invert(1) sepia(1) hue-rotate(320deg)'], 							  // Sp Dark Mode 8 (Red Tint)
					['sepia(1) hue-rotate(80deg)', 'invert(1) sepia(1) hue-rotate(80deg)'], 							  // Sp Dark Mode 9 (Green Tint)
				 ];
/* Set Values for dynamical variables */
	var result = 		  colorstyle +
						  ":root {" +
						  "--desktop-alternative-foreground-color:" + head_fg[4] + ";\n" + 
						  "--desktop-alternative-foreground-color-hover:" + head_fg[6] + ";\n" + 
						  "--desktop-alternative-foreground-color-rgb:" + head_fg[5] + ";\n" +
						  "--desktop-alternative-foreground-color-hover-rgb:" + head_fg[7] + ";\n" + 
						  "--desktop-text-alternative-foreground-color:" + headertext_fg[4] + ";\n" + 
						  "--desktop-text-alternative-foreground-color-hover:" + headertext_fg[6] + ";\n" + 
						  "--desktop-text-alternative-foreground-color-rgb:" + headertext_fg[5] + ";\n" +
						  "--desktop-text-alternative-foreground-color-hover-rgb:" + headertext_fg[7] + ";\n" +
						  "--hyperlink-alternative-foreground-color:" + link_fg[4] + ";\n" + 
						  "--hyperlink-alternative-foreground-color-hover:" + link_fg[6] + ";\n" + 
						  "--hyperlink-alternative-foreground-color-rgb:" + link_fg[5] + ";\n" +
						  "--hyperlink-alternative-foreground-color-hover-rgb:" + link_fg[7] + ";\n" +
						  "--canvas-alternative-foreground-color:" + content_color_fg[4] + ";\n" + 
						  "--canvas-alternative-foreground-color-hover:" + content_color_fg[6] + ";\n" + 
						  "--canvas-alternative-foreground-color-rgb:" + content_color_fg[5] + ";\n" +
						  "--canvas-alternative-foreground-color-hover-rgb:" + content_color_fg[7] + ";\n" +
						  "--canvas-secondary-alternative-foreground-color:" + dropdowncolor_fg[4] + ";\n" + 
						  "--canvas-secondary-alternative-foreground-color-hover:" + dropdowncolor_fg[6] + ";\n" + 
						  "--canvas-secondary-alternative-foreground-color-rgb:" + dropdowncolor_fg[5] + ";\n" +
						  "--canvas-secondary-alternative-foreground-color-hover-rgb:" + dropdowncolor_fg[7] + ";\n" +
						  "--inactive-text-alternative-foreground-color:" + border_fg[4] + ";\n" + 
						  "--inactive-text-alternative-foreground-color-hover:" + border_fg[6] + ";\n" + 
						  "--inactive-text-alternative-foreground-color-rgb:" + border_fg[5] + ";\n" +
						  "--inactive-text-alternative-foreground-color-hover-rgb:" + border_fg[7] + ";\n" +
						  "--canvas-text-alternative-foreground-color:" + content_text_fg[4] + ";\n" + 
						  "--canvas-text-alternative-foreground-color-hover:" + content_text_fg[6] + ";\n" + 
						  "--canvas-text-alternative-foreground-color-rgb:" + content_text_fg[5] + ";\n" +
						  "--canvas-text-alternative-foreground-color-hover-rgb:" + content_text_fg[7] + ";\n" +
						  "--highlight-alternative-foreground-color:" + button_fg[4] + ";\n" + 
						  "--highlight-alternative-foreground-color-hover:" + button_fg[6] + ";\n" + 
						  "--highlight-alternative-foreground-color-rgb:" + button_fg[5] + ";\n" +
						  "--highlight-alternative-foreground-color-hover-rgb:" + button_fg[7] + ";\n" +
						  "--active-title-alternative-foreground-color:" + caret_fg[4] + ";\n" + 
						  "--active-title-alternative-foreground-color-hover:" + caret_fg[6] + ";\n" + 
						  "--active-title-alternative-foreground-color-rgb:" + caret_fg[5] + ";\n" +
						  "--active-title-alternative-foreground-color-hover-rgb:" + caret_fg[7] + ";\n" +
						  "--inactive-title-alternative-foreground-color:" + caret2_fg[4] + ";\n" + 
						  "--inactive-title-alternative-foreground-color-hover:" + caret2_fg[6] + ";\n" + 
						  "--inactive-title-alternative-foreground-color-rgb:" + caret2_fg[5] + ";\n" +
						  "--inactive-title-alternative-foreground-color-hover-rgb:" + caret2_fg[7] + ";\n" +
						  "--alert-alternative-foreground-color:" + alert_fg[4] + "!important;\n" + 
						  "--alert-alternative-foreground-color-hover:" + alert_fg[6] + "!important;\n" + 
						  "--alert-alternative-foreground-color-rgb:" + alert_fg[5] + "!important;\n" +
						  "--alert-alternative-foreground-color-hover-rgb:" + alert_fg[7] + "!important;\n" +
						  "--pause-alternative-foreground-color:" + pause_fg[4] + "!important;\n" + 
						  "--pause-alternative-foreground-color-hover:" + pause_fg[6] + "!important;\n" + 
						  "--pause-alternative-foreground-color-rgb:" + pause_fg[5] + "!important;\n" +
						  "--pause-alternative-foreground-color-hover-rgb:" + pause_fg[7] + "!important;\n" +
						  "--warning-alternative-foreground-color:" + warning_fg[4] + "!important;\n" + 
						  "--warning-alternative-foreground-color-hover:" + warning_fg[6] + "!important;\n" + 
						  "--warning-alternative-foreground-color-rgb:" + warning_fg[5] + "!important;\n" +
						  "--warning-alternative-foreground-color-hover-rgb:" + warning_fg[7] + "!important;\n" +
						  "--success-alternative-foreground-color:" + success_fg[4] + "!important;\n" + 
						  "--success-alternative-foreground-color-hover:" + success_fg[6] + "!important;\n" + 
						  "--success-alternative-foreground-color-rgb:" + success_fg[5] + "!important;\n" +
						  "--success-alternative-foreground-color-hover-rgb:" + success_fg[7] + "!important;\n" +
						  "--progress-alternative-foreground-color:" + progress_fg[4] + "!important;\n" + 
						  "--progress-alternative-foreground-color-hover:" + progress_fg[6] + "!important;\n" + 
						  "--progress-alternative-foreground-color-rgb:" + progress_fg[5] + "!important;\n" +
						  "--progress-alternative-foreground-color-hover-rgb:" + progress_fg[7] + "!important;\n" +
						  "--message-alternative-foreground-color:" + message_fg[4] + "!important;\n" + 
						  "--message-alternative-foreground-color-hover:" + message_fg[6] + "!important;\n" + 
						  "--message-alternative-foreground-color-rgb:" + message_fg[5] + "!important;\n" +
						  "--message-alternative-foreground-color-hover-rgb:" + message_fg[7] + "!important;\n" +
						  "--canvas-secondary-background-color-hover:" + dropdowncolorH + ";\n" + 
						  "--canvas-secondary-foreground-color:" + dropdowncolor_fg[0] + ";\n" +
						  "--canvas-secondary-foreground-color-hover:" +  dropdowncolor_fg[1] + ";\n" + 
						  "--canvas-3d-background-color:" + ColorTestTwin(dropdowncolor,"#ffffff",c3dlight) + ";\n" +
						  "--canvas-3d-background-color-dark:" + ColorTestTwin(dropdowncolor,"#000000",c3ddark) + ";\n" +
						  "--canvas-background-color-hover:" + content_color2 + ";\n" +
						  "--canvas-foreground-color:" + content_color_fg[0] + ";\n" +
						  "--canvas-foreground-color-hover:" +  content_color_fg[1] + ";\n" + 
						  "--canvas-secondary-background-color-rgb:" + Color2(dropdowncolor) + ";\n" + 
						  "--canvas-secondary-foreground-color-rgb:" + dropdowncolor_fg[2] + ";\n" +
						  "--canvas-secondary-foreground-color-hover-rgb:" +  dropdowncolor_fg[3] + ";\n" + 
						  "--canvas-background-color-rgb:" + Color2( content_color ) + ";\n" +
						  "--canvas-foreground-color-rgb:" +  content_color_fg[2] + ";\n" +
						  "--canvas-foreground-color-hover-rgb:" +  content_color_fg[3] + ";\n" + 
						  "--canvas-text-background-color-hover:" + content_text1 + ";\n" +
						  "--canvas-text-foreground-color:" + content_text_fg[0] + ";\n" +
						  "--canvas-text-foreground-color-hover:" + content_text_fg[1] + ";\n" +
						  "--canvas-text-foreground-color-inverted:" + GetForegroundVariables(content_text1)[0] + ";\n" +
						  "--canvas-text-background-color-rgb:" + Color2( content_text ) + ";\n" +
						  "--canvas-text-background-color-hover-rgb:" + Color2(content_text1) + ";\n" +
						  "--canvas-text-foreground-color-rgb:" + content_text_fg[2] + ";\n" +
						  "--canvas-text-foreground-color-hover-rgb:" + content_text_fg[3] + ";\n" +
						  "--canvas-text-secondary-background-color-hover:" + content2_text1 + ";\n" +
						  "--canvas-text-secondary-foreground-color:" + content2_text_fg[0] + ";\n" +
						  "--canvas-text-secondary-foreground-color-hover:" + content2_text_fg[1] + ";\n" +
						  "--canvas-text-secondary-foreground-color-inverted:" + GetForegroundVariables(content2_text1)[0] + ";\n" +
						  "--canvas-text-secondary-background-color-rgb:" + Color2( content2_text ) + ";\n" +
						  "--canvas-text-secondary-background-color-hover-rgb:" + Color2(content2_text1) + ";\n" +
						  "--canvas-text-secondary-foreground-color-rgb:" + content2_text_fg[2] + ";\n" +
						  "--canvas-text-secondary-foreground-color-hover-rgb:" + content2_text_fg[3] + ";\n" +
						  "--highlight-background-color-hover:" + buttoncolor1 + ";\n" +
						  "--highlight-foreground-color:" + button_fg[0] + ";\n" +
						  "--highlight-foreground-color-hover:" + button_fg[1] + ";\n" +
						  "--highlight-foreground-color-inverted:" + GetForegroundVariables(buttoncolor1)[0] + ";\n" +
						  "--highlight-background-color-rgb:" + Color2(button_color) + ";\n" +
						  "--highlight-foreground-color-rgb:" + button_fg[2] + ";\n" +
						  "--highlight-foreground-color-hover-rgb:" + button_fg[3] + ";\n" +
						  "--hyperlink-background-color-hover:" + linkcolor1 + ";\n" +
						  "--hyperlink-foreground-color:" + link_fg[0] + ";\n" +
						  "--hyperlink-foreground-color-hover:" + link_fg[1] + ";\n" +
						  "--hyperlink-foreground-color-inverted:" + GetForegroundVariables(linkcolor1)[0] + ";\n" +
						  "--hyperlink-background-color-rgb:" + Color2(link_color) + ";\n" +
						  "--hyperlink-background-color-hover-rgb:" + Color2(linkcolor1) + ";\n" +
						  "--hyperlink-foreground-color-rgb:" + link_fg[2] + ";\n" +
						  "--hyperlink-foreground-color-hover-rgb:" + link_fg[3] + ";\n" +
						  "--hyperlink-secondary-background-color:" + link2_color + ";\n" +
						  "--hyperlink-secondary-background-color-hover:" + link2color1 + ";\n" +
						  "--hyperlink-secondary-background-color-rgb:" + Color2(link2_color) + ";\n" +
						  "--hyperlink-tertiary-background-color:" + link3_color + ";\n" +
						  "--hyperlink-tertiary-background-color-hover:" + link3color1 + ";\n" +
						  "--hyperlink-tertiary-background-color-rgb:" + Color2(link3_color) + ";\n" +
						  "--inactive-text-background-color-hover:" + bordercolor1 + ";\n" +
						  "--inactive-text-foreground-color:" + border_fg[0] + ";\n" +
						  "--inactive-text-foreground-color-hover:" + border_fg[1] + ";\n" +
						  "--inactive-text-foreground-color-inverted:" + GetForegroundVariables(bordercolor1)[0] + ";\n" +
						  "--inactive-text-background-color-rgb:" + Color2(border_color) + ";\n" +
						  "--inactive-text-foreground-color-rgb:" + border_fg[2] + ";\n" +
						  "--inactive-text-foreground-color-hover-rgb:" + border_fg[3] + ";\n" +
						  "--desktop-background-color-hover:" + headcolor1 + ";\n" +
						  "--desktop-foreground-color:" + head_fg[0] + ";\n" +
						  "--desktop-foreground-color-hover:" + head_fg[1] + ";\n" +
						  "--desktop-foreground-color-inverted:" + GetForegroundVariables(headcolor1)[0] + ";\n" +
						  "--desktop-background-color-rgb:" + Color2(head_color) + ";\n" +
						  "--desktop-foreground-color-rgb:" + head_fg[2] + ";\n" +
						  "--desktop-foreground-color-hover-rgb:" + head_fg[3] + ";\n" +
						  "--desktop-text-background-color-hover:" + headertextcolor1 + ";\n" +
						  "--desktop-text-foreground-color:" + headertext_fg[0] + ";\n" +
						  "--desktop-text-foreground-color-hover:" + headertext_fg[1] + ";\n" +
						  "--desktop-text-foreground-color-inverted:" + GetForegroundVariables(headertextcolor1)[0] + ";\n" +
						  "--desktop-text-background-color-rgb:" + Color2( headertext_color ) + ";\n" +
						  "--desktop-text-background-color-hover-rgb:" + Color2(headertextcolor1) + ";\n" +
						  "--desktop-text-foreground-color-rgb:" + headertext_fg[2] + ";\n" +
						  "--desktop-text-foreground-color-hover-rgb:" + headertext_fg[2] + ";\n" +
						  "--active-title-background-color-hover:" + caretcolor1 + ";\n" +
						  "--active-title-foreground-color:" + caret_fg[0] + ";\n" +
						  "--active-title-foreground-color-hover:" + caret_fg[1] + ";\n" +
						  "--active-title-foreground-color-inverted:" + GetForegroundVariables(caretcolor1)[0] + ";\n" +
						  "--active-title-background-color-rgb:" + Color2( caret_color ) + ";\n" +
						  "--active-title-foreground-color-rgb:" + caret_fg[2] + ";\n" +
						  "--active-title-foreground-color-hover-rgb:" + caret_fg[3] + ";\n" +
						  "--inactive-title-background-color-hover:" + caret2color1 + ";\n" +
						  "--inactive-title-foreground-color:" + caret2_fg[0] + ";\n" +
						  "--inactive-title-foreground-color-hover:" + caret2_fg[1] + ";\n" +
						  "--inactive-title-foreground-color-inverted:" + GetForegroundVariables(caret2color1)[0] + ";\n" +
						  "--inactive-title-background-color-rgb:" + Color2( caret2_color ) + ";\n" +
						  "--inactive-title-foreground-color-rgb:" + caret2_fg[2] + ";\n" +
						  "--inactive-title-foreground-color-hover-rgb:" + caret2_fg[3] + ";\n" +
						  "--alert-background-color:" + alert_color + "!important;\n" +
						  "--alert-background-color-hover:" + alertcolor1 + "!important;\n" +
						  "--alert-background-color-hover-2:" + alertcolor2 + "!important;\n" +
						  "--alert-gradient-color:" + alert_gradient[0] + "!important;\n" +
						  "--alert-gradient-color-hover:" + alert_gradient[1] + "!important;\n" +
						  "--alert-foreground-color:" + alert_fg[0] + "!important;\n" +
						  "--alert-foreground-color-hover:" + alert_fg[1] + "!important;\n" +
						  "--alert-foreground-color-inverted:" + GetForegroundVariables(alertcolor1)[0] + "!important;\n" +
						  "--alert-background-color-rgb:" + Color2(alert_color) + "!important;\n" +
						  "--alert-foreground-color-rgb:" + alert_fg[2] + "!important;\n" +
						  "--alert-foreground-color-hover-rgb:" + alert_fg[3] + "!important;\n" +
						  "--pause-background-color:" + pause_color + "!important;\n" +
						  "--pause-background-color-hover:" + pausecolor1 + "!important;\n" +
						  "--pause-background-color-hover-2:" + pausecolor2 + "!important;\n" +
						  "--pause-gradient-color:" + pause_gradient[0] + "!important;\n" +
						  "--pause-gradient-color-hover:" + pause_gradient[1] + "!important;\n" +
						  "--pause-foreground-color:" + pause_fg[0] + "!important;\n" +
						  "--pause-foreground-color-hover:" + pause_fg[1] + "!important;\n" +
						  "--pause-foreground-color-inverted:" + GetForegroundVariables(pausecolor1)[0] + "!important;\n" +
						  "--pause-background-color-rgb:" + Color2(pause_color) + "!important;\n" +
						  "--pause-foreground-color-rgb:" + pause_fg[2] + "!important;\n" +
						  "--pause-foreground-color-hover-rgb:" + pause_fg[3] + "!important;\n" +
						  "--warning-background-color:" + warning_color + "!important;\n" +
						  "--warning-background-color-hover:" + warningcolor1 + "!important;\n" +
						  "--warning-background-color-hover-2:" + warningcolor2 + "!important;\n" +
						  "--warning-gradient-color:" + warning_gradient[0] + "!important;\n" +
						  "--warning-gradient-color-hover:" + warning_gradient[1] + "!important;\n" +
						  "--warning-foreground-color:" + warning_fg[0] + "!important;\n" +
						  "--warning-foreground-color-hover:" + warning_fg[1] + "!important;\n" +
						  "--warning-foreground-color-inverted:" + GetForegroundVariables(warningcolor1)[0] + "!important;\n" +
						  "--warning-background-color-rgb:" + Color2(warning_color) + "!important;\n" +
						  "--warning-foreground-color-rgb:" + warning_fg[2] + "!important;\n" +
						  "--warning-foreground-color-hover-rgb:" + warning_fg[3] + "!important;\n" +
						  "--success-background-color:" + success_color + "!important;\n" +
						  "--success-background-color-hover:" + successcolor1 + "!important;\n" +
						  "--success-background-color-hover-2:" + successcolor2 + "!important;\n" +
						  "--success-gradient-color:" + success_gradient[0] + "!important;\n" +
						  "--success-gradient-color-hover:" + success_gradient[1] + "!important;\n" +
						  "--success-foreground-color:" + success_fg[0] + "!important;\n" +
						  "--success-foreground-color-hover:" + success_fg[1] + "!important;\n" +
						  "--success-foreground-color-inverted:" + GetForegroundVariables(successcolor1)[0] + "!important;\n" +
						  "--success-background-color-rgb:" + Color2(success_color) + "!important;\n" +
						  "--success-foreground-color-rgb:" + success_fg[2] + "!important;\n" +
						  "--success-foreground-color-hover-rgb:" + success_fg[3] + "!important;\n" +
						  "--progress-background-color:" + progress_color + "!important;\n" +
						  "--progress-background-color-hover:" + progresscolor1 + "!important;\n" +
						  "--progress-background-color-hover-2:" + progresscolor2 + "!important;\n" +
						  "--progress-gradient-color:" + progress_gradient[0] + "!important;\n" +
						  "--progress-gradient-color-hover:" + progress_gradient[1] + "!important;\n" +
						  "--progress-foreground-color:" + progress_fg[0] + "!important;\n" +
						  "--progress-foreground-color-hover:" + progress_fg[1] + "!important;\n" +
						  "--progress-foreground-color-inverted:" + GetForegroundVariables(progresscolor1)[0] + "!important;\n" +
						  "--progress-background-color-rgb:" + Color2(progress_color) + "!important;\n" +
						  "--progress-foreground-color-rgb:" + progress_fg[2] + "!important;\n" +
						  "--progress-foreground-color-hover-rgb:" + progress_fg[3] + "!important;\n" +
						  "--message-background-color:" + message_color + "!important;\n" +
						  "--message-background-color-hover:" + messagecolor1 + "!important;\n" +
						  "--message-background-color-hover-2:" + messagecolor2 + "!important;\n" +
						  "--message-gradient-color:" + message_gradient[0] + "!important;\n" +
						  "--message-gradient-color-hover:" + message_gradient[1] + "!important;\n" +
						  "--message-foreground-color:" + message_fg[0] + "!important;\n" +
						  "--message-foreground-color-hover:" + message_fg[1] + "!important;\n" +
						  "--message-foreground-color-inverted:" + GetForegroundVariables(messagecolor1)[0] + "!important;\n" +
						  "--message-background-color-rgb:" + Color2(message_color) + "!important;\n" +
						  "--message-foreground-color-rgb:" + message_fg[2] + "!important;\n" +
						  "--message-foreground-color-hover-rgb:" + message_fg[3] + "!important;\n" +
						  "}" +
						  //
						  ":root {" +
						  "--canvas-background-color:" + content_color + ";\n" +
						  "--canvas-secondary-background-color:" + dropdowncolor + ";\n" + 
						  "--canvas-gradient-color:" + content_color_gradient[0] + ";\n" +
						  "--canvas-gradient-color-hover:" + content_color_gradient[1] + ";\n" +
						  "--canvas-secondary-gradient-color:" + dropdowncolor_gradient[0] + ";\n" +
						  "--canvas-secondary-gradient-color-hover:" + dropdowncolor_gradient[1] + ";\n" +
						  "--canvas-text-background-color:" + content_text + ";\n" +
						  "--canvas-text-gradient-color:" + content_text_gradient[0] + ";\n" +
						  "--canvas-text-gradient-color-hover:" + content_text_gradient[1] + ";\n" +
						  "--canvas-text-secondary-background-color:" + content2_text + ";\n" +
						  "--canvas-text-secondary-gradient-color:" + content2_text_gradient[0] + ";\n" +
						  "--canvas-text-secondary-gradient-color-hover:" + content2_text_gradient[1] + ";\n" +
						  "--highlight-background-color:" + button_color + ";\n" +
						  "--highlight-gradient-color:" + button_gradient[0] + ";\n" +
						  "--highlight-gradient-color-hover:" + button_gradient[1] + ";\n" +
						  "--hyperlink-background-color:" + link_color + ";\n" +
						  "--hyperlink-gradient-color:" + link_gradient[0] + ";\n" +
						  "--hyperlink-gradient-color-hover:" + link_gradient[1] + ";\n" +
						  "--inactive-text-background-color:" + border_color + ";\n" +
						  "--inactive-text-gradient-color:" + border_gradient[0] + ";\n" +
						  "--inactive-text-gradient-color-hover:" + border_gradient[1] + ";\n" +
						  "--desktop-background-color:" + head_color + ";\n" +
						  "--desktop-gradient-color:" + head_gradient[0] + ";\n" +
						  "--desktop-gradient-color-hover:" + head_gradient[1] + ";\n" +
						  "--desktop-text-background-color:" + headertext_color + ";\n" +
						  "--desktop-text-gradient-color:" + headertext_gradient[0] + ";\n" +
						  "--desktop-text-gradient-color-hover:" + headertext_gradient[1] + ";\n" +
						  "--active-title-background-color:" + caret_color + ";\n" +
						  "--active-title-gradient-color:" + caret_gradient[0] + ";\n" +
						  "--active-title-gradient-color-hover:" + caret_gradient[1] + ";\n" +
						  "--inactive-title-background-color:" + caret2_color + ";\n" +
						  "--inactive-title-gradient-color:" + caret2_gradient[0] + ";\n" +
						  "--inactive-title-gradient-color-hover:" + caret2_gradient[1] + ";\n" +
// Misc Variables
						'--desktop-background-image:' + img  + ';\n' +
						'--desktop-background-image-filter:' + imgfilter  + ';\n' +
					 '--desktop-background-horizontal-alignment:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-horizontal-alignment")  + ';\n' +
					 '--desktop-background-vertical-alignment:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-vertical-alignment")  + ';\n' +
						 '--custom-font:' + GetCustomFont()  + ';\n' +
						 '--custom-secondary-font:' + GetCustomFont2()  + ';\n' +
						 '--border-radius:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--border-radius")  + ';\n' +
						 '--icon-filter:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter")  + ';\n' +
						 '--icon-filter-hover:' + wordfilter2  + ';\n' +
						 '--icon-filter-duration:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-duration")  + ';\n' +
						 '--icon-filter-delay:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-delay")  + ';\n' +
						 '--system-acryllic-opacity:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-acryllic-opacity")  + ';\n' +
						 '--system-generic-color-hue-shift:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-hue-shift")  + ';\n' +


// Misc Background Settings
						  "--bg-size:" + ['cover','contain','100% 100%','auto'][["cover", "contain", "stretched", "full"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-size") ) ] + ";\n" +
						  "--bg-tile-x:" + ['repeat','no-repeat'][["false", "true"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-horizontal-tiling") ) ] + ";\n" +
						  "--bg-tile-y:" + ['repeat','no-repeat'][["false", "true"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-vertical-tiling") ) ] + ";\n" +
						  "--invertion-filter:" + invfilters[window.MW18spdarkmode][[false, true].indexOf(window.MW18darkmode) ] + ";\n" +
						  "}"


/* Write them to the stylesheet */
document.querySelector("head .theming").innerHTML = result;

}
