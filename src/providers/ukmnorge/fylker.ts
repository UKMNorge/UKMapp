export class Fylke {
  id: number;
  link: string;
  name: string;

  constructor( id, link='', name='' ) {
	if( id == null || id == undefined ) {
		this.id = 0;
		this.link = '';
		this.name = '';
	}
	else if( typeof id === 'object' ) {
		this.id = id.id;
		this.link = id.link;
		this.name = id.name;
	}
	else {
		this.id = id;
		this.link = link;
		this.name = name;
	}
  }
}

export class Fylker {
	fylker_data: Array<{id: number, link: string, name: string}>;

	fylker: Array<Fylke>;

	constructor() {
    this.fylker_data = [
        {id: 21,  link: 'testfylke',        name: 'Testfylke'},
        {id: 2,   link: 'akershus',         name: 'Akershus'},
        {id: 9,   link: 'aust-agder',       name: 'Aust-Agder'},
        {id: 6,   link: 'buskerud',         name: 'Buskerud'},
        {id: 20,  link: 'finnmark',         name: 'Finnmark'},
        {id: 4,   link: 'hedmark',          name: 'Hedmark'},
        {id: 12,  link: 'hordaland',        name: 'Hordaland'},
        {id: 15,  link: 'moreogromsdal',    name: 'Møre og Romsdal'},
        {id: 17,  link: 'nord-trondelag',   name: 'Nord-Trøndelag'},
        {id: 18,  link: 'nordland',         name: 'Nordland'},
        {id: 5,   link: 'oppland',          name: 'Oppland'},
        {id: 3,   link: 'oslo',             name: 'Oslo'},
        {id: 11,  link: 'rogaland',         name: 'Rogaland'},
        {id: 14,  link: 'sognogfjordane',   name: 'Sogn og Fjordane'},
        {id: 16,  link: 'sor-trondelag',    name: 'Sør-Trøndelag'},
        {id: 8,   link: 'telemark',         name: 'Telemark'},
        {id: 19,  link: 'troms',            name: 'Troms'},
        {id: 10,  link: 'vest-agder',       name: 'Vest-Agder'},
        {id: 7,   link: 'vestfold',         name: 'Vestfold'},
        {id: 1,   link: 'ostfold',          name: 'Østfold'},
    ];

		this.fylker = [];
		for( let i = 0; i < this.fylker_data.length; i++ ) {
			this.fylker.push( new Fylke( this.fylker_data[ i ] ) );
		}
	}

	getAll() {
		return this.fylker;
	}
}
