export interface Kontakt {
	id: Number,
	fornavn: String;
	etternavn: String;
	navn: String;
	tittel: String;
	telefon: String;
	epost: String;
	facebook: String;
	bilde;
}

export class PlaceholderKontakt {
	public id = 0;
	public fornavn = '';
	public etternavn = '';
	public tittel = 'Koble til nett for å hente info';
	public telefon = '';
	public epost = '';
	public facebook = '';
	public bilde = {
		url: ''
	};
}