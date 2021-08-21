/* Mobile Only CSS */
if (navigator.userAgent.match("Mobile")) {
document.querySelector("body").className += " phone"
}

/* Dropdowns */
// Function to be used on the first child of .cpe-dropdown container
function DropDownUpdate() {
 $('.cpe-dropdown').off( "mouseleave" );	

$(".cpe-dropdown")
					.attr('tabindex', '-1')

/* Select Inputs */
$(' .cpe-dropdown.cpe-select .cpe-dropdown__content .cpe-list li:not(.cpe-dropdown-level-2)')
.click(function(e) {
						e.preventDefault();
						var value = $(this).attr("value");
						$(' .cpe-dropdown.cpe-select')
						.click(function() {
									var content = $('.cpe-select:focus-within .cpe-dropdown__content .cpe-list li:not(.cpe-dropdown-level-2):hover > a').html();
									$('.cpe-select:focus-within .cpe-select__value').attr("value", value);
									$('.cpe-select:focus-within .cpe-select__value').html(content);
									$(this).blur();
									$(' .cpe-dropdown.cpe-select').off( "click" );
								});
        });
					
}



/* Enable New Global Navigation - No exception for now */
window.MW18newnavblock=false;
(function () {
	AliasFandomComponents();
	DropDownUpdate();
	$('body').mouseenter( function(e) { DropDownUpdate(); CheckTheme(); } );		
	$('body').mouseleave( function(e) { CheckTheme(); } );
	if (window.MW18newnavblock === true) {
		return
	}
/*
	if ($("body.mpisto-2018").length || $("body.mpisto-discuss-2018").length) {
		document.querySelector('.mpisto-gnav[style]').className += " newnav";
		document.querySelector('.mpisto-gnav:not([style])').className += " newnav";
	}
*/
})();


/* Module Toggle */
function ToggleModule() {

		$('.mpisto-module')
				.click(function() {
						var $this = $(this);
						if ($this.hasClass("hidden-module")) {
							$this.removeClass("hidden-module");
						} else {
							$this.addClass("hidden-module");
						}

						$('.mpisto-module').off( "click" );


			});

}

/* Aliases all components with the .wds prefix to the ones from .cpe ones */
function AliasFandomComponents() {

	var highlightedItems = document.querySelectorAll(":not(svg)[class*='wds-'], [class*='cpe-is-'], [class*='cpe-has-']");

	while ($(':not(svg)[class*="wds-"], [class*="cpe-is-"], [class*="cpe-has-"]').length > 0) {
		highlightedItems.forEach(function(x) {
			x.className = x.className.replace("wds-is-", "is-");
			x.className = x.className.replace("wds-has-", "has-");
			x.className = x.className.replace("cpe-is-", "is-");
			x.className = x.className.replace("cpe-has-", "has-");
			x.className = x.className.replace("wds-midlight-aqua", "cpe-midlight-color");
			x.className = x.className.replace("wds-", "cpe-");
		});
	}


}



/* Banners */
function RemoveBanner() {
$('#floatingbanner .cpe-banner-notification')
	.click(function() {
		var $this= $(this);
		$this.addClass("is-transparent")
		setTimeout(
		(function () {
			$this.remove();
			$('#floatingbanner .cpe-banner-notification').off( "click" );
	if (!($("#floatingbanner .cpe-banner-notification").length)) {
		$('#floatingbanner').remove();
	}
		}),405);
	}
	);
	

}

function AddFloatingBanner(content='Sample Content',kind='message',extraclass='') {
	if (kind === 'warning') {
		var icon = 'report_problem'
	} else if (kind === 'alert') {
		var icon = 'report'
	} else if (kind === 'success') {
		var icon = 'done'
	} else {
		var icon = 'info'
	}
	if (!($(".top-gap #floatingbanner").length)) {
		$('.top-gap').prepend ( 
			  '<div class="cpe-banner-notification__container" id="floatingbanner">' +
			  '\n</div>'
		);
	}

	$('.top-gap #floatingbanner').append ( 
			'<div class=" cpe-banner-notification cpe-' + kind + '" id="' + extraclass  + '">' +
			  '<div class="cpe-banner-notification__icon">' +
				'<span class="cpe-icon cpe-icon-small material-icons">' +
					icon + 
				'</span>' +
			  '</div>' +
			  '<span class="cpe-banner-notification__text">' + content + '</span>' +
			  '<svg onclick="RemoveBanner()" xmlns="http://www.w3.org/2000/svg" class="cpe-banner-notification__close cpe-icon cpe-icon-tiny">' +
				'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cpe-icons-cross-tiny" />' +
			  '</svg>' +
			'</div>' 
	);


}



/* File Downloader */
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,a=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},s="application/octet-stream",d=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,d)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(a){u(a)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,d){if(!d){t=p(t)}var v=this,w=t.type,m=w===s,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&i)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;a(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define("FileSaver.js",function(){return saveAs})}

/* Save File */
 function saveFileAs(contents,fileType,fileName) {
    /** Allow for downloading a file to a disk.
        This relies the FileSaver.js library which exports saveAs()
        Two utility methods saveImageAs and saveXMLAs should be used first.
    */
    var blobIsSupported = false,
        fileExt,
        dialog;

    // fileType is a <kind>/<ext>;<charset> format.
    fileExt = fileType.split('/')[1].split(';')[0];
    // handle text/plain as a .txt file
    fileExt = '.' + (fileExt === 'plain' ? 'txt' : fileExt);

    function dataURItoBlob(text, mimeType) {
        var i,
            data = text,
            components = text.split(','),
            hasTypeStr = text.indexOf('data:') === 0;
        // Convert to binary data, in format Blob() can use.
        if (hasTypeStr && components[0].indexOf('base64') > -1) {
            text = atob(components[1]);
            data = new Uint8Array(text.length);
            i = text.length;
            while (i--) {
                data[i] = text.charCodeAt(i);
            }
        } else if (hasTypeStr) {
            // not base64 encoded
            text = text.replace(/^data:image\/.*?, */, '');
            data = new Uint8Array(text.length);
            i = text.length;
            while (i--) {
                data[i] = text.charCodeAt(i);
            }
        }
        return new Blob([data], {type: mimeType });
    }

    try {
        blobIsSupported = !!new Blob();
    } catch (e) {}

    if (blobIsSupported) {
        if (!(contents instanceof Blob)) {
            contents = dataURItoBlob(contents, fileType);
        }
        // download a file and delegate to FileSaver
        // false: Do not preprend a BOM to the file.
        saveAs(contents, fileName + fileExt, false);
    } else {
        prompt("Could not export" + fileName);
    }
 }
 
 /* Download Data */
function DownloadData(contents,filename,ext) {
eval("saveFileAs(contents,\'text/"+ext+";charset=utf-8\', filename)");
}