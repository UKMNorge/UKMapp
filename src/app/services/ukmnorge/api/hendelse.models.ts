export interface Hendelse {
	id: number;
	navn: string;
	sted: string;
	start: Date; 
	type: string;
	intern: boolean;
	detaljer: boolean;
	post_id: number;
	category_id: number;
  }
  
  export class PlaceholderHendelse {
	constructor(){}
  
	public id = 0;
	public navn = 'Ikke tilgjengelig offline';
	public sted = '';
	public start = null;
	public type = '';
	public intern = null;
	public detaljer = null;
	public post_id = 0;
	public category_id = 0;

	public setId( id ) {
		this.id = id;
	}
  }