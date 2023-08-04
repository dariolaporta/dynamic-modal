//var dominioInterno = "http://192.168.12.246";
//var dominioInterno = "http://192.168.12.241";
// var dominioInterno = window.location.protocol + '//' + window.location.host;
var dominioInterno = window.location.href.slice(0,window.location.href.indexOf('/teleforumweb/'))
// var dominioInterno = "http://localhost:8080";
// var dominioInternoTemp = "https://192.168.12.246";
var dominio = dominioInterno + "/prototype";
var dominioInternoReport = "http://192.168.12.220:8080";
var dominioInternoFlux = "http://192.168.12.200:8480";

var cicleScroll = false;

jQuery(document).on('hidden.bs.modal', function (event) {
	if (jQuery('.modal:visible').length) {
		jQuery('body').addClass('modal-open');
	} else {
		jQuery('body').removeClass('modal-open');
	}
	if (!cicleScroll) {
		cicle = true;
		checkScrollLoop();
	}
});

function checkScrollLoop() {
	setTimeout(function () {
		if (jQuery('.modal:visible').length) {
			jQuery('body').addClass('modal-open');
		} else {
			jQuery('body').removeClass('modal-open');
		}
		checkScrollLoop();
	}, 2000)
}

function intercettaDomChangeInModalViewTag() {
	jQuery("modal-view").first().bind('DOMNodeInserted', function () {
		jQuery("#myModal").modal("show");
	});
}
function getDominio() {

	var porta = window.location.port;
	var hostServicesAddress = window.location.protocol + '//' + window.location.host + '/services';
	if ((~hostServicesAddress.indexOf("localhost") || ~hostServicesAddress.indexOf("127.0.0.1")) && (porta == "3000" || porta == "4200")) {

		dominio = dominioInterno + '/services';//ambiente di sviluppo
		//		dominio = dominioInternoTemp+'/services';//ambiente di sviluppo
		//		dominio = 'http://192.168.12.223:8080/services';//ambiente di collaudo
	}

	else {

		dominio = hostServicesAddress;
	}
	return dominio;
}

function getDominioReport() {

	var porta = window.location.port;
	var hostServicesAddress = window.location.protocol + '//' + window.location.host + '/report';
	if ((~hostServicesAddress.indexOf("localhost") || ~hostServicesAddress.indexOf("127.0.0.1")) && (porta == "3000" || porta == "4200")) {
		dominio = dominioInternoReport + '/report'; //ambiente di sviluppo
	}
	else {
		dominio = hostServicesAddress;
	}
	return dominio;
}


function getDominioNL() {

	var porta = window.location.port;
	var hostServicesAddress = window.location.protocol + '//' + window.location.host + '/smart';
	if ((~hostServicesAddress.indexOf("localhost") || ~hostServicesAddress.indexOf("127.0.0.1")) && (porta == "3000" || porta == "4200")) {
		dominio = dominioInterno + '/smart'; //ambiente di sviluppo
	}
	else {
		dominio = hostServicesAddress;
	}
	return dominio;
}

function getDominioPctDeposito() {
	var porta = window.location.port;
	var urlCerto = '/pct-fe/#/';
	var hostServicesAddress = window.location.protocol + '//' + window.location.host + urlCerto;
	if ((~hostServicesAddress.indexOf("localhost") || ~hostServicesAddress.indexOf("127.0.0.1"))) {
		dominio = dominioInterno + urlCerto; // ambiente di sviluppo
	}

	else {
		dominio = hostServicesAddress;
	}
	return dominio;
}

function getDominioPctConsultazione() {
	var porta = window.location.port;
	var urlCerto = '/pct-fe-cons/#/consultazione';
	var hostServicesAddress = window.location.protocol + '//' + window.location.host + urlCerto;
	if ((~hostServicesAddress.indexOf("localhost") || ~hostServicesAddress.indexOf("127.0.0.1"))) {
		dominio = dominioInterno + urlCerto; // ambiente di sviluppo
	}

	else {
		dominio = hostServicesAddress;
	}
	return dominio;
}

