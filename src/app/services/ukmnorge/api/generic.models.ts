export interface Tid {
	sekunder: Number;
	human: String;
	human_short: String;
	human_long: String;
}

export interface Fylke {
	id: Number;
	navn: String;	
}

export interface Kommune {
	id: Number,
	navn: String;
	fylke: Fylke;
}