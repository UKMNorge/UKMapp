import { Kommune } from './generic.models';

export interface Innslag {
	id: number;
	navn: String;
	type: String;
	beskrivelse: String;
	kommune: Kommune; // TODO spesifiser kommune
	kategori: String;
	sjanger: String;
	kategori_og_sjanger: String;
	sjanger_eller_kategori: String;
}

export interface InnslagDetaljer {
	id: number;
	artikler: any[];
	bilder: any[];
	filmer: any[];
	personer: any[];
	titler: any[];
}

export class PlaceholderInnslag {
	constructor() { }

	public id = 0;
	public navn = 'Ikke tilgjengelig offline';
	public type = '';
	public beskrivelse = '';
	public kommune = null;
	public kateogir = '';
	public sjanger = '';
	public kategori_og_sjanger = '';
	public sjanger_eller_kategori = '';

	public setId(id) {
		this.id = id;
	}
}

export class PlaceholderInnslagDetaljer {
	public id = 0;
	public artikler = [];
	public bilder = [];
	public filmer = [];
	public personer = [];
	public titler = [];
}

export class InnslagDetaljer extends PlaceholderInnslagDetaljer {
	constructor(
		data
	) {
		super();
		this.id = data.id;
		this.artikler = data.artikler;
		this.bilder = data.bilder;
		this.filmer = data.bilder;
		this.personer = data.personer;
		this.titler = data.titler;
	}
}