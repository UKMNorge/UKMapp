import { Kommune, PlaceholderKommune, PlaceholderTid } from './generic.models';
import { UKMTV } from './filmer.models';
import { BasicPlaceholder } from './api.models';

/* INNSLAG TYPE  */
export interface InnslagType {
	id: number;
	navn: string;
	key: string;
	ikon: string;
	harTid: boolean;
	harTitler: boolean;
}
export class PlaceholderInnslagType {
	public id = 0;
	public navn = '';
	public key = '';
	public ikon = '';
	public harTid = false;
	public harTitler = false;
}

/* INNSLAG BILDE */
export interface InnslagBilde {
	url: string;
	width: number;
	height: number;
	orientation: string;
	isPlaceholder: boolean;
}
export class PlacholderInnslagBilde {
	public url = '';
	public width = 100;
	public height = 50;
	public orientation = 'landscape';
	public isPlaceholder = true;
}

/* INNSLAG */
export interface Innslag {
	id: number;
	navn: String;
	type: String;
	beskrivelse: String;
	kommune: Kommune;
	kategori: String;
	sjanger: String;
	kategori_og_sjanger: String;
	sjanger_eller_kategori: String;
}
export class PlaceholderInnslag  extends BasicPlaceholder {
	public id = 0;
	public navn = 'Ikke tilgjengelig offline';
	public beskrivelse = '';
	public kategori = '';
	public sjanger = '';
	public kategori_og_sjanger = '';
	public sjanger_eller_kategori = '';
	public type = new PlaceholderInnslagType;
	public kommune = new PlaceholderKommune();
	public bilde = new PlacholderInnslagBilde();
	public tid = new PlaceholderTid();

	public setId(id) {
		this.id = id;
	}
}

/* PERSON */
export interface Person {
	id: number;
	navn: string;
	fornavn: string;
	etternavn: string;
	alder: string;
	rolle: string;
}

export class PlaceholderPerson extends BasicPlaceholder {
	public id = 0;
	public navn = '';
	public fornavn = '';
	public etternavn = '';
	public alder = '';
	public rolle = '';
}

/* TITTEL */
export interface Tittel {
	id: number;
	navn: string;
}
export class PlaceholderTittel extends BasicPlaceholder {
	public id = 0;
	public navn = '';
}

/* ARTIKKEL */
export interface ArtikkelMonstring {
	type: string;
	sesong: string;
}
export class PlaceholderArtikkelMonstring extends BasicPlaceholder {
	public type = '';
	public sesong = '';
}

export interface ArtikkelBlogg {
	id: number;
	url: string;
}
export class PlaceholderArtikkelBlogg extends BasicPlaceholder {
	public id = 0;
	public url = '';
}


export interface Artikkel {
	id: number;
	navn: string;
	title?: string;
	url: string;
	monstring: ArtikkelMonstring;
	blog: ArtikkelBlogg;
}
export class PlaceholderArtikkel extends BasicPlaceholder {
	public id = 0;
	public navn = '';
	public title = this.navn;
	public url = '';
	public monstring = new PlaceholderArtikkelMonstring();
	public blog = new PlaceholderArtikkelBlogg();
}

/* INNSLAG-DETALJER */
export interface InnslagDetaljer {
	id: number;
	artikler: Artikkel[];
	bilder: InnslagBilde[];
	filmer: UKMTV[];
	personer: Person[];
	titler: Tittel[];
}
export class PlaceholderInnslagDetaljer extends BasicPlaceholder {
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
		this.filmer = data.filmer;
		this.personer = data.personer;
		this.titler = data.titler;

		this.fixArtikkelTitle();
	}

	private fixArtikkelTitle() {
		// Iterer alle artikler, og sett artikkel.title = artikkel.navn
		if( Array.isArray( this.artikler ) ) {
			this.artikler.forEach(
				(artikkel: Artikkel) => {
					artikkel.title = artikkel.navn;
				}
			)
		}
		
	}
}