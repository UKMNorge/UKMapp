import { BasicPlaceholder } from './api.models';
import { Fylke, PlaceholderFylke } from './generic.models';

export interface Monstring {
	id: number;
	navn: string;
	sted: string;
	start: Date; 
	stop: Date;
	dager: Date[];
	type: string;
	url: string;
	fylke: Fylke
  }

export class PlaceholderMonstring extends BasicPlaceholder {
	public id = 0;
	public navn = 'Laster inn navn...';
	public sted = 'Du må være online for å vise mer informasjon';
	public start = null;
	public stop = null;
	public dager = [];
	public type = '';
	public url = '';
	public fylke = new PlaceholderFylke();
}