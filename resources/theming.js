/* Minimal Version of themes.js for use in Ivilution */
window.MW18darkmode = false;
window.MW18spdarkmode = 0; // 0 = No special behavior | 1 = Inverted Colors Dark | 2 = Grayscale | 3 = Yellow Tint | 4 = Blue Tint | 5 = Inverted Colors Light | 6 = Temperature | 7 = Inverted Temperature | 8 = Red Tint | 9 = Green Tint
window.MW18devicetheme = 'light';
window.MW18wikitheme = 'standard';
window.MW18contrastmode = 'auto';
window.MW18ActiveTheme = 'single';
window.MW18ActiveThemeMode = 'none';
window.MW18ActiveColors = 'standard';
window.MW18ActiveStyleMode = '-';
window.MW18ActiveStyleMode2 = '-';
window.MW18DCMMode = 'standard';
window.MW18DCMType = 'standard';
/* Some Theming Colors */
/* Contrast Values */
window.MW18lowContrast = 3.00;
window.MW18highContrast = 4.50;

( function () {

	/**
	 * @class mw.boilerPlate
	 * @singleton
	 */
	mw.Ivilution = {
	};
	$("body").prepend('<div style="position:absolute; top:-9999999999999999px; left:-99999999999999999999px">' +
			'<div class="cpe-system-colors dcm-standard">' +
				'<span class="fc-canvas" style="color:window; color:canvas;"></span>' +
				'<span class="fc-canvastext" style="color:windowtext; color:canvastext;"></span>' +
				'<span class="fc-linktext" style="color:highlight; color:linktext;"></span>' +
				'<span class="fc-visitedtext" style="color:highlight; color:visitedtext;"></span>' +
				'<span class="fc-activetext" style="color:highlight; color:activetext;"></span>' +
				'<span class="fc-buttonface" style="color:buttonface;"></span>' +
				'<span class="fc-buttontext" style="color:buttontext;"></span>' +
				'<span class="fc-buttonborder" style="color:buttontext; color:buttonborder;"></span>' +
				'<span class="fc-field" style="color:window; color:canvas; color:field;"></span>' +
				'<span class="fc-fieldtext" style="color:windowtext; color:canvastext; color:fieldtext;"></span>' +
				'<span class="fc-highlight" style="color:highlight;"></span>' +
				'<span class="fc-highlighttext" style="color:highlighttext;"></span>' +
				'<span class="fc-selecteditem" style="color:highlight; color:selecteditem;"></span>' +
				'<span class="fc-selecteditemtext" style="color:highlighttext; color:selecteditemtext;"></span>' +
				'<span class="fc-mark" style="color:yellow; color:mark;"></span>' +
				'<span class="fc-marktext" style="color:yellow; color:marktext;"></span>' +
				'<span class="fc-graytext" style="color:graytext;"></span>' +
				'<span class="fc-accentcolor" style="color:highlight;color:accentcolor;"></span>' +
				'<span class="fc-accentcolortext" style="color:highlighttext; color:accentcolortext;"></span>' +
			'</div>' +
			'<div class="cpe-system-colors dcm-reversi">' +
				'<span class="fc-canvas" style="color:windowtext; color:canvastext;"></span>' +
				'<span class="fc-canvastext" style="color:window; color:canvas;"></span>' +
				'<span class="fc-linktext" style="color:highlight;"></span>' +
				'<span class="fc-visitedtext" style="color:highlight;"></span>' +
				'<span class="fc-activetext" style="color:highlight;"></span>' +
				'<span class="fc-buttonface" style="color:buttontext;"></span>' +
				'<span class="fc-buttontext" style="color:buttonface;"></span>' +
				'<span class="fc-buttonborder" style="color:buttonface"></span>' +
				'<span class="fc-field" style="color:windowtext; color:canvastext; color:fieldtext;"></span>' +
				'<span class="fc-fieldtext" style="color:window; color:canvas; color:field;"></span>' +
				'<span class="fc-highlight" style="color:highlight; color:linktext;"></span>' +
				'<span class="fc-highlighttext" style="color:canvastext;"></span>' +
				'<span class="fc-selecteditem" style="color:highlight; color:selecteditem;"></span>' +
				'<span class="fc-selecteditemtext" style="color:highlighttext; color:selecteditemtext;"></span>' +
				'<span class="fc-mark" style="color:yellow; color:mark;"></span>' +
				'<span class="fc-marktext" style="color:yellow; color:marktext;"></span>' +
				'<span class="fc-graytext" style="color:graytext;"></span>' +
				'<span class="fc-accentcolor" style="color:highlight;color:accentcolor;"></span>' +
				'<span class="fc-accentcolortext" style="color:highlighttext; color:accentcolortext;"></span>' +
			'</div>' +
		'<div class="cpe-theming visualcolors-standard theme-single"></div>' +
						'</div>' +
		'<div class="top-gap"></div>' +
		'<div class="focus-overlay" tabindex="-1"></div>'
					  );	// Helper for some things
	document.querySelector('body').setAttribute('tabindex',-1); // Add the CPE button class
	document.querySelector('body').focus();
	$("head").append('<style class="theming"></style>');
	/* Some Theming Colors */
	window.MW18PageColor = GetCanvas();
	window.MW18PageColorFG = '#000000';
	window.MW18BgColor = GetDesktop();
	window.MW18HLColor = GetHighlight();
	window.MW18ATColor = GetActiveTitle();
	window.MW18ITColor = GetInactiveTitle();
	CompileThemingEngine(true);
	VisualMode('standard',false);
	console.log("Ivilution has been succesfully initialized")
}() );


/* Dummied out */
function contrastmode(theme='auto', repaint=true, save=true) {
}

function SliderContrastMode() {
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

function DisabledColorManagement() {
	return ( (ForcedColors()) )
}

function ForcedColors() {
	return ( window.matchMedia('(forced-colors: active)').matches )
}


function ForcedColorMode() {
	mode = ['standard','lite','general','basic','simple','classic','contrast','retro'].indexOf(window.MW18DCMMode);
	return (mode == -1) ? 0 : mode;
}

function ForcedColorType() {
	type = window.MW18DCMType;
	if (type === 'auto') {
		return (ForcedColors()) ? 'standard' : ( window.matchMedia('(prefers-color-scheme: light)').matches ) ? 'standard' : 'reversi';
	} else if (type === 'auto-reversi') {
		return (ForcedColors()) ? 'reversi' : ( window.matchMedia('(prefers-color-scheme: dark)').matches ) ? 'standard' : 'reversi';
	} else if (type === 'reversi') {
		return 'reversi';
	} else if (type === 'standard') {
		return 'standard';
	} else {
		return 'standard';
	}
}

/* Copied from Base JS */
function UpdateSelectValue() { // Handles Blurring
		setTimeout(
		(function() { document.querySelector(' .cpe-dropdown.cpe-select:focus-within').blur(); 	document.querySelector('.focus-overlay').focus(); } )
	,0)
}


function UpdateRange() {
	var ranges = document.querySelectorAll('input[type="range"]');
	ranges.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.value) - x.getAttribute('min') ) * 100) / (x.getAttribute('max') - x.getAttribute('min')) ) + '%'  );
	});

	var progresses = document.querySelectorAll('progress');
	progresses.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.getAttribute('value')) - 0 ) * 100) / (x.getAttribute('max') - 0) ) + '%'  );
	});

}

function UpdateRangeInputs() {
	UpdateRange();

	var ranges2 = document.querySelectorAll('input[type="range"]');
	ranges2.forEach(function(x) {
		x.addEventListener("input", function(e) { UpdateRange(); });
	});

}


/* Visual Styles */
function getVisualMode() {
	if (( window.matchMedia('(forced-colors: active)').matches )) {
		return 'contrast';
	} else {
		return window.MW18ActiveStyleMode
	}
}

function VisualMode(mode,save=true) { // Unlike in CPE Language, it is a stripped down version giving the barebones implementation
	vmode = mode;
	var oldmode = window.MW18ActiveStyleMode2;
	window.MW18ActiveStyleMode = vmode;
	window.MW18ActiveStyleMode2 = getVisualMode();
	if (oldmode === '-') {
		document.querySelector('html').classList.add("visualmode-" +  window.MW18ActiveStyleMode2);
	} else if (oldmode != getVisualMode() ) {
		document.querySelector('html').classList.replace("visualmode-" +  oldmode,"visualmode-" +  window.MW18ActiveStyleMode2);
	}
}




/* Used for some wiki theme modes 
	Also used for some notifications
	Called on body element only */
function CheckTheme() {
	/* Wiki theme */
	CompileThemingEngine(true);
}

/* Getting non-generic color values */
function GetSystemColor(color='canvas') { // System Colors
	return getComputedStyle(document.querySelector('.dcm-' + ForcedColorType() + ' .fc-' + color)).getPropertyValue("color")
}

function GetDesktop() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('field'),			// Standard
				GetSystemColor('graytext'),			// Lite
				GetSystemColor('canvas'),	 		// General
				GetSystemColor('buttonface'), 		// Basic
				GetSystemColor('buttonborder'), 	// Simple
				GetSystemColor('canvas'), 			// Classic
				GetSystemColor('canvas'),			// High Contrast
				GetSystemColor('highlight')			// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-color") === 'auto') {
		return GetCanvas();

	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-color").trim();
	}
}

function GetDesktopImage(trimmed=false) {
	var img = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image").trim();
	if ( (img === '') || (img === 'url()') || (img === "url('')") || (img === 'url("")') || (img === 'none') || (img === "'none'") || (img === '"none"')) {
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
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('fieldtext'),		// Standard
				GetSystemColor('canvas'),			// Lite
				GetSystemColor('accentcolor'), 		// General
				GetSystemColor('buttontext'), 		// Basic
				GetSystemColor('buttonface'), 		// Simple
				GetSystemColor('linktext'), 		// Classic
				GetSystemColor('canvastext'),		// High Contrast
				GetSystemColor('highlighttext')		// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-text-background-color") === 'auto') {
		return ColorInvert(GetDesktop())
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-text-background-color").trim();
	}
}


function GetCanvas() {
	if (DisabledColorManagement()) {
		return GetSystemColor('canvas');
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-background-color") === 'auto') {
		var color = GetHyperlink();
		return ColorMix(color,GetForegroundVariables(color)[0],1.6);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-background-color").trim();
	}
}


function GetCanvas2() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('buttonface'),		// Standard
				GetSystemColor('buttonface'),		// Lite
				GetSystemColor('buttonface'), 		// General
				GetSystemColor('buttonface'), 		// Basic
				GetSystemColor('buttonface'), 		// Simple
				GetSystemColor('buttonface'), 		// Classic
				GetSystemColor('canvas'),			// High Contrast
				GetSystemColor('field')				// Retro
				][ForcedColorMode()];
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-secondary-background-color").trim();
	}
}


