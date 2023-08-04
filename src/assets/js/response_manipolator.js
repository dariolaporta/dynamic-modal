function manipolaReadPratica(response) {
		response = response.pratica;
		if(response.sezioneDatiGeneraliPenali) {
			response.sezioneDatiGenerali = response.sezioneDatiGeneraliPenali;
			response.sezioneDatiGeneraliPenali = null;
		}
		if(response.sezioneDatiGeneraliCivili) {
			response.sezioneDatiGenerali = response.sezioneDatiGeneraliCivili;
			response.sezioneDatiGeneraliCivili = null;
		}
		return response;
}

function manipolaReadSezioneClassificazione(response) {
		response = response.sezione;
		return response;
}

function manipolaReadFascicolo(response) {
	response = response.fascicolo;
	return response;
}