function getDominioFlux() {

	var porta = window.location.port;
	var hostServicesAddress = window.location.protocol + '//' + window.location.host + '/flux';
	if ((~hostServicesAddress.indexOf("localhost") || ~hostServicesAddress.indexOf("127.0.0.1")) && (porta == "3000" || porta == "4200")) {
		dominio = dominioInternoFlux + '/flux'; //ambiente di sviluppo
	}
	else {
		dominio = hostServicesAddress;
	}
	return dominio;
}

function getTokenURL() {

	var tokenPath = getDominio() + '/csrftoken';
	return tokenPath;

}

function getLoginURL() {

	var loginPath = getDominio() + '/login';
	return loginPath;

}

function formattaData(timeInMillis) {
	var data = new Date(timeInMillis)
	return "" + data.getDate() + "-" + (data.getMonth() + 1) + "-" + data.getFullYear();
}

function removePropertyTag(tagName) {
	jQuery(tagName).contents().unwrap();
}

function verifyInArray(elemento, array) {
	return jQuery.inArray(elemento, array) >= 0;
}

function evidenziaSezioneSelezionata(idElemento) {
	if (jQuery("#" + idElemento)) {
		jQuery("#menu-contestuale li").each(function () {
			if (jQuery(this).attr("id") == idElemento) {
				jQuery(this).addClass("active");
			} else {
				jQuery(this).removeClass("active");
			}
		});
	} else {
		setTimeout(function () { evidenziaSezioneSelezionata(idElemento) }, 500);
	}

}

function convertFileToStream(file, ref) {
	var reader = new FileReader();
	reader.onloadend = function (evt) {
		if (evt.target.readyState == FileReader.DONE) {
			var chars = new Uint8Array(evt.target.result);
			var CHUNK_SIZE = 0x8000;
			var index = 0;
			var length = chars.length;
			var result = '';
			var slice;
			while (index < length) {
				slice = chars.subarray(index, Math.min(index + CHUNK_SIZE, length));
				result += String.fromCharCode.apply(null, slice);
				index += CHUNK_SIZE;
			}
			ref.fileStreamed(result);
		}
	};
	reader.readAsArrayBuffer(file);
}

function closeModal(idModal) {
	jQuery("#" + idModal).modal("hide");
}


function openModal(idModal) {

	if('block' === document.getElementById(idModal).style.display) {

		jQuery('#' + idModal).one('hidden.bs.modal', function(e){
			openModal(idModal);
		});

	} else {
		jQuery('#' + idModal).modal('show');
	}

}

function removeEmptyObject(jsonElement) {
	if (jsonElement == null) {
		return null;
	}

	if (jQuery.type(jsonElement) != 'object' && jQuery.type(jsonElement) != 'array') {
		console.log('non modificabile');
		return jsonElement;
	}

	if (jQuery.type(jsonElement) == 'array') {
		jQuery.each(jsonElement, function (index, value) {
			var oggettoNuovo = removeEmptyObject(value);
			if (oggettoNuovo == null) {
				jsonElement.splice(index, 1);
			} else {
				jsonElement[index] = oggettoNuovo;
			}
		});
		console.log(JSON.stringify(jsonElement));
		return jsonElement;
	}

	var keys = Object.keys(jsonElement);
	if (keys.length == 0) {
		return null;
	}

	var daUccidere = false;
	jQuery.each(keys, function (index, value) {
		if (!daUccidere) {
			if (value == "id" && (jsonElement[value] == null || (jQuery.type(jsonElement[value]) == 'string' && jsonElement[value] == ""))) {
				daUccidere = true;
			} else if (value == "id" && (jsonElement[value] == "not delete")) {
				jsonElement[value] = null;
			}
			if (jQuery.type(jsonElement[value]) == 'object') {
				jsonElement[value] = removeEmptyObject(jsonElement[value]);
			}
			if (jQuery.type(jsonElement[value]) == 'array') {
				var arrayElement = jsonElement[value];
				jQuery.each(arrayElement, function (index, value) {
					var oggettoNuovo = removeEmptyObject(value);
					if (oggettoNuovo == null) {
						arrayElement.splice(index, 1);
					} else {
						arrayElement[index] = oggettoNuovo;
					}
				});
			}
		}
	});
	if (daUccidere) {
		return null;
	} else {
		return jsonElement;
	}
}

function getMaxPositionWindow() {
	return document.body.offsetHeight;
}

