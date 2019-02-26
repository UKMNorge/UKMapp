import { BasicPlaceholder } from './api.models';

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

export class PlaceholderTid {
	public sekunder = 0;
	public human = '';
	public human_short = '';
	public human_long = '';
}

export class PlaceholderFylke extends BasicPlaceholder {
	public id = 0;
	public navn = '';
}

export class PlaceholderKommune extends BasicPlaceholder {
	public id = 0;
	public navn = '';
	public fylke = new PlaceholderFylke();
}