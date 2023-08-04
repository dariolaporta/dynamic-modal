function manipolaCampiDinamici(response) {
	var campiDinamiciOrdinatiArray = null;
	if(response.campiDinamici) {
		campiDinamiciOrdinatiArray = [];
		jQuery.each(response.campiDinamici, function(index, campoDinamico) {
			var nuovoElementoOrdinato = false;
			for(var indiceElementoOrdinato = 0; indiceElementoOrdinato < campiDinamiciOrdinatiArray.length && !nuovoElementoOrdinato; indiceElementoOrdinato++ ) {
				if(campoDinamico.definizione.orderPrior < campiDinamiciOrdinatiArray[indiceElementoOrdinato].orderPrior) {
					var campoDinamicoRielaborato = rielaboraCampoDinamico(campoDinamico, response.mode);
					campiDinamiciOrdinatiArray.splice(indiceElementoOrdinato, 0, campoDinamicoRielaborato);
					nuovoElementoOrdinato = true;
				}
			}
			if(!nuovoElementoOrdinato) {
				var accodaCampoDinamicoRielaborato = rielaboraCampoDinamico(campoDinamico, response.mode);
				campiDinamiciOrdinatiArray.push(accodaCampoDinamicoRielaborato);
			}
		});
	}
	var oggettoRitorno = {};
	oggettoRitorno.mode = response.mode;
	oggettoRitorno.campiDinamici = campiDinamiciOrdinatiArray;
	return oggettoRitorno;
}


function rielaboraCampoDinamico(campoDinamico, mode) {
	var campoDinamicoRielaborato = {};
	campoDinamicoRielaborato.id = campoDinamico.id;
	campoDinamicoRielaborato.orderPrior = campoDinamico.definizione.orderPrior;
	campoDinamicoRielaborato.label = campoDinamico.definizione.label;
	campoDinamicoRielaborato.validNullable = campoDinamico.definizione.validNullable;
	campoDinamicoRielaborato.descrizione = campoDinamico.definizione.descr;
	if(!campoDinamicoRielaborato.validNullable && mode == "modifica") {
		campoDinamicoRielaborato.label += "*";
	}
	if(campoDinamico.valore) {
		campoDinamicoRielaborato.valore = campoDinamico.valore;
	} else if(campoDinamico.definizione.valueDefault) {
		campoDinamicoRielaborato.valore = campoDinamico.definizione.valueDefault;
	}
	
	if(campoDinamico.definizione.lov) {
		campoDinamicoRielaborato.elemento = "select"
		//TODO
		var arrayPossibiliValori = [];
		jQuery.each(campoDinamico.definizione.lov.split("|"), function(index, possibileValore) {
			var arrayKeyValue = possibileValore.split(":");
			var singolaOpzione = {};
			singolaOpzione.chiave = arrayKeyValue[0];
			singolaOpzione.valore = arrayKeyValue[1] ? arrayKeyValue[1] : arrayKeyValue[0];
			if(campoDinamico.valore && campoDinamico.valore == arrayKeyValue[0]) {
				singolaOpzione.selected = true;
			} else {
				singolaOpzione.selected = false;
			}	
			arrayPossibiliValori.push(singolaOpzione);
		});
		campoDinamicoRielaborato.possibiliValori = arrayPossibiliValori; 
		
	} else if(campoDinamico.definizione.name == "campodata") {
		campoDinamicoRielaborato.patternToFormat = campoDinamico.definizione.patternToFormat;
		campoDinamicoRielaborato.elemento = "datepicker"
	} else if(campoDinamico.definizione.name == "campotesto" || campoDinamico.definizione.name == "campointero") {
		if(campoDinamico.definizione.validLenghtMin) {
			campoDinamicoRielaborato.validLenghtMin = campoDinamico.definizione.validLenghtMin;
		}
		if(campoDinamico.definizione.validLenghtMax) {
			campoDinamicoRielaborato.validLenghtMax = campoDinamico.definizione.validLenghtMax;
		}
		if(campoDinamico.definizione.validRegex) {
			campoDinamicoRielaborato.validRegex = campoDinamico.definizione.validRegex;
		} else if(campoDinamico.definizione.name == "campointero") {
			campoDinamicoRielaborato.validRegex = "^[0-9]*$";
		}
		
		if(campoDinamico.definizione.name == "campotesto") {
			if(!campoDinamico.definizione.validLenghtMax || campoDinamico.definizione.validLenghtMax <= 60) {
				campoDinamicoRielaborato.elemento = "testo";
			} else {
				campoDinamicoRielaborato.elemento = "textArea";
			}
		} else {
			campoDinamicoRielaborato.elemento = "testo";
		}
	}
	return campoDinamicoRielaborato;
}


function associaDatePickerCampiDinamiciDate(campiDinamici, callback) {
	jQuery.each(campiDinamici, function(index, campoDinamico){
		if(campoDinamico.elemento == "datepicker") {
			inizializzaDatePickerDinamico(campoDinamico.id, campoDinamico.patternToFormat, callback)
		}
	});
}

function inizializzaDatePickerDinamico(idCampo, pattern, callback) {
	if(jQuery("#" + idCampo).length > 0) {
		jQuery.datepicker.setDefaults(jQuery.datepicker.regional['it']); 
		jQuery("#" + idCampo + "_picker").datepicker({ dateFormat: pattern,
												onSelect: function(dateText) {
												var hiddenTimeInMillis = jQuery("#" + idCampo);
												hiddenTimeInMillis.val("" + Date.parse(jQuery(this).datepicker('getDate')));
												if(hiddenTimeInMillis.hasClass("cd-mandatory")) {
													callback();
												}
											}});
	} else {
		setTimeout(function () {    
			inizializzaDatePickerDinamico(idCampo, pattern, callback);
		}, 500);
	}
}

function addChangeListenerMandatoryCd(callback) {
	if(jQuery(".campo-dinamico").length > 0) {
		jQuery(".cd-mandatory").on('input', function() {
			callback();
		});
		callback();
	} else {
		setTimeout(function () {    
			addChangeListenerMandatoryCd(callback);
		}, 500);
	}
}

function areMandatoryFieldsValued() {
	var areMandatoryFieldsValued = true;
	jQuery(".cd-mandatory").each(function(){
				if(!$(this).val().trim()) {
					areMandatoryFieldsValued = false;
				}
			});
	return areMandatoryFieldsValued;
}

function checkFieldsPatternJQ(campiDinamici) {
	var errore = null;
	jQuery.each(campiDinamici, function(index, campoDinamico) {
		var valore = jQuery("#" + campoDinamico.id).val().trim();
		if(valore && !errore) {
			if((campoDinamico.validLenghtMin && valore.length < campoDinamico.validLenghtMin) || (campoDinamico.validLenghtMax && valore.length > campoDinamico.validLenghtMax) || (campoDinamico.validRegex &&  !new RegExp(campoDinamico.validRegex).test(valore))) {
					errore = "il campo " + campoDinamico.label + " non &egrave; nel formato corretto"; 
				}
		}
		
	});	
	return errore;	
}

function createArraySelections() {
	var cdUserSelections = [];
	jQuery(".campo-dinamico").each(function() {
		if(jQuery(this).val().trim()) {
			singleSelection = {};
			singleSelection.id = jQuery(this).attr("id");
			singleSelection.valore = jQuery(this).val().trim();
			cdUserSelections.push(singleSelection);
		}
	});
	return cdUserSelections;
}