function printElem(elem, title) {
	var mywindow = window.open('', 'PRINT', 'height=600,width=600');

	mywindow.document.write('<html><head><title>' + document.title + '</title>');
	mywindow.document.write('<link href="css/print.css" rel="stylesheet" media="print">');
	mywindow.document.write('</head><body class="print">');
	mywindow.document.write('<div class="container">');
	mywindow.document.write('<div>');
	mywindow.document.write('<div>');
	mywindow.document.write('<h3 class="title1level">' + title + '</h3>');
	mywindow.document.write('</div>');
	mywindow.document.write('<ul class="controparti">');
	mywindow.document.write(document.getElementById(elem).innerHTML);
	mywindow.document.write('</ul>');
	mywindow.document.write('</div>');
	mywindow.document.write('</div>');
	mywindow.document.write('</body></html>');

	mywindow.document.close(); // necessary for IE >= 10
	mywindow.focus(); // necessary for IE >= 10*/

	mywindow.print();
	mywindow.close();

	return true;
}

function printElement(idElement) {
	//jQuery("#" + idElement).printElement();
	jQuery(idElement).printElement();
}

function loginSyncOperation(url, params) {

	var isLogged = false;
	jQuery.ajax({
		type: "POST",
		url: url,
		async: false,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (res, status, xhr) {

			isLogged = res;
		}
	});

	return isLogged;
}

function logoutApp(url, landing) {

	var isLogged = false;
	jQuery.ajax({
		type: "POST",
		url: url,
		async: false,
		headers: {
			'landing': landing
		},
		crossDomain: true,
		success: function (res, status, xhr) {

			isLogged = res;
		}
	});

	return isLogged;
}

function recuperaTokenCSRF(url, params) {

	var token = '';
	jQuery.ajax({
		type: "GET",
		url: url,
		async: false,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (res, status, xhr) {

			token = res;
		}
	});

	return token;
}

function recuperaUrlForICalendar(url) {

	var token = '';
	jQuery.ajax({
		type: "GET",
		url: url,
		async: false,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (res, status, xhr) {

			token = res;
		}
	});

	return token;
}

function getFascicoloMapSync(idTipoPratica, idTipoFascicolo) {
	var porta = window.location.port;
	var hostServicesAddress = dominioInterno + '/api-gateway/menu/rs';
	var dominioUrl = hostServicesAddress;
	var path = dominioUrl + "/menufascicolo/" + idTipoPratica + "/" + idTipoFascicolo;
	// var path = "LocalJson/fascicoliMapping/"+nomePratica+"/"+nomeFascicolo+".json";
	var responseJSON;
	jQuery.ajax({
		type: "GET",
		headers: {
			'TLF_USER': localStorage.getItem('TLF_USER'),
			//'TLF_SDOMAIN': localStorage.getItem('TLF_SDOMAIN'),
			'TLF_PRODUCT': 'teleforum',
			//'TLF_TENANT': localStorage.getItem('TLF_TENANT'),
			'Content-Type': 'application/json'
		},
		url: path,
		async: false,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (res) {
			responseJSON = res;
		},
		error: function (err) {
			console.log(err);
			alert((err.responseText).replace(/<[^>]*>?/gm, ''));
		}
	});

	// // TLFCC-61 Eliminazione step Assegnazione per smistamento
	// if (responseJSON.lowerListIns) {
	// 	responseJSON.lowerListIns = responseJSON.lowerListIns.filter(_ => _.id !== "assegnazione_per_smistamento")
	// }

	return responseJSON;
}

function getPraticaMapSync(idTipoPratica) {
	var porta = window.location.port;
	var hostServicesAddress = dominioInterno+ '/api-gateway/menu/rs';
	var dominioUrl = hostServicesAddress;
	var path = dominioUrl + "/menupratica/" + idTipoPratica;
	// var path = "LocalJson/fascicoliMapping/"+nomePratica+"/"+nomePratica+".json";
	var responseJSON;
	jQuery.ajax({
		type: "GET",
		/*beforeSend: function(request) {
		  request.setRequestHeader("TLF_USER", localStorage.getItem('TLF_USER'));
		  request.setRequestHeader("TLF_SDOMAIN", localStorage.getItem('TLF_SDOMAIN'));
		},*/
		headers: {
			'TLF_USER': localStorage.getItem('TLF_USER'),
			//'TLF_SDOMAIN': localStorage.getItem('TLF_SDOMAIN'),
			'TLF_PRODUCT': 'teleforum',
			//'TLF_TENANT': localStorage.getItem('TLF_TENANT'),
			'Content-Type': 'application/json'
		},
		url: path,
		async: false,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (res) {
			responseJSON = res;
		},
		error: function (err) {
			console.log(err);
			alert((err.responseText).replace(/<[^>]*>?/gm, ''));
		}
	});
	return responseJSON;
}

