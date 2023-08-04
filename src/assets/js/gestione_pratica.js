///////////metodi Globali
function setPageTitle(title) {
	jQuery("#titoloPagina").text(title);
}

jQuery(function() {
    jQuery.getScript("js/datepicker_it.js");
});




/////////////////////gestionePratiche

var dataAperturaModel = {"date" : null};
var dataEventoModel = {"date" : null}

function inizializzaDatePickers(isPenale) {           
    if(jQuery("#dataApertura").length > 0) {
    	jQuery.datepicker.setDefaults(jQuery.datepicker.regional['it']); 
		jQuery( "#dataApertura" ).datepicker({ dateFormat: 'dd-mm-yy',
												onSelect: function(dateText) {
												dataAperturaModel.date = convertDataInMillis(dateText);
											}});
		if(isPenale) {
			jQuery( "#dataEvento" ).datepicker({ dateFormat: 'dd-mm-yy',
												onSelect: function(dateText) {
												dataEventoModel.date = convertDataInMillis(dateText);
											}});
		}
    } else
	setTimeout(function () {    
		inizializzaDatePickers(isPenale);
   }, 500);
}

function setDataAperturaModel(actualDate) {
	if(actualDate) {
		dataAperturaModel.date = actualDate;
	} else {
		dataAperturaModel.date = null;
	}
	return dataAperturaModel;
}

function setDataEventoModel(actualDate) {
	if(actualDate) {
		dataEventoModel.date = actualDate;
	} else {
		dataEventoModel.date = null;
	}
	return dataEventoModel;
}	

function resetAllPickersModel() {
	dataAperturaModel = {"date" : null};
	dataEventModel = {"date" : null};
}

function convertDataInMillis(dateText) {
	var dataSplit = dateText.split("-");
	var dateOnPicker = new Date(parseInt(dataSplit[2]), parseInt(dataSplit[1]) - 1, parseInt(dataSplit[0]));
	return dateOnPicker.getTime();
}