function GetHyperlink() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('linktext'),			// Standard
				GetSystemColor('highlight'),		// Lite
				GetSystemColor('accentcolor'), 		// General
				GetSystemColor('linktext'), 		// Basic
				GetSystemColor('linktext'), 		// Simple
				GetSystemColor('linktext'), 		// Classic
				GetSystemColor('linktext'),			// High Contrast
				GetSystemColor('linktext')			// Retro
				][ForcedColorMode()];
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--hyperlink-background-color").trim();
	}
}


function GetVisitedHyperlink() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('visitedtext'),		// Standard
				GetSystemColor('highlight'),		// Lite
				GetSystemColor('accentcolor'), 		// General
				GetSystemColor('visitedtext'), 		// Basic
				GetSystemColor('visitedtext'), 		// Simple
				GetSystemColor('visitedtext'), 		// Classic
				GetSystemColor('linktext'),			// High Contrast
				GetSystemColor('linktext')			// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--visited-hyperlink-background-color") === 'auto') {
		return GetHyperlink();
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--visited-hyperlink-background-color").trim();
	}
}


function GetInactiveText() {
	if (DisabledColorManagement()) {
		return GetSystemColor('graytext');			// All Modes
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-text-background-color") === 'auto') {
		return ColorMix(window.MW18PageColor,window.MW18PageColorFG,window.MW18FinalContrast);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-text-background-color").trim();
	}
}

function GetActiveText() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('activetext'),		// Standard
				GetSystemColor('highlight'),		// Lite
				GetSystemColor('accentcolor'), 		// General
				GetSystemColor('activetext'), 		// Basic
				GetSystemColor('activetext'),	 	// Simple
				GetSystemColor('activetext'), 		// Classic
				GetSystemColor('linktext'),			// High Contrast
				GetSystemColor('graytext')			// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-text-background-color") === 'auto') {
		var color = GetHyperlink();
		var color2 = GetForegroundVariables(GetCanvas())[0]
		return ColorMix(color2,color,1.2);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-text-background-color").trim();
	}
}


function GetCanvasText() {
	if (DisabledColorManagement()) {
		return GetSystemColor('canvastext');		// All Modes
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color") === 'auto') {
		return ColorInvert(GetCanvas())
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color").trim();
	}
}


function GetCanvasText2() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('buttontext'),		// Standard
				GetSystemColor('buttontext'),		// Lite
				GetSystemColor('buttontext'), 		// General
				GetSystemColor('buttontext'), 		// Basic
				GetSystemColor('buttontext'),	 	// Simple
				GetSystemColor('buttontext'), 		// Classic
				GetSystemColor('canvastext'),		// High Contrast
				GetSystemColor('fieldtext')			// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-secondary-background-color") === 'auto') {
		return GetCanvasText();
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-secondary-background-color").trim();
	}
}


function GetHighlight() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('highlight'),		// Standard
				GetSystemColor('highlight'),		// Lite
				GetSystemColor('accentcolor'), 		// General
				GetSystemColor('linktext'), 		// Basic
				GetSystemColor('selecteditem'),	 	// Simple
				GetSystemColor('highlight'), 		// Classic
				GetSystemColor('highlight'),		// High Contrast
				GetSystemColor('canvastext')		// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color") === 'auto') {
		var color = GetHyperlink();
		var color2 = GetForegroundVariables(GetCanvas())[0]
		return ColorMix(color2,color,1.6);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color").trim();
	}
}

function GetHighlightText() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('highlighttext'),	// Standard
				GetSystemColor('highlighttext'),	// Lite
				GetSystemColor('accentcolortext'), 	// General
				GetSystemColor('canvas'),	 		// Basic
				GetSystemColor('selecteditemtext'), // Simple
				GetSystemColor('highlighttext'),	// Classic
				GetSystemColor('highlighttext'),	// High Contrast
				GetSystemColor('canvas')			// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-text-background-color") === 'auto') {
		return ColorInvert(window.MW18HLColor);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-text-background-color").trim();
	}
}


function GetActiveTitle() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('fieldtext'),		// Standard
				GetSystemColor('canvastext'),		// Lite
				GetSystemColor('accentcolor'),	 	// General
				GetSystemColor('linktext'),	 		// Basic
				GetSystemColor('buttontext'),		// Simple
				GetSystemColor('linktext'),			// Classic
				GetSystemColor('buttonface'),		// High Contrast
				GetSystemColor('graytext')			// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color") === 'auto') {
		var color = GetHyperlink();
		var color2 = ColorInvert(GetForegroundVariables(GetCanvas())[0])
		return ColorMix(color2,color,1.6);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color").trim();
	}
}

function GetActiveTitleText() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('field'),			// Standard
				GetSystemColor('canvas'),			// Lite
				GetSystemColor('accentcolortext'), 	// General
				GetSystemColor('canvas'), 			// Basic
				GetSystemColor('buttonface'),		// Simple
				GetSystemColor('canvas'),			// Classic
				GetSystemColor('buttontext'),		// High Contrast
				GetSystemColor('canvas')			// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-text-background-color") === 'auto') {
		return ColorInvert(window.MW18ATColor);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-text-background-color").trim();
	}
}


function GetInactiveTitle() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('canvas'),			// Standard
				GetSystemColor('canvas'),			// Lite
				GetSystemColor('buttonface'),	 	// General
				GetSystemColor('canvas'), 			// Basic
				GetSystemColor('canvastext'),		// Simple
				GetSystemColor('graytext'),			// Classic
				GetSystemColor('canvas'),			// High Contrast
				GetSystemColor('canvas')			// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color") === 'auto') {
		return ColorMix(window.MW18ATColor,window.MW18PageColor,1.5);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color").trim();
	}
}

function GetInactiveTitleText() {
	if (DisabledColorManagement()) {
		return [
				GetSystemColor('graytext'),			// Standard
				GetSystemColor('canvastext'),		// Lite
				GetSystemColor('graytext'),		 	// General
				GetSystemColor('canvastext'), 		// Basic
				GetSystemColor('canvas'),			// Simple
				GetSystemColor('canvas'),			// Classic
				GetSystemColor('graytext'),			// High Contrast
				GetSystemColor('graytext')			// Retro
				][ForcedColorMode()];
	} else if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-text-background-color") === 'auto') {
		return ColorInvert(window.MW18ITColor);
	} else {
		return getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-text-background-color").trim();
	}
}


function GetAlert() {
		return BestAlertColor(window.MW18PageColor)[0];
}

function GetPause() {
		return BestAlertColor(window.MW18PageColor)[1];
}

function GetWarning() {
		return BestAlertColor(window.MW18PageColor)[2];
}

function GetSuccess() {
		return BestAlertColor(window.MW18PageColor)[3];
}

function GetProgress() {
		return BestAlertColor(window.MW18PageColor)[4];
}

function GetMessage() {
		return BestAlertColor(window.MW18PageColor)[5];
}

function GetCustomFont() {
	var img = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--custom-font").trim();
		return img.replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
}

function GetCustomFont2() {
	var img = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--custom-secondary-font").trim();
		return img.replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
}


function ContrastRatio() { // Used for Text

	if (MW18contrastmode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 1.55 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.275 : 1.0
	} else if (MW18contrastmode == 'low') { // 4.5
		return 1.00
	} else if (MW18contrastmode == 'custom1') { // Custom
		return 1.06875
	} else if (MW18contrastmode == 'med-low') {
		return 1.1375
	} else if (MW18contrastmode == 'custom2') { // Custom
		return 1.20625
	} else if (MW18contrastmode == 'med') {
		return 1.275
	} else if (MW18contrastmode == 'custom3') { // Custom
		return 1.34375
	} else if (MW18contrastmode == 'med-hi') {
		return 1.4125
	} else if (MW18contrastmode == 'custom4') { // Custom
		return 1.48125
	} else if (MW18contrastmode == 'hi') { // 7
		return 1.55
	} else if (MW18contrastmode == 'custom5') { // Custom
		return 1.61875
	} else if (MW18contrastmode == 'hi-vhi') {
		return 1.6875
	} else if (MW18contrastmode == 'custom6') { // Custom
		return 1.75625
	} else if (MW18contrastmode == 'vhi') {
		return 1.825
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 1.55 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.275 : 1.0
	}
}

function ContrastRatio2() { // Used For Dropdown

	if (MW18contrastmode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.35 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.30 : 0.25
	} else if (MW18contrastmode == 'low') {
		return 0.25
	} else if (MW18contrastmode == 'custom1') { // Custom
		return 0.2625
	} else if (MW18contrastmode == 'med-low') {
		return 0.275
	} else if (MW18contrastmode == 'custom2') { // Custom
		return 0.2875
	} else if (MW18contrastmode == 'med') {
		return 0.3
	} else if (MW18contrastmode == 'custom3') { // Custom
		return 0.3125
	} else if (MW18contrastmode == 'med-hi') {
		return 0.325
	} else if (MW18contrastmode == 'custom4') { // Custom
		return 0.3375
	} else if (MW18contrastmode == 'hi') {
		return 0.35
	} else if (MW18contrastmode == 'custom5') { // Custom
		return 0.3625
	} else if (MW18contrastmode == 'hi-vhi') {
		return 0.375
	} else if (MW18contrastmode == 'custom6') { // Custom
		return 0.3875
	} else if (MW18contrastmode == 'vhi') {
		return 0.4
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.35 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.30 : 0.25
	}
}

function ContrastRatio3() { // Used for Form Controls

	if (MW18contrastmode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 1.5 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.25 : 1.0
	} else if (MW18contrastmode == 'low') { // 3
		return 1.00
	} else if (MW18contrastmode == 'custom1') { // Custom
		return 1.0625
	} else if (MW18contrastmode == 'med-low') {
		return 1.125
	} else if (MW18contrastmode == 'custom2') { // Custom
		return 1.1875
	} else if (MW18contrastmode == 'med') {
		return 1.25
	} else if (MW18contrastmode == 'custom3') { // Custom
		return 1.3125
	} else if (MW18contrastmode == 'med-hi') {
		return 1.375
	} else if (MW18contrastmode == 'custom4') { // Custom
		return 1.4375
	} else if (MW18contrastmode == 'hi') { // 4.5
		return 1.5
	} else if (MW18contrastmode == 'custom5') { // Custom
		return 1.5625
	} else if (MW18contrastmode == 'hi-vhi') {
		return 1.625
	} else if (MW18contrastmode == 'custom6') { // Custom
		return 1.6875
	} else if (MW18contrastmode == 'vhi') {
		return 1.75
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 1.5 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.25 : 1.0
	}
}

function ContrastRatio4() { // Used For Inactive Text

	if (MW18contrastmode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.86 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.78 : 0.7
	} else if (MW18contrastmode == 'low') {
		return 0.7
	} else if (MW18contrastmode == 'custom1') { // Custom
		return 0.72
	} else if (MW18contrastmode == 'med-low') {
		return 0.74
	} else if (MW18contrastmode == 'custom2') { // Custom
		return 0.76
	} else if (MW18contrastmode == 'med') {
		return 0.78
	} else if (MW18contrastmode == 'custom3') { // Custom
		return 0.8
	} else if (MW18contrastmode == 'med-hi') {
		return 0.82
	} else if (MW18contrastmode == 'custom4') { // Custom
		return 0.84
	} else if (MW18contrastmode == 'hi') {
		return 0.86
	} else if (MW18contrastmode == 'custom5') { // Custom
		return 0.88
	} else if (MW18contrastmode == 'hi-vhi') {
		return 0.9
	} else if (MW18contrastmode == 'custom6') { // Custom
		return 0.92
	} else if (MW18contrastmode == 'vhi') {
		return 0.94
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.86 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.78 : 0.7
	}
}