function callServiceSync(url) {
	var responseJSON;
	jQuery.ajax({
		type: "GET",
		url: url,
    headers: {
      'TLF_USER': localStorage.getItem('TLF_USER'),
      //'TLF_SDOMAIN': localStorage.getItem('TLF_SDOMAIN'),
      'TLF_PRODUCT': 'teleforum',
      //'TLF_TENANT': localStorage.getItem('TLF_TENANT'),
      'Content-Type': 'application/json'
    },
		async: false,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (res) {
			responseJSON = res;
		}
	});
	return responseJSON;
}

/*function getLoggedUser(urlService) {
	var responseJSON;
	jQuery.ajax({
		type:"GET",
		url: urlService,
		async: false,
		xhrFields: {
			withCredentials: true
		 },
		 crossDomain: true,
		success: function (res) {
			responseJSON = [res];
		}
	});
	return responseJSON;
}*/

function copyAllAttributes(childObject, fatherObject) {
	jQuery.each(fatherObject, function (key, value) {
		childObject[key] = value;
	});
}

function getDominioCss() {

	var porta = window.location.port;
	var hostServicesAddress = window.location.protocol + '//' + window.location.host + '/teleforumweb/css';
	if ((~hostServicesAddress.indexOf("localhost") || ~hostServicesAddress.indexOf("127.0.0.1")) && (porta == "3000" || porta == "4200")) {

		dominio = dominioInterno + '/teleforumweb/css';//ambiente di sviluppo
		//		dominio = 'http://192.168.12.223:8080/services';//ambiente di collaudo
	}

	else {

		dominio = hostServicesAddress;
	}
	return dominio;
}

function _window() {
	// return the global native browser window object
	return window;
}

function goTop() {
	jQuery('html,body').animate({ scrollTop: 0 }, 'slow');
	return false;
}

var timoutNow = 900000; // Timeout in 15 mins.
var timeoutTimer;

function startTimer() {
	timeoutTimer = setTimeout("idleTimeout()", timoutNow);
}

function resetTimer() {
	clearTimeout(timeoutTimer);
	startTimer();
}

function idleTimeout() {
	exitFunction();
}

function exitFunction() {
	var host = window.location.hostname;
	var porta = window.location.port;
	var exitAddress = '';
	if ((~host.indexOf("localhost") || ~host.indexOf("127.0.0.1")) && (porta == "3000" || porta == "4200")) {
		exitAddress = window.location.protocol + '//' + window.location.host + '/main.html#./error_page';
	} else {
		exitAddress = window.location.protocol + '//' + window.location.host + '/teleforumweb/main.html#./error_page';
	}
	window.location.replace(exitAddress);
}

function backHome() {
	var host = window.location.hostname;
	var porta = window.location.port;
	var homeAddress = '';
	if ((~host.indexOf("localhost") || ~host.indexOf("127.0.0.1")) && (porta == "3000" || porta == "4200")) {
		homeAddress = window.location.protocol + '//' + window.location.host + '/';
	} else {
		homeAddress = window.location.protocol + '//' + window.location.host + '/teleforumweb/';
	}
	window.location.replace(homeAddress);
}

function closeModalbyClass(className) {
	jQuery("." + className).hide();
}

function diffToArrayFaccette(arrayFaccetteDaTogliere) {
	return function (current) {
		return arrayFaccetteDaTogliere.filter(function (other) {
			return other.feChildName == current.feChildName
		}).length == 0;
	}
}

function estraiArrayCriteriCustom(arrayCriteriDaEstrarre) {
	return function (current) {
		return arrayCriteriDaEstrarre.filter(function (other) {
			return other.label == current.label
		}).length == 1;
	}
}
