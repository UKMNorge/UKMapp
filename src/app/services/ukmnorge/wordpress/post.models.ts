export interface WpPost {
	id: number;
	date: any;
	image: string;
	lead: string;
	url: string;	
	title: string;
	contenturl: string;
}

export class PlaceholderWpPost{
	public id = 0;
	public date = '';
	public image = '';
	public lead = '';
	public url = '';
	public title = '';
}

export interface WpPostDetaljer {
	id: number;
	content: string;
	lead: string;
}

export class PlaceholderWpPostDetaljer {
	public id = 0;
	public content = '';
	public lead = '';
}