function BestAlertColor(color) {
var page = color;
var invpage = page;
hueshift =  parseInt(getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-hue-shift"));
saturation =  parseInt(getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-saturation")) + "%";


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
//		messageh = -1
		
		contrast = window.MW18highContrast*ContrastRatio()*1

	for (let i = 0; i < colors.length; i++) {
		var color = chroma('hsl(0,' + saturation + ',' + colors[i] + ')').hex(); // Base Color
		var alert = chroma(color).set('hsl.h',alerth+hueshift); // Alert
		var pause = chroma(color).set('hsl.h',pauseh+hueshift);  // Pause
		var warn = chroma(color).set('hsl.h',warningh+hueshift);  // Warning
		var done = chroma(color).set('hsl.h',successh+hueshift); // Success
		var progress = chroma(color).set('hsl.h',progressh+hueshift); // Progress
		var info = chroma(color).set('hsl.s',0); // Message
		if ( ((chroma.contrast(page, alert)) >= contrast) && ((chroma.contrast(page, pause)) >= contrast) && ((chroma.contrast(page, warn)) >= contrast) && ((chroma.contrast(page, done)) >= contrast) && ((chroma.contrast(page, progress)) >= contrast) && ((chroma.contrast(page, info)) >= contrast) ) {
			return [alert, pause, warn, done, progress, info];
		}
	}

	return [alert, pause, warn, done, progress, info];

 
}

/* Get Foreground Variables */

function GetForegroundVariables(color) {
	var body = document.querySelector('body');
	if (isSemiLightColor(color)) {
		var fc1 =  getComputedStyle(body).getPropertyValue("--light-theme-text-background-color");
		var fc2 =  getComputedStyle(body).getPropertyValue("--light-theme-text-background-color-rgb");
		var fc3 =  getComputedStyle(body).getPropertyValue("--light-theme-text-background-color-hover");
		var fc4 =  getComputedStyle(body).getPropertyValue("--light-theme-text-background-color-hover-rgb");
	} else {
		var fc1 =  getComputedStyle(body).getPropertyValue("--dark-theme-text-background-color");
		var fc2 =  getComputedStyle(body).getPropertyValue("--dark-theme-text-background-color-rgb");
		var fc3 =  getComputedStyle(body).getPropertyValue("--dark-theme-text-background-color-hover");
		var fc4 =  getComputedStyle(body).getPropertyValue("--dark-theme-text-background-color-hover-rgb");
	}

	if (isLightColor(color)) {
		var f1 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color");
		var f2 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color-hover");
		var f3 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color-rgb");
		var f4 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color-hover-rgb");
	} else {
		var f1 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color");
		var f2 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color-hover");
		var f3 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color-rgb");
		var f4 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color-hover-rgb");
	}
	return [f1, f2, f3, f4, fc1, fc2, fc3, fc4]
}


/* Get Gradient Variables */
function GetGradientVariable(color,name="canvas") {
	if (isLightColor(color)) {
		return ['var(--' + name + '-background-color)', 'var(--' + name + '-background-color-hover)']
	} else {
		return ['var(--' + name + '-background-color-hover)', 'var(--' + name + '-background-color)']
	}
}

/* End of this work */



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
				 '--desktop-background-image-blend-mode:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-image-blend-mode")  + ';\n' +
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
				 '--desktop-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--desktop-background-color-hover-rgb")  + ';\n' +
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
				 '--canvas-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-background-color-hover-rgb")  + ';\n' +
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
				 '--canvas-secondary-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--canvas-secondary-background-color-hover-rgb")  + ';\n' +
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
				 '--inactive-text-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-background-color-hover-rgb")  + ';\n' +
				 '--inactive-text-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-foreground-color-rgb")  + ';\n' +
				 '--inactive-text-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-foreground-color-hover-rgb")  + ';\n' +
				 '--inactive-text-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-alternative-foreground-color-rgb")  + ';\n' +
				 '--inactive-text-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-text-alternative-foreground-color-hover-rgb")  + ';\n' +

				 // Secondary Page Border Color
				 '--active-text-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-background-color")  + ';\n' +
				 '--active-text-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-background-color-hover")  + ';\n' +
				 '--active-text-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-fadeout-color")  + ';\n' +
				 '--active-text-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-gradient-color")  + ';\n' +
				 '--active-text-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-gradient-color-hover")  + ';\n' +
				 '--active-text-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-foreground-color")  + ';\n' +
				 '--active-text-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-foreground-color-hover")  + ';\n' +
				 '--active-text-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-foreground-color-inverted")  + ';\n' +
				 '--active-text-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-alternative-foreground-color")  + ';\n' +
				 '--active-text-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-alternative-foreground-color-hover")  + ';\n' +
				 '--active-text-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-background-color-rgb")  + ';\n' +
				 '--active-text-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-background-color-hover-rgb")  + ';\n' +
				 '--active-text-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-foreground-color-rgb")  + ';\n' +
				 '--active-text-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-foreground-color-hover-rgb")  + ';\n' +
				 '--active-text-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-alternative-foreground-color-rgb")  + ';\n' +
				 '--active-text-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // 2nd Secondary Page Border Color
				 '--active-text-secondary-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-secondary-background-color")  + ';\n' +
				 '--active-text-secondary-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-secondary-background-color-hover")  + ';\n' +
				 '--active-text-secondary-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-secondary-background-color-rgb")  + ';\n' +
				 // 3rd Secondary Page Border Color
				 '--active-text-tertiary-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-tertiary-background-color")  + ';\n' +
				 '--active-text-tertiary-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-tertiary-background-color-hover")  + ';\n' +
				 '--active-text-tertiary-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-text-tertiary-background-color-rgb")  + ';\n' +

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
				 '--highlight-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-background-color-hover-rgb")  + ';\n' +
				 '--highlight-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-foreground-color-rgb")  + ';\n' +
				 '--highlight-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-foreground-color-hover-rgb")  + ';\n' +
				 '--highlight-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-alternative-foreground-color-rgb")  + ';\n' +
				 '--highlight-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Accent Text Color
				 '--highlight-text-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-background-color")  + ';\n' +
				 '--highlight-text-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-background-color-hover")  + ';\n' +
				 '--highlight-text-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-fadeout-color")  + ';\n' +
				 '--highlight-text-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-gradient-color")  + ';\n' +
				 '--highlight-text-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-gradient-color-hover")  + ';\n' +
				 '--highlight-text-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-foreground-color")  + ';\n' +
				 '--highlight-text-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-foreground-color-hover")  + ';\n' +
				 '--highlight-text-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-foreground-color-inverted")  + ';\n' +
				 '--highlight-text-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-alternative-foreground-color")  + ';\n' +
				 '--highlight-text-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-alternative-foreground-color-hover")  + ';\n' +
				 '--highlight-text-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-background-color-rgb")  + ';\n' +
				 '--highlight-text-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-background-color-hover-rgb")  + ';\n' +
				 '--highlight-text-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-foreground-color-rgb")  + ';\n' +
				 '--highlight-text-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-foreground-color-hover-rgb")  + ';\n' +
				 '--highlight-text-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-alternative-foreground-color-rgb")  + ';\n' +
				 '--highlight-text-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--highlight-text-alternative-foreground-color-hover-rgb")  + ';\n' +

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

				 // Secondary Visited Accent Color
				 '--visited-hyperlink-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-background-color")  + ';\n' +
				 '--visited-hyperlink-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-background-color-hover")  + ';\n' +
				 '--visited-hyperlink-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-fadeout-color")  + ';\n' +
				 '--visited-hyperlink-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-gradient-color")  + ';\n' +
				 '--visited-hyperlink-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-gradient-color-hover")  + ';\n' +
				 '--visited-hyperlink-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-foreground-color")  + ';\n' +
				 '--visited-hyperlink-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-foreground-color-hover")  + ';\n' +
				 '--visited-hyperlink-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-foreground-color-inverted")  + ';\n' +
				 '--visited-hyperlink-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-alternative-foreground-color")  + ';\n' +
				 '--visited-hyperlink-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-alternative-foreground-color-hover")  + ';\n' +
				 '--visited-hyperlink-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-background-color-rgb")  + ';\n' +
				 '--visited-hyperlink-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-background-color-hover-rgb")  + ';\n' +
				 '--visited-hyperlink-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-foreground-color-rgb")  + ';\n' +
				 '--visited-hyperlink-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-foreground-color-hover-rgb")  + ';\n' +
				 '--visited-hyperlink-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-alternative-foreground-color-rgb")  + ';\n' +
				 '--visited-hyperlink-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // 2nd Secondary Visited Accent Color
				 '--visited-hyperlink-secondary-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-secondary-background-color")  + ';\n' +
				 '--visited-hyperlink-secondary-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-secondary-background-color-hover")  + ';\n' +
				 '--visited-hyperlink-secondary-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-secondary-background-color-rgb")  + ';\n' +
				 // 3rd Secondary Visited Accent Color
				 '--visited-hyperlink-tertiary-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-tertiary-background-color")  + ';\n' +
				 '--visited-hyperlink-tertiary-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-tertiary-background-color-hover")  + ';\n' +
				 '--visited-hyperlink-tertiary-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--visited-hyperlink-tertiary-background-color-rgb")  + ';\n' +

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
				 '--active-title-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-background-color-hover-rgb")  + ';\n' +
				 '--active-title-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-foreground-color-rgb")  + ';\n' +
				 '--active-title-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-foreground-color-hover-rgb")  + ';\n' +
				 '--active-title-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-alternative-foreground-color-rgb")  + ';\n' +
				 '--active-title-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Tertiary Accent Text Color
				 '--active-title-text-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-background-color")  + ';\n' +
				 '--active-title-text-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-background-color-hover")  + ';\n' +
				 '--active-title-text-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-fadeout-color")  + ';\n' +
				 '--active-title-text-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-gradient-color")  + ';\n' +
				 '--active-title-text-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-gradient-color-hover")  + ';\n' +
				 '--active-title-text-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-foreground-color")  + ';\n' +
				 '--active-title-text-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-foreground-color-hover")  + ';\n' +
				 '--active-title-text-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-foreground-color-inverted")  + ';\n' +
				 '--active-title-text-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-alternative-foreground-color")  + ';\n' +
				 '--active-title-text-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-alternative-foreground-color-hover")  + ';\n' +

				 '--active-title-text-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-background-color-rgb")  + ';\n' +
				 '--active-title-text-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-background-color-hover-rgb")  + ';\n' +
				 '--active-title-text-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-foreground-color-rgb")  + ';\n' +
				 '--active-title-text-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-foreground-color-hover-rgb")  + ';\n' +
				 '--active-title-text-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-alternative-foreground-color-rgb")  + ';\n' +
				 '--active-title-text-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--active-title-text-alternative-foreground-color-hover-rgb")  + ';\n' +
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
				 '--inactive-title-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-background-color-hover-rgb")  + ';\n' +
				 '--inactive-title-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-foreground-color-rgb")  + ';\n' +
				 '--inactive-title-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-foreground-color-hover-rgb")  + ';\n' +
				 '--inactive-title-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-alternative-foreground-color-rgb")  + ';\n' +
				 '--inactive-title-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-alternative-foreground-color-hover-rgb")  + ';\n' +
				 // Quaternary Accent Text Color
				 '--inactive-title-text-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-background-color")  + ';\n' +
				 '--inactive-title-text-background-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-background-color-hover")  + ';\n' +
				 '--inactive-title-text-fadeout-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-fadeout-color")  + ';\n' +
				 '--inactive-title-text-gradient-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-gradient-color")  + ';\n' +
				 '--inactive-title-text-gradient-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-gradient-color-hover")  + ';\n' +
				 '--inactive-title-text-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-foreground-color")  + ';\n' +
				 '--inactive-title-text-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-foreground-color-hover")  + ';\n' +
				 '--inactive-title-text-foreground-color-inverted:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-foreground-color-inverted")  + ';\n' +
				 '--inactive-title-text-alternative-foreground-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-alternative-foreground-color")  + ';\n' +
				 '--inactive-title-text-alternative-foreground-color-hover:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-alternative-foreground-color-hover")  + ';\n' +
				 '--inactive-title-text-background-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-background-color-rgb")  + ';\n' +
				 '--inactive-title-text-background-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-background-color-hover-rgb")  + ';\n' +
				 '--inactive-title-text-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-foreground-color-rgb")  + ';\n' +
				 '--inactive-title-text-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-foreground-color-hover-rgb")  + ';\n' +
				 '--inactive-title-text-alternative-foreground-color-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-alternative-foreground-color-rgb")  + ';\n' +
				 '--inactive-title-text-alternative-foreground-color-hover-rgb:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--inactive-title-text-alternative-foreground-color-hover-rgb")  + ';\n' +
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
				 '--system-mica-opacity:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--system-mica-opacity")  + ';\n' +
				 '--system-generic-color-hue-shift:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--system-generic-color-hue-shift")  + ';\n' +
				 '--system-generic-color-saturation:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--system-generic-color-saturation")  + ';\n' +
				 '--mica-background-color:' + getComputedStyle(document.querySelector('body')).getPropertyValue("--mica-background-color")  + ';\n' +
				 '}' // Ending
	} else { // For use with Theme Management
		result = '.visualcolors-standard.theme-A {\n' + // Beginning
				 '--desktop-background-image:' + GetDesktopImage()  + ';\n' +
				 '--desktop-background-image-filter:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-filter")  + ';\n' +
				 '--desktop-background-image-blend-mode:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-blend-mode")  + ';\n' +
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
				 '--active-text-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-text-background-color")  + ';\n' +
				 '--canvas-text-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color")  + ';\n' +
				 '--canvas-text-secondary-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-secondary-background-color")  + ';\n' +
				 '--highlight-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color")  + ';\n' +
				 '--highlight-text-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-text-background-color")  + ';\n' +
				 '--hyperlink-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--hyperlink-background-color")  + ';\n' +
				 '--visited-hyperlink-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--visited-hyperlink-background-color")  + ';\n' +
				 '--active-title-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color")  + ';\n' +
				 '--active-title-text-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-text-background-color")  + ';\n' +
				 '--inactive-title-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color")  + ';\n' +
				 '--inactive-title-text-background-color:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-text-background-color")  + ';\n' +
				 '--custom-font:' + GetCustomFont()  + ';\n' +
				 '--custom-secondary-font:' + GetCustomFont2()  + ';\n' +
				 '--border-radius:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--border-radius")  + ';\n' +
				 '--icon-filter:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter")  + ';\n' +
				 '--icon-filter-hover:' + wordfilter2  + ';\n' +
				 '--icon-filter-duration:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-duration")  + ';\n' +
				 '--icon-filter-delay:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-delay")  + ';\n' +
				 '--system-acryllic-opacity:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-acryllic-opacity")  + ';\n' +
				 '--system-generic-color-hue-shift:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-hue-shift")  + ';\n' +
				 '--system-generic-color-saturation:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-hue-shift")  + ';\n' +

				 '}' // Ending
	}
	alert('Once you save the file, put the stylesheet contents to MediaWiki:Common.css for use in the wiki or upload it to any website.');
	DownloadData(result,'MyTheme','css');
}


