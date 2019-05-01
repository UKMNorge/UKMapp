import { BasicPlaceholder } from './api.models';
import { Fylke, PlaceholderFylke } from './generic.models';
import { InnslagType, PlaceholderInnslagType } from './innslag.models';

export interface User {
	id: Number,
	fylke: Fylke,
	type: InnslagType
}

export class PlaceholderUser extends BasicPlaceholder {
	public id = 0;
	public fylke = new PlaceholderFylke();
	public type = new PlaceholderInnslagType();
}