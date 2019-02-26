export interface Monstring {
	id: number;
	navn: string;
	sted: string;
	start: Date; 
	stop: Date;
	type: string;
	url: string;
  }

export class PlaceholderMonstring {
	public id = 0;
	public navn = 'Laster inn navn...';
	public sted = 'Du må være online for å vise mer informasjon';
	public start = null;
	public stop = null;
	public type = '';
	public url = '';
}