/* Begin Color Parsers */
function ColorMix(color1,color2,intensity=1,hue='nil') {
	var alpha = 0.5*intensity;
	if (hue === 'nil') {
		return chroma.mix(color1, color2, alpha, 'rgb');
	} else if (hue === -1) {
		return chroma.mix(color1, color2, alpha, 'rgb').set('hsl.s', 0).set('hsl.h', 0);
	} else {
		return chroma.mix(color1, color2, alpha, 'rgb').set('hsl.h', hue);
	}
}


function ColorHover(color,color2) { // Regular Colors
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

function ColorAdjust(color,dark=false) { // Regular Colors
	var color2 = window.MW18PageColor;
	var func = dark ? (isDarkColor(color2)) : (isLightColor(color2));
	var light = chroma(color).get('hsl.l');
	if (func) {
		return chroma(color).set('hsl.l', light-0.01).hex();
	} else {
		return chroma(color).set('hsl.l', light+0.01).hex();
	}

}


function ColorAdjust2(color,dark=false) { // Regular Colors
	var color2 = window.MW18BgColor;
	var func = dark ? (isDarkColor(color2)) : (isLightColor(color2));
	var light = chroma(color).get('hsl.l');
	if (func) {
		return chroma(color).set('hsl.l', light-0.01).hex();
	} else {
		return chroma(color).set('hsl.l', light+0.01).hex();
	}
}


function ColorAdjust3(color,color2,dark=false) { // Regular Colors
	var func = dark ? (isDarkColor(color2)) : (isLightColor(color2));
	var light = chroma(color).get('hsl.l');
	if (func) {
		return chroma(color).set('hsl.l', light-0.01).hex();
	} else {
		return chroma(color).set('hsl.l', light+0.01).hex();
	}
}


function ColorInvert(color) {
	var r = 255 - chroma(color).get('rgb.r');
	var g = 255 - chroma(color).get('rgb.g');
	var b = 255 - chroma(color).get('rgb.b');
	var h = chroma(color).get('lch.h');
	var h2 = chroma(color).get('hsl.h');
	return 	chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('lch.h', h).set('hsl.h', h2)
}

function ColorStyleAdjust(color) {
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
function ColorHover2(color,color2) {
	return ColorRGB(ColorHover(color,color2));
}

// Conversion for R,G,B syntax
function ColorRGB(color) {
	return chroma(color).get('rgb.r') + ',' + chroma(color).get('rgb.g') + ',' + chroma(color).get('rgb.b');
}

function isLightColor(color) {
	var c1 = (chroma.contrast('#000000',  chroma(color)))
	var c2 = (chroma.contrast('#ffffff',  chroma(color)))
	return (c1 > c2);

/*
 return chroma(color).lch()[0] >= 50
 return chroma.deltaE('#000000', color) >= 50;
*/

}

function isSemiLightColor(color) {
	var c1 = (chroma.contrast(getComputedStyle(document.querySelector('body')).getPropertyValue("--light-theme-text-background-color"),  chroma(color)))
	var c2 = (chroma.contrast(getComputedStyle(document.querySelector('body')).getPropertyValue("--dark-theme-text-background-color"),  chroma(color)))
	return (c1 > c2);
/*
	return chroma.deltaE('#e6e6e6', color) >= chroma.deltaE('#3a3a3a', color);
*/
}


function isDarkColor(color) {
	return !isLightColor(color)
}

function isSuitableColorText(color,color2) {
var contrast = window.MW18highContrast*ContrastRatio()
return ((chroma.contrast(color, color2)) >= contrast)
}

function isSuitableColorFormControls(color,color2) {
var contrast = window.MW18lowContrast*ContrastRatio3()
return ((chroma.contrast(color, color2)) >= contrast) // For Border Color
}



/* End Color Parsers */

/* Used to udpate all dynamical variables */
function CompileThemingEngine(refresh=true) {
if (refresh === true) {
	var theme = window.MW18wikitheme;
	var style = window.MW18devicetheme;
	colortheme(theme, style, false,false);
	var cmode = window.MW18contrastmode;
	contrastmode(cmode, false,false);
	/** Foreground Colors 
	document.querySelector('html').style.setProperty("--light-theme-foreground-color-hover", ColorHover(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color")) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-hover", ColorHover(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color")) );

	document.querySelector('html').style.setProperty("--light-theme-foreground-color-rgb", ColorRGB(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color")) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-rgb", ColorRGB(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color")) );

	document.querySelector('html').style.setProperty("--light-theme-foreground-color-hover-rgb", ColorRGB(ColorHover(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color"))) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-hover-rgb", ColorRGB(ColorHover(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color"))) );
	**/
}

//	ToggleTheme(window.MW18ActiveTheme,false,false);
//	VisualColor(window.MW18ActiveColors,false,false);
	if (DisabledColorManagement()) {
		var colorstyle =".color-management-on { display:none!important;} @supports (not (color-scheme:normal)) { .color-modes { display:none!important } }\n"
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

var content_color =  GetCanvas();

/* This goes before compiling Generic Colors or else they will think the theme is light */

// Liatch Quirk
	var content_color = ColorStyleAdjust(content_color)

	window.MW18PageColor = content_color;
	var darkpage = isLightColor(content_color);


var content_color2 = ColorHover(content_color);

var adjustment = ContrastRatio2();
window.MW18FinalContrast = ContrastRatio4();

	if (darkpage) {
		var lightness = '#000000';
		var lightnessR = '#ffffff';
	} else {
		var lightness = '#ffffff';
		var lightnessR = '#000000';
	}
		window.MW18PageColorFG = lightness

if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-secondary-background-color") == 'auto') ) {
	if (darkpage) {
		var dropdowncolor = ColorMix(content_color,"#000000",adjustment);
	} else {
		var dropdowncolor = ColorMix(content_color,"#ffffff",adjustment);
	}
} else {
	var dropdowncolor = GetCanvas2();
	var dropdowncolor = ColorStyleAdjust(dropdowncolor);

	while ( ( isSuitableColorFormControls(dropdowncolor, content_color) ) && (dropdowncolor !== lightnessR)  ) {
		var dropdowncolor= ColorAdjust(dropdowncolor,true);
	}


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
var dropdowncolorH = ColorHover(dropdowncolor,content_color);

/** Page text color **/
var content_text= GetCanvasText();

	// Liatch Quirk
		var content_text = ColorStyleAdjust(content_text);
	
		while ( ( !(isSuitableColorText(content_text, content_color)) ) && (content_text !== lightness) ) {
			var content_text= ColorAdjust(content_text);
		}

var content_text1 = ColorHover(content_text);

/** 2nd Page text color **/
var content2_text= GetCanvasText2();


// Liatch Quirk
var content2_text = ColorStyleAdjust(content2_text);

	
while ( ( !(isSuitableColorText(content2_text, dropdowncolor)) ) && (content2_text !== lightness3) ) {
	var content2_text= ColorAdjust3(content2_text,dropdowncolor);
}


var content2_text1 = ColorHover(content2_text,content_text);


/** Caret Color **/
/* Set Vars */
var caret_color = GetActiveTitle();
// Liatch Quirk
		var caret_color = ColorStyleAdjust(caret_color);
		while ( ( !(isSuitableColorFormControls(caret_color, content_color)) ) && (caret_color !== lightness)  ) {
			var caret_color= ColorAdjust(caret_color);
		}



	var lightcaret = isLightColor(caret_color);
	if (lightcaret) {
		var lightnessAT = '#000000';
	} else {
		var lightnessAT = '#ffffff';
	}

window.MW18ATColor = caret_color


var caretcolor1 = ColorHover(caret_color);

/** Caret text color **/


var carettext_color= GetActiveTitleText();

	// Liatch Quirk
if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-text-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
		var carettext_color = ColorStyleAdjust(carettext_color);
}
			while ( ( !(isSuitableColorText(carettext_color, caret_color)) ) && (carettext_color !== lightnessAT)  ) {
				var carettext_color= ColorAdjust3(carettext_color,caret_color);
			}


var carettextcolor1 = ColorHover(carettext_color);


/** Caret 2 Color **/
/* Set Vars */
var caret2_color = GetInactiveTitle();
// Liatch Quirk
if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
		var caret2_color = ColorStyleAdjust(caret2_color);
}
			while ( ( isSuitableColorFormControls(caret2_color, content_color) ) && (caret2_color !== lightnessR)  ) {
			var caret2_color= ColorAdjust(caret2_color,true);
		}


	var lightcaret2 = isLightColor(caret2_color);
	if (lightcaret2) {
		var lightnessIT = '#000000';
	} else {
		var lightnessIT = '#ffffff';
	}

window.MW18ITColor = caret2_color



var caret2color1 = ColorHover(caret2_color);


/** Caret 2 text color **/


var caret2text_color= GetInactiveTitleText();

	// Liatch Quirk
if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-text-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
		var caret2text_color = ColorStyleAdjust(caret2text_color);
}

			while ( ( !(isSuitableColorFormControls(caret2text_color, caret2_color)) ) && (caret2text_color !== lightnessIT)  ) {
				var caret2text_color= ColorAdjust3(caret2text_color,caret2_color);
			}


var caret2textcolor1 = ColorHover(caret2text_color);


/** Button Color **/
/* Set Vars */

var button_color = GetHighlight();

// Liatch Quirk
	var button_color = ColorStyleAdjust(button_color);
		while ( ( !(isSuitableColorFormControls(button_color, content_color)) ) && (button_color !== lightness)  ) {
			var button_color= ColorAdjust(button_color);
		}

	var lightbutton = isLightColor(button_color);
	if (lightbutton) {
		var lightnessBTN = '#000000';
	} else {
		var lightnessBTN = '#ffffff';
	}

window.MW18HLColor = button_color



var buttoncolor1 = ColorHover(button_color);


/** Button text color **/


var buttontext_color= GetHighlightText();

	// Liatch Quirk
if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-text-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
		var buttontext_color = ColorStyleAdjust(buttontext_color);
}
			while ( ( !(isSuitableColorText(buttontext_color, button_color)) ) && (buttontext_color !== lightnessBTN)  ) {
				var buttontext_color= ColorAdjust3(buttontext_color,button_color);
			}


var buttontextcolor1 = ColorHover(buttontext_color);


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
	var link_color = ColorStyleAdjust(link_color);
	var link2_color = link_color;
	var link3_color = link_color;
	
		while ( ( !(isSuitableColorText(link_color, content_color)) ) && (link_color !== lightness) ) {
			var link_color= ColorAdjust(link_color);
		}
		while ( ( !(isSuitableColorText(link2_color, dropdowncolor)) ) && (link2_color !== lightness3) ) {
			var link2_color= ColorAdjust3(link2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorText(link3_color, lunacolor)) ) && (link3_color !== lightness4) ) {
			var link3_color= ColorAdjust3(link3_color,lunacolor);
		}


var linkcolor1 = ColorHover(link_color,content_color);
var link2color1 = ColorHover(link2_color,content_color);
var link3color1 = ColorHover(link3_color,lunacolor);


/** Visited Link Color **/
/* Set Vars */
var vlink_color = GetVisitedHyperlink();

// Liatch Quirk
	var vlink_color = ColorStyleAdjust(vlink_color);
	var vlink2_color = vlink_color;
	var vlink3_color = vlink_color;
	
		while ( ( !(isSuitableColorText(vlink_color, content_color)) ) && (vlink_color !== lightness) ) {
			var vlink_color= ColorAdjust(vlink_color);
		}
		while ( ( !(isSuitableColorText(vlink2_color, dropdowncolor)) ) && (vlink2_color !== lightness3) ) {
			var vlink2_color= ColorAdjust3(vlink2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorText(vlink3_color, lunacolor)) ) && (vlink3_color !== lightness4) ) {
			var vlink3_color= ColorAdjust3(vlink3_color,lunacolor);
		}


var vlinkcolor1 = ColorHover(vlink_color,content_color);
var vlink2color1 = ColorHover(vlink2_color,content_color);
var vlink3color1 = ColorHover(vlink3_color,lunacolor);


/** Active Text/Link Color **/
/* Set Vars */
var alink_color = GetActiveText();

// Liatch Quirk
	var alink_color = ColorStyleAdjust(alink_color);
	var alink2_color = alink_color;
	var alink3_color = alink_color;
	
		while ( ( !(isSuitableColorText(alink_color, content_color)) ) && (alink_color !== lightness) ) {
			var alink_color= ColorAdjust(alink_color);
		}
		while ( ( !(isSuitableColorText(alink2_color, dropdowncolor)) ) && (alink2_color !== lightness3) ) {
			var alink2_color= ColorAdjust3(alink2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorText(alink3_color, lunacolor)) ) && (alink3_color !== lightness4) ) {
			var alink3_color= ColorAdjust3(alink3_color,lunacolor);
		}


var alinkcolor1 = ColorHover(alink_color,content_color);
var alink2color1 = ColorHover(alink2_color,content_color);
var alink3color1 = ColorHover(alink3_color,lunacolor);


/** Content Border **/
/* Set Vars */

var border_color =	dropdowncolor2;

