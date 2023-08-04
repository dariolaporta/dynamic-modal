var dataInserimentoModel = {"date" : null};
var dataNotificaModel = {"date" : null};

function inizializzaDatePickerDataInserimento() {           
	if(jQuery("#dataInserimento").length > 0) {
		jQuery.datepicker.setDefaults(jQuery.datepicker.regional['it']); 
		jQuery( "#dataInserimento" ).datepicker({ dateFormat: 'dd-mm-yy',
												onSelect: function(dateText) {
												dataInserimentoModel.date = convertDataInMillis(dateText);
											}});
	
		jQuery( "#dataNotifica" ).datepicker({ dateFormat: 'dd-mm-yy',
												onSelect: function(dateText) {
												dataNotificaModel.date = convertDataInMillis(dateText);
											}});
	} else {
		setTimeout(function () {    
			inizializzaDatePickerDataInserimento();
		}, 500);
	}
	
}

function setDataInserimentoModel(actualDate) {
	if(actualDate) {
		dataInserimentoModel.date = actualDate;
	} else {
		dataInserimentoModel.date = null;
	}
	return dataInserimentoModel;
}

function setDataNotificaModel(actualDate) {
	if(actualDate) {
		dataNotificaModel.date = actualDate;
	} else {
		dataNotificaModel.date = null;
	}
	return dataNotificaModel;
}

