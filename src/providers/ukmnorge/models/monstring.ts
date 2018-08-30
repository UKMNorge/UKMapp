export class Monstring {
	id: number = 0;
	navn: string = '';
	sted: string = '';
	start: Date = new Date();
	stop: Date = new Date();
	type: any = null;
	
	constructor( data ) {
		this.id = data.id;
		this.navn = data.navn;
		this.sted = data.sted;
		this.start = new Date( data.start );
		this.stop = new Date( data.stop );
		this.type = data.type;
	}
	
	getNavn() {
		return this.navn +' @ '+ this.sted;
	}
}


export interface MonstringInterface {
	id: number;
	navn: string;
	sted: string;
	start: any;
	stop: any;
	type: any;
}