if ((getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-text-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
	// Liatch Quirk

		var border_color = ColorStyleAdjust(border_color);
}

		while ( ( !(isSuitableColorFormControls(border_color, content_color)) ) && (border_color !== lightness)  ) {
			var border_color= ColorAdjust(border_color);
		}




var bordercolor1 = ColorHover(border_color);


/** Body Bg **/
/* Set Vars */

var head_color =	GetDesktop();



// Liatch Quirk
		var head_color = ColorStyleAdjust(head_color);
	var lighthead = isLightColor(head_color);
	if (lighthead) {
		var lightness2 = '#000000';
	} else {
		var lightness2 = '#ffffff';
	}

window.MW18BgColor = head_color


var headcolor1 = ColorHover(head_color,content_color);

/** Community Header text color **/

var img = GetDesktopImage();

var headertext_color= GetDesktopText();

	// Liatch Quirk
		var headertext_color = ColorStyleAdjust(headertext_color);
	
		while ( ( !(isSuitableColorText(headertext_color, head_color)) ) && (headertext_color !== lightness2)  ) {
			var headertext_color= ColorAdjust2(headertext_color);
		}



var headertextcolor1 = ColorHover(headertext_color,content_text);


/* Generic Colors */
var generic = BestAlertColor(window.MW18PageColor);
var generic2 = BestAlertColor(dropdowncolor);


/** Alert Color **/
/* Set Vars */
var alert_color = generic[0];
var alert2_color = generic2[0];
var alertcolor1 = ColorHover(alert_color,content_color);
var alert2color1 = ColorHover(alert2_color,content_color);
var alertcolor2 = ColorHover(alert_color);


/** Pause Color **/
/* Set Vars */
var pause_color = generic[1];
var pause2_color = generic2[1];
var pausecolor1 = ColorHover(pause_color,content_color);
var pause2color1 = ColorHover(pause2_color,content_color);
var pausecolor2 = ColorHover(pause_color);

/** Warning Color **/
/* Set Vars */
var warning_color = generic[2];
var warning2_color = generic2[2];
var warningcolor1 = ColorHover(warning_color,content_color);
var warning2color1 = ColorHover(warning2_color,content_color);
var warningcolor2 = ColorHover(warning_color);

/** Success Color **/
/* Set Vars */
var success_color = generic[3];
var success2_color = generic2[3];
var successcolor1 = ColorHover(success_color,content_color);
var success2color1 = ColorHover(success2_color,content_color);
var successcolor2 = ColorHover(success_color);

/** Progress Color **/
/* Set Vars */
var progress_color = generic[4];
var progress2_color = generic2[4];
var progresscolor1 = ColorHover(progress_color,content_color);
var progress2color1 = ColorHover(progress2_color,content_color);
var progresscolor2 = ColorHover(progress_color);

/** Message Color **/
/* Set Vars */
var message_color = generic[5];
var message2_color = generic2[5];
var messagecolor1 = ColorHover(message_color,content_color);
var message2color1 = ColorHover(message2_color,content_color);
var messagecolor2 = ColorHover(message_color);

var imgfilter = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-filter");

if (imgfilter == 'none') {
	var imgfilter = 'opacity(1)';
}

aopacity = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-acryllic-opacity");

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
		var vlink_gradient = GetGradientVariable(content_color,'visited-hyperlink');
		var alink_gradient = GetGradientVariable(content_color,'active-text');

		// Inverted Dledlen
		var content2_text_gradient = GetGradientVariable(content_text,'canvas-text-secondary');
		var headertext_gradient = GetGradientVariable(content_text,'desktop-text')[0]
var content_color_gradient = GetGradientVariable(content_color,'canvas');
var content_text_gradient = GetGradientVariable(content_text,'canvas-text');
var button_gradient = GetGradientVariable(button_color,'highlight');
var buttontext_gradient = GetGradientVariable(buttontext_color,'highlight-text');
var border_gradient = GetGradientVariable(border_color,'inactive-text');
var caret_gradient = GetGradientVariable(caret_color,'active-title');
var carettext_gradient = GetGradientVariable(caret_color,'active-title-text');
var caret2_gradient = GetGradientVariable(caret2_color,'inactive-title');
var caret2text_gradient = GetGradientVariable(caret2text_color,'inactive-title-text');

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
var buttontext_fg = GetForegroundVariables(buttontext_color);
var link_fg = GetForegroundVariables(link_color);
var vlink_fg = GetForegroundVariables(vlink_color);
var alink_fg = GetForegroundVariables(alink_color);
var border_fg = GetForegroundVariables(border_color);
var head_fg = GetForegroundVariables(head_color);
var headertext_fg = GetForegroundVariables(headertext_color);
var caret_fg = GetForegroundVariables(caret_color);
var carettext_fg = GetForegroundVariables(carettext_color);
var caret2_fg = GetForegroundVariables(caret2_color);
var caret2text_fg = GetForegroundVariables(caret2text_color);

	wordfilter2 = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-hover")
	if ( wordfilter2 == "" ) {
		wordfilter2 == 'initial'
	}
	
	var tdbg = ColorMix(dropdowncolor,"#ffffff",c3dlight);
	var tdbg2 = ColorMix(dropdowncolor,"#000000",c3ddark);

	micabg = [ColorMix(dropdowncolor,content_color,0.5),'color'];
	
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
						  "--visited-hyperlink-alternative-foreground-color:" + vlink_fg[4] + ";\n" + 
						  "--visited-hyperlink-alternative-foreground-color-hover:" + vlink_fg[6] + ";\n" + 
						  "--visited-hyperlink-alternative-foreground-color-rgb:" + vlink_fg[5] + ";\n" +
						  "--visited-hyperlink-alternative-foreground-color-hover-rgb:" + vlink_fg[7] + ";\n" +
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
						  "--active-text-alternative-foreground-color:" + alink_fg[4] + ";\n" + 
						  "--active-text-alternative-foreground-color-hover:" + alink_fg[6] + ";\n" + 
						  "--active-text-alternative-foreground-color-rgb:" + alink_fg[5] + ";\n" +
						  "--active-text-alternative-foreground-color-hover-rgb:" + alink_fg[7] + ";\n" +
						  "--canvas-text-alternative-foreground-color:" + content_text_fg[4] + ";\n" + 
						  "--canvas-text-alternative-foreground-color-hover:" + content_text_fg[6] + ";\n" + 
						  "--canvas-text-alternative-foreground-color-rgb:" + content_text_fg[5] + ";\n" +
						  "--canvas-text-alternative-foreground-color-hover-rgb:" + content_text_fg[7] + ";\n" +
						  "--highlight-alternative-foreground-color:" + button_fg[4] + ";\n" + 
						  "--highlight-alternative-foreground-color-hover:" + button_fg[6] + ";\n" + 
						  "--highlight-alternative-foreground-color-rgb:" + button_fg[5] + ";\n" +
						  "--highlight-alternative-foreground-color-hover-rgb:" + button_fg[7] + ";\n" +
						  "--highlight-text-alternative-foreground-color:" + buttontext_fg[4] + ";\n" + 
						  "--highlight-text-alternative-foreground-color-hover:" + buttontext_fg[6] + ";\n" + 
						  "--highlight-text-alternative-foreground-color-rgb:" + buttontext_fg[5] + ";\n" +
						  "--highlight-text-alternative-foreground-color-hover-rgb:" + buttontext_fg[7] + ";\n" +
						  "--active-title-alternative-foreground-color:" + caret_fg[4] + ";\n" + 
						  "--active-title-alternative-foreground-color-hover:" + caret_fg[6] + ";\n" + 
						  "--active-title-alternative-foreground-color-rgb:" + caret_fg[5] + ";\n" +
						  "--active-title-alternative-foreground-color-hover-rgb:" + caret_fg[7] + ";\n" +
						  "--active-title-text-alternative-foreground-color:" + carettext_fg[4] + ";\n" + 
						  "--active-title-text-alternative-foreground-color-hover:" + carettext_fg[6] + ";\n" + 
						  "--active-title-text-alternative-foreground-color-rgb:" + carettext_fg[5] + ";\n" +
						  "--active-title-text-alternative-foreground-color-hover-rgb:" + carettext_fg[7] + ";\n" +
						  "--inactive-title-alternative-foreground-color:" + caret2_fg[4] + ";\n" + 
						  "--inactive-title-alternative-foreground-color-hover:" + caret2_fg[6] + ";\n" + 
						  "--inactive-title-alternative-foreground-color-rgb:" + caret2_fg[5] + ";\n" +
						  "--inactive-title-alternative-foreground-color-hover-rgb:" + caret2_fg[7] + ";\n" +
						  "--inactive-title-text-alternative-foreground-color:" + caret2text_fg[4] + ";\n" + 
						  "--inactive-title-text-alternative-foreground-color-hover:" + caret2text_fg[6] + ";\n" + 
						  "--inactive-title-text-alternative-foreground-color-rgb:" + caret2text_fg[5] + ";\n" +
						  "--inactive-title-text-alternative-foreground-color-hover-rgb:" + caret2text_fg[7] + ";\n" +
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
						  "--canvas-secondary-background-color:" + dropdowncolor + ";\n" + 
						  "--canvas-secondary-background-color-hover:" + dropdowncolorH + ";\n" + 
						  "--canvas-secondary-gradient-color:" + dropdowncolor_gradient[0] + ";\n" +
						  "--canvas-secondary-gradient-color-hover:" + dropdowncolor_gradient[1] + ";\n" +
						  "--canvas-secondary-foreground-color:" + dropdowncolor_fg[0] + ";\n" +
						  "--canvas-secondary-foreground-color-hover:" +  dropdowncolor_fg[1] + ";\n" + 
						  "--canvas-secondary-foreground-color-inverted:" + GetForegroundVariables(dropdowncolorH)[0] + ";\n" +
						  "--canvas-3d-background-color:" + tdbg + ";\n" +
						  "--canvas-3d-background-color-dark:" + tdbg2 + ";\n" +
						  "--canvas-background-color:" + content_color + ";\n" +
						  "--canvas-background-color-hover:" + content_color2 + ";\n" +
						  "--canvas-gradient-color:" + content_color_gradient[0] + ";\n" +
						  "--canvas-gradient-color-hover:" + content_color_gradient[1] + ";\n" +
						  "--canvas-foreground-color:" + content_color_fg[0] + ";\n" +
						  "--canvas-foreground-color-hover:" +  content_color_fg[1] + ";\n" + 
						  "--canvas-foreground-color-inverted:" + GetForegroundVariables(content_color2)[0] + ";\n" +
						  "--canvas-secondary-background-color-rgb:" + ColorRGB(dropdowncolor) + ";\n" + 
						  "--canvas-secondary-background-color-hover-rgb:" + ColorRGB(dropdowncolorH) + ";\n" +
						  "--canvas-secondary-foreground-color-rgb:" + dropdowncolor_fg[2] + ";\n" +
						  "--canvas-secondary-foreground-color-hover-rgb:" +  dropdowncolor_fg[3] + ";\n" + 
						  "--canvas-background-color-rgb:" + ColorRGB( content_color ) + ";\n" +
						  "--canvas-background-color-hover-rgb:" + ColorRGB(content_color2) + ";\n" +
						  "--canvas-foreground-color-rgb:" +  content_color_fg[2] + ";\n" +
						  "--canvas-foreground-color-hover-rgb:" +  content_color_fg[3] + ";\n" + 
						  "--canvas-text-background-color:" + content_text + ";\n" +
						  "--canvas-text-background-color-hover:" + content_text1 + ";\n" +
						  "--canvas-text-gradient-color:" + content_text_gradient[0] + ";\n" +
						  "--canvas-text-gradient-color-hover:" + content_text_gradient[1] + ";\n" +
						  "--canvas-text-foreground-color:" + content_text_fg[0] + ";\n" +
						  "--canvas-text-foreground-color-hover:" + content_text_fg[1] + ";\n" +
						  "--canvas-text-foreground-color-inverted:" + GetForegroundVariables(content_text1)[0] + ";\n" +
						  "--canvas-text-background-color-rgb:" + ColorRGB( content_text ) + ";\n" +
						  "--canvas-text-background-color-hover-rgb:" + ColorRGB(content_text1) + ";\n" +
						  "--canvas-text-foreground-color-rgb:" + content_text_fg[2] + ";\n" +
						  "--canvas-text-foreground-color-hover-rgb:" + content_text_fg[3] + ";\n" +
						  "--canvas-text-secondary-background-color:" + content2_text + ";\n" +
						  "--canvas-text-secondary-background-color-hover:" + content2_text1 + ";\n" +
						  "--canvas-text-secondary-gradient-color:" + content2_text_gradient[0] + ";\n" +
						  "--canvas-text-secondary-gradient-color-hover:" + content2_text_gradient[1] + ";\n" +
						  "--canvas-text-secondary-gradient-color:" + content2_text_gradient[0] + ";\n" +
						  "--canvas-text-secondary-gradient-color-hover:" + content2_text_gradient[1] + ";\n" +
						  "--canvas-text-secondary-foreground-color:" + content2_text_fg[0] + ";\n" +
						  "--canvas-text-secondary-foreground-color-hover:" + content2_text_fg[1] + ";\n" +
						  "--canvas-text-secondary-foreground-color-inverted:" + GetForegroundVariables(content2_text1)[0] + ";\n" +
						  "--canvas-text-secondary-background-color-rgb:" + ColorRGB( content2_text ) + ";\n" +
						  "--canvas-text-secondary-background-color-hover-rgb:" + ColorRGB(content2_text1) + ";\n" +
						  "--canvas-text-secondary-foreground-color-rgb:" + content2_text_fg[2] + ";\n" +
						  "--canvas-text-secondary-foreground-color-hover-rgb:" + content2_text_fg[3] + ";\n" +
						  "--highlight-background-color:" + button_color + ";\n" +
						  "--highlight-background-color-hover:" + buttoncolor1 + ";\n" +
						  "--highlight-gradient-color:" + button_gradient[0] + ";\n" +
						  "--highlight-gradient-color-hover:" + button_gradient[1] + ";\n" +
						  "--highlight-foreground-color:" + button_fg[0] + ";\n" +
						  "--highlight-foreground-color-hover:" + button_fg[1] + ";\n" +
						  "--highlight-foreground-color-inverted:" + GetForegroundVariables(buttoncolor1)[0] + ";\n" +
						  "--highlight-background-color-rgb:" + ColorRGB(button_color) + ";\n" +
						  "--highlight-background-color-hover-rgb:" + ColorRGB(buttoncolor1) + ";\n" +
						  "--highlight-foreground-color-rgb:" + button_fg[2] + ";\n" +
						  "--highlight-foreground-color-hover-rgb:" + button_fg[3] + ";\n" +
						  "--highlight-text-background-color:" + buttontext_color + ";\n" +
						  "--highlight-text-background-color-hover:" + buttontextcolor1 + ";\n" +
						  "--highlight-text-gradient-color:" + buttontext_gradient[0] + ";\n" +
						  "--highlight-text-gradient-color-hover:" + buttontext_gradient[1] + ";\n" +
						  "--highlight-text-foreground-color:" + buttontext_fg[0] + ";\n" +
						  "--highlight-text-foreground-color-hover:" + buttontext_fg[1] + ";\n" +
						  "--highlight-text-foreground-color-inverted:" + GetForegroundVariables(buttontextcolor1)[0] + ";\n" +
						  "--highlight-text-background-color-rgb:" + ColorRGB(buttontext_color) + ";\n" +
						  "--highlight-text-background-color-hover-rgb:" + ColorRGB(buttontextcolor1) + ";\n" +
						  "--highlight-text-foreground-color-rgb:" + buttontext_fg[2] + ";\n" +
						  "--highlight-text-foreground-color-hover-rgb:" + buttontext_fg[3] + ";\n" +
						  "--hyperlink-background-color:" + link_color + ";\n" +
						  "--hyperlink-background-color-hover:" + linkcolor1 + ";\n" +
						  "--hyperlink-gradient-color:" + link_gradient[0] + ";\n" +
						  "--hyperlink-gradient-color-hover:" + link_gradient[1] + ";\n" +
						  "--hyperlink-foreground-color:" + link_fg[0] + ";\n" +
						  "--hyperlink-foreground-color-hover:" + link_fg[1] + ";\n" +
						  "--hyperlink-foreground-color-inverted:" + GetForegroundVariables(linkcolor1)[0] + ";\n" +
						  "--hyperlink-background-color-rgb:" + ColorRGB(link_color) + ";\n" +
						  "--hyperlink-background-color-hover-rgb:" + ColorRGB(linkcolor1) + ";\n" +
						  "--hyperlink-foreground-color-rgb:" + link_fg[2] + ";\n" +
						  "--hyperlink-foreground-color-hover-rgb:" + link_fg[3] + ";\n" +
						  "--hyperlink-secondary-background-color:" + link2_color + ";\n" +
						  "--hyperlink-secondary-background-color-hover:" + link2color1 + ";\n" +
						  "--hyperlink-secondary-background-color-rgb:" + ColorRGB(link2_color) + ";\n" +
						  "--hyperlink-tertiary-background-color:" + link3_color + ";\n" +
						  "--hyperlink-tertiary-background-color-hover:" + link3color1 + ";\n" +
						  "--hyperlink-tertiary-background-color-rgb:" + ColorRGB(link3_color) + ";\n" +
						  "--visited-hyperlink-background-color:" + vlink_color + ";\n" +
						  "--visited-hyperlink-background-color-hover:" + vlinkcolor1 + ";\n" +
						  "--visited-hyperlink-gradient-color:" + vlink_gradient[0] + ";\n" +
						  "--visited-hyperlink-gradient-color-hover:" + vlink_gradient[1] + ";\n" +
						  "--visited-hyperlink-foreground-color:" + vlink_fg[0] + ";\n" +
						  "--visited-hyperlink-foreground-color-hover:" + vlink_fg[1] + ";\n" +
						  "--visited-hyperlink-foreground-color-inverted:" + GetForegroundVariables(vlinkcolor1)[0] + ";\n" +
						  "--visited-hyperlink-background-color-rgb:" + ColorRGB(vlink_color) + ";\n" +
						  "--visited-hyperlink-background-color-hover-rgb:" + ColorRGB(vlinkcolor1) + ";\n" +
						  "--visited-hyperlink-foreground-color-rgb:" + vlink_fg[2] + ";\n" +
						  "--visited-hyperlink-foreground-color-hover-rgb:" + vlink_fg[3] + ";\n" +
						  "--visited-hyperlink-secondary-background-color:" + vlink2_color + ";\n" +
						  "--visited-hyperlink-secondary-background-color-hover:" + vlink2color1 + ";\n" +
						  "--visited-hyperlink-secondary-background-color-rgb:" + ColorRGB(vlink2_color) + ";\n" +
						  "--visited-hyperlink-tertiary-background-color:" + vlink3_color + ";\n" +
						  "--visited-hyperlink-tertiary-background-color-hover:" + vlink3color1 + ";\n" +
						  "--visited-hyperlink-tertiary-background-color-rgb:" + ColorRGB(vlink3_color) + ";\n" +
						  "--active-text-background-color:" + alink_color + ";\n" +
						  "--active-text-background-color-hover:" + alinkcolor1 + ";\n" +
						  "--active-text-gradient-color:" + alink_gradient[0] + ";\n" +
						  "--active-text-gradient-color-hover:" + alink_gradient[1] + ";\n" +
						  "--active-text-foreground-color:" + alink_fg[0] + ";\n" +
						  "--active-text-foreground-color-hover:" + alink_fg[1] + ";\n" +
						  "--active-text-foreground-color-inverted:" + GetForegroundVariables(alinkcolor1)[0] + ";\n" +
						  "--active-text-background-color-rgb:" + ColorRGB(alink_color) + ";\n" +
						  "--active-text-background-color-hover-rgb:" + ColorRGB(alinkcolor1) + ";\n" +
						  "--active-text-foreground-color-rgb:" + alink_fg[2] + ";\n" +
						  "--active-text-foreground-color-hover-rgb:" + alink_fg[3] + ";\n" +
						  "--active-text-secondary-background-color:" + alink2_color + ";\n" +
						  "--active-text-secondary-background-color-hover:" + alink2color1 + ";\n" +
						  "--active-text-secondary-background-color-rgb:" + ColorRGB(alink2_color) + ";\n" +
						  "--active-text-tertiary-background-color:" + alink3_color + ";\n" +
						  "--active-text-tertiary-background-color-hover:" + alink3color1 + ";\n" +
						  "--active-text-tertiary-background-color-rgb:" + ColorRGB(alink3_color) + ";\n" +
						  "--inactive-text-background-color:" + border_color + ";\n" +
						  "--inactive-text-background-color-hover:" + bordercolor1 + ";\n" +
						  "--inactive-text-gradient-color:" + border_gradient[0] + ";\n" +
						  "--inactive-text-gradient-color-hover:" + border_gradient[1] + ";\n" +
						  "--inactive-text-foreground-color:" + border_fg[0] + ";\n" +
						  "--inactive-text-foreground-color-hover:" + border_fg[1] + ";\n" +
						  "--inactive-text-foreground-color-inverted:" + GetForegroundVariables(bordercolor1)[0] + ";\n" +
						  "--inactive-text-background-color-rgb:" + ColorRGB(border_color) + ";\n" +
						  "--inactive-text-background-color-hover-rgb:" + ColorRGB(bordercolor1) + ";\n" +
						  "--inactive-text-foreground-color-rgb:" + border_fg[2] + ";\n" +
						  "--inactive-text-foreground-color-hover-rgb:" + border_fg[3] + ";\n" +
						  "--desktop-background-color:" + head_color + ";\n" +
						  "--desktop-background-color-hover:" + headcolor1 + ";\n" +
						  "--desktop-gradient-color:" + head_gradient[0] + ";\n" +
						  "--desktop-gradient-color-hover:" + head_gradient[1] + ";\n" +
						  "--desktop-foreground-color:" + head_fg[0] + ";\n" +
						  "--desktop-foreground-color-hover:" + head_fg[1] + ";\n" +
						  "--desktop-foreground-color-inverted:" + GetForegroundVariables(headcolor1)[0] + ";\n" +
						  "--desktop-background-color-rgb:" + ColorRGB(head_color) + ";\n" +
						  "--desktop-background-color-hover-rgb:" + ColorRGB(headcolor1) + ";\n" +
						  "--desktop-foreground-color-rgb:" + head_fg[2] + ";\n" +
						  "--desktop-foreground-color-hover-rgb:" + head_fg[3] + ";\n" +
						  "--desktop-text-background-color:" + headertext_color + ";\n" +
						  "--desktop-text-background-color-hover:" + headertextcolor1 + ";\n" +
						  "--desktop-text-gradient-color:" + headertext_gradient[0] + ";\n" +
						  "--desktop-text-gradient-color-hover:" + headertext_gradient[1] + ";\n" +
						  "--desktop-text-foreground-color:" + headertext_fg[0] + ";\n" +
						  "--desktop-text-foreground-color-hover:" + headertext_fg[1] + ";\n" +
						  "--desktop-text-foreground-color-inverted:" + GetForegroundVariables(headertextcolor1)[0] + ";\n" +
						  "--desktop-text-background-color-rgb:" + ColorRGB( headertext_color ) + ";\n" +
						  "--desktop-text-background-color-hover-rgb:" + ColorRGB(headertextcolor1) + ";\n" +
						  "--desktop-text-foreground-color-rgb:" + headertext_fg[2] + ";\n" +
						  "--desktop-text-foreground-color-hover-rgb:" + headertext_fg[2] + ";\n" +
						  "--active-title-background-color:" + caret_color + ";\n" +
						  "--active-title-background-color-hover:" + caretcolor1 + ";\n" +
						  "--active-title-gradient-color:" + caret_gradient[0] + ";\n" +
						  "--active-title-gradient-color-hover:" + caret_gradient[1] + ";\n" +
						  "--active-title-foreground-color:" + caret_fg[0] + ";\n" +
						  "--active-title-foreground-color-hover:" + caret_fg[1] + ";\n" +
						  "--active-title-foreground-color-inverted:" + GetForegroundVariables(caretcolor1)[0] + ";\n" +
						  "--active-title-background-color-rgb:" + ColorRGB( caret_color ) + ";\n" +
						  "--active-title-background-color-hover-rgb:" + ColorRGB(caretcolor1) + ";\n" +
						  "--active-title-foreground-color-rgb:" + caret_fg[2] + ";\n" +
						  "--active-title-foreground-color-hover-rgb:" + caret_fg[3] + ";\n" +
						  "--active-title-text-background-color:" + carettext_color + ";\n" +
						  "--active-title-text-background-color-hover:" + carettextcolor1 + ";\n" +
						  "--active-title-text-gradient-color:" + carettext_gradient[0] + ";\n" +
						  "--active-title-text-gradient-color-hover:" + carettext_gradient[1] + ";\n" +
						  "--active-title-text-foreground-color:" + carettext_fg[0] + ";\n" +
						  "--active-title-text-foreground-color-hover:" + carettext_fg[1] + ";\n" +
						  "--active-title-text-foreground-color-inverted:" + GetForegroundVariables(carettextcolor1)[0] + ";\n" +
						  "--active-title-text-background-color-rgb:" + ColorRGB( carettext_color ) + ";\n" +
						  "--active-title-text-background-color-hover-rgb:" + ColorRGB( carettextcolor1 ) + ";\n" +
						  "--active-title-text-foreground-color-rgb:" + carettext_fg[2] + ";\n" +
						  "--active-title-text-foreground-color-hover-rgb:" + carettext_fg[3] + ";\n" +
						  "--inactive-title-background-color:" + caret2_color + ";\n" +
						  "--inactive-title-background-color-hover:" + caret2color1 + ";\n" +
						  "--inactive-title-gradient-color:" + caret2_gradient[0] + ";\n" +
						  "--inactive-title-gradient-color-hover:" + caret2_gradient[1] + ";\n" +
						  "--inactive-title-foreground-color:" + caret2_fg[0] + ";\n" +
						  "--inactive-title-foreground-color-hover:" + caret2_fg[1] + ";\n" +
						  "--inactive-title-foreground-color-inverted:" + GetForegroundVariables(caret2color1)[0] + ";\n" +
						  "--inactive-title-background-color-rgb:" + ColorRGB( caret2_color ) + ";\n" +
						  "--inactive-title-background-color-hover-rgb:" + ColorRGB(caret2color1) + ";\n" +
						  "--inactive-title-foreground-color-rgb:" + caret2_fg[2] + ";\n" +
						  "--inactive-title-foreground-color-hover-rgb:" + caret2_fg[3] + ";\n" +
						  "--inactive-title-text-background-color:" + caret2text_color + ";\n" +
						  "--inactive-title-text-background-color-hover:" + caret2textcolor1 + ";\n" +
						  "--inactive-title-text-gradient-color:" + caret2text_gradient[0] + ";\n" +
						  "--inactive-title-text-gradient-color-hover:" + caret2text_gradient[1] + ";\n" +
						  "--inactive-title-text-foreground-color:" + caret2text_fg[0] + ";\n" +
						  "--inactive-title-text-foreground-color-hover:" + caret2text_fg[1] + ";\n" +
						  "--inactive-title-text-foreground-color-inverted:" + GetForegroundVariables(caret2textcolor1)[0] + ";\n" +
						  "--inactive-title-text-background-color-rgb:" + ColorRGB( caret2text_color ) + ";\n" +
						  "--inactive-title-text-background-color-hover-rgb:" + ColorRGB( caret2textcolor1 ) + ";\n" +
						  "--inactive-title-text-foreground-color-rgb:" + caret2text_fg[2] + ";\n" +
						  "--inactive-title-text-foreground-color-hover-rgb:" + caret2text_fg[3] + ";\n" +
						  "--alert-background-color:" + alert_color + "!important;\n" +
						  "--alert-background-color-hover:" + alertcolor1 + "!important;\n" +
						  "--alert-background-color-hover-2:" + alertcolor2 + "!important;\n" +
						  "--alert-gradient-color:" + alert_gradient[0] + "!important;\n" +
						  "--alert-gradient-color-hover:" + alert_gradient[1] + "!important;\n" +
						  "--alert-foreground-color:" + alert_fg[0] + "!important;\n" +
						  "--alert-foreground-color-hover:" + alert_fg[1] + "!important;\n" +
						  "--alert-foreground-color-inverted:" + GetForegroundVariables(alertcolor1)[0] + "!important;\n" +
						  "--alert-background-color-rgb:" + ColorRGB(alert_color) + "!important;\n" +
						  "--alert-foreground-color-rgb:" + alert_fg[2] + "!important;\n" +
						  "--alert-foreground-color-hover-rgb:" + alert_fg[3] + "!important;\n" +
						  "--alert-secondary-background-color:" + alert2_color + "!important;\n" +
						  "--alert-secondary-background-color-hover:" + alert2color1 + "!important;\n" +
						  "--alert-secondary-background-color-rgb:" + ColorRGB(alert2_color) + "!important;\n" +
						  "--pause-background-color:" + pause_color + "!important;\n" +
						  "--pause-background-color-hover:" + pausecolor1 + "!important;\n" +
						  "--pause-background-color-hover-2:" + pausecolor2 + "!important;\n" +
						  "--pause-gradient-color:" + pause_gradient[0] + "!important;\n" +
						  "--pause-gradient-color-hover:" + pause_gradient[1] + "!important;\n" +
						  "--pause-foreground-color:" + pause_fg[0] + "!important;\n" +
						  "--pause-foreground-color-hover:" + pause_fg[1] + "!important;\n" +
						  "--pause-foreground-color-inverted:" + GetForegroundVariables(pausecolor1)[0] + "!important;\n" +
						  "--pause-background-color-rgb:" + ColorRGB(pause_color) + "!important;\n" +
						  "--pause-foreground-color-rgb:" + pause_fg[2] + "!important;\n" +
						  "--pause-foreground-color-hover-rgb:" + pause_fg[3] + "!important;\n" +
						  "--pause-secondary-background-color:" + pause2_color + "!important;\n" +
						  "--pause-secondary-background-color-hover:" + pause2color1 + "!important;\n" +
						  "--pause-secondary-background-color-rgb:" + ColorRGB(pause2_color) + "!important;\n" +
						  "--warning-background-color:" + warning_color + "!important;\n" +
						  "--warning-background-color-hover:" + warningcolor1 + "!important;\n" +
						  "--warning-background-color-hover-2:" + warningcolor2 + "!important;\n" +
						  "--warning-gradient-color:" + warning_gradient[0] + "!important;\n" +
						  "--warning-gradient-color-hover:" + warning_gradient[1] + "!important;\n" +
						  "--warning-foreground-color:" + warning_fg[0] + "!important;\n" +
						  "--warning-foreground-color-hover:" + warning_fg[1] + "!important;\n" +
						  "--warning-foreground-color-inverted:" + GetForegroundVariables(warningcolor1)[0] + "!important;\n" +
						  "--warning-background-color-rgb:" + ColorRGB(warning_color) + "!important;\n" +
						  "--warning-foreground-color-rgb:" + warning_fg[2] + "!important;\n" +
						  "--warning-foreground-color-hover-rgb:" + warning_fg[3] + "!important;\n" +
						  "--warning-secondary-background-color:" + warning2_color + "!important;\n" +
						  "--warning-secondary-background-color-hover:" + warning2color1 + "!important;\n" +
						  "--warning-secondary-background-color-rgb:" + ColorRGB(warning2_color) + "!important;\n" +
						  "--success-background-color:" + success_color + "!important;\n" +
						  "--success-background-color-hover:" + successcolor1 + "!important;\n" +
						  "--success-background-color-hover-2:" + successcolor2 + "!important;\n" +
						  "--success-gradient-color:" + success_gradient[0] + "!important;\n" +
						  "--success-gradient-color-hover:" + success_gradient[1] + "!important;\n" +
						  "--success-foreground-color:" + success_fg[0] + "!important;\n" +
						  "--success-foreground-color-hover:" + success_fg[1] + "!important;\n" +
						  "--success-foreground-color-inverted:" + GetForegroundVariables(successcolor1)[0] + "!important;\n" +
						  "--success-background-color-rgb:" + ColorRGB(success_color) + "!important;\n" +
						  "--success-foreground-color-rgb:" + success_fg[2] + "!important;\n" +
						  "--success-foreground-color-hover-rgb:" + success_fg[3] + "!important;\n" +
						  "--success-secondary-background-color:" + success2_color + "!important;\n" +
						  "--success-secondary-background-color-hover:" + success2color1 + "!important;\n" +
						  "--success-secondary-background-color-rgb:" + ColorRGB(success2_color) + "!important;\n" +
						  "--progress-background-color:" + progress_color + "!important;\n" +
						  "--progress-background-color-hover:" + progresscolor1 + "!important;\n" +
						  "--progress-background-color-hover-2:" + progresscolor2 + "!important;\n" +
						  "--progress-gradient-color:" + progress_gradient[0] + "!important;\n" +
						  "--progress-gradient-color-hover:" + progress_gradient[1] + "!important;\n" +
						  "--progress-foreground-color:" + progress_fg[0] + "!important;\n" +
						  "--progress-foreground-color-hover:" + progress_fg[1] + "!important;\n" +
						  "--progress-foreground-color-inverted:" + GetForegroundVariables(progresscolor1)[0] + "!important;\n" +
						  "--progress-background-color-rgb:" + ColorRGB(progress_color) + "!important;\n" +
						  "--progress-foreground-color-rgb:" + progress_fg[2] + "!important;\n" +
						  "--progress-foreground-color-hover-rgb:" + progress_fg[3] + "!important;\n" +
						  "--progress-secondary-background-color:" + progress2_color + "!important;\n" +
						  "--progress-secondary-background-color-hover:" + progress2color1 + "!important;\n" +
						  "--progress-secondary-background-color-rgb:" + ColorRGB(progress2_color) + "!important;\n" +
						  "--message-background-color:" + message_color + "!important;\n" +
						  "--message-background-color-hover:" + messagecolor1 + "!important;\n" +
						  "--message-background-color-hover-2:" + messagecolor2 + "!important;\n" +
						  "--message-gradient-color:" + message_gradient[0] + "!important;\n" +
						  "--message-gradient-color-hover:" + message_gradient[1] + "!important;\n" +
						  "--message-foreground-color:" + message_fg[0] + "!important;\n" +
						  "--message-foreground-color-hover:" + message_fg[1] + "!important;\n" +
						  "--message-foreground-color-inverted:" + GetForegroundVariables(messagecolor1)[0] + "!important;\n" +
						  "--message-background-color-rgb:" + ColorRGB(message_color) + "!important;\n" +
						  "--message-foreground-color-rgb:" + message_fg[2] + "!important;\n" +
						  "--message-foreground-color-hover-rgb:" + message_fg[3] + "!important;\n" +
						  "--message-secondary-background-color:" + message2_color + "!important;\n" +
						  "--message-secondary-background-color-hover:" + message2color1 + "!important;\n" +
						  "--message-secondary-background-color-rgb:" + ColorRGB(message2_color) + "!important;\n" +
// Luna Levit
						  "--mica-background-color:" + micabg[0] + ";\n" +
// Misc Variables
						'--desktop-background-image:' + img  + ';\n' +
						'--desktop-background-image-filter:' + imgfilter  + ';\n' +
						'--desktop-background-image-blend-mode:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-blend-mode")  + ';\n' +
						'--desktop-background-horizontal-alignment:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-horizontal-alignment")  + ';\n' +
						'--desktop-background-vertical-alignment:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-vertical-alignment")  + ';\n' +
						 '--custom-font:' + GetCustomFont()  + ';\n' +
						 '--custom-secondary-font:' + GetCustomFont2()  + ';\n' +
						 '--border-radius:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--border-radius")  + ';\n' +
						 '--icon-filter:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter")  + ';\n' +
						 '--icon-filter-hover:' + wordfilter2  + ';\n' +
						 '--icon-filter-duration:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-duration")  + ';\n' +
						 '--icon-filter-delay:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-delay")  + ';\n' +
						 '--system-acryllic-opacity:' + aopacity  + ';\n' +
						 '--system-mica-opacity:' + (1 - aopacity)  + ';\n' +
						 '--system-generic-color-hue-shift:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-hue-shift")  + ';\n' +
						 '--system-generic-color-saturation:' + getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-saturation")  + ';\n' +


// Misc Background Settings
						  "--bg-size:" + ['cover','contain','100% 100%','auto'][["cover", "contain", "stretched", "full"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-size") ) ] + ";\n" +
						  "--bg-tile-x:" + ['repeat','no-repeat'][["false", "true"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-horizontal-tiling") ) ] + ";\n" +
						  "--bg-tile-y:" + ['repeat','no-repeat'][["false", "true"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-vertical-tiling") ) ] + ";\n" +
						  "--invertion-filter:" + invfilters[window.MW18spdarkmode][[false, true].indexOf(window.MW18darkmode) ] + ";\n" +
						  "}"
						  //


/* Write them to the stylesheet */
document.querySelector("head .theming").innerHTML = result;

		/* Theme Mode */
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
		/* Forced Colors */
		VisualMode(window.MW18ActiveStyleMode,false);


}
