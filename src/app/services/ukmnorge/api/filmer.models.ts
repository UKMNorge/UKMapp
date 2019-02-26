import { BasicPlaceholder } from './api.models';

/* UKM-TV */
export interface UKMTVData {
	url: string;
	navn: string;
}
export class PlaceholderUKMTVData {
	public url = '';
	public navn = '';
}
export interface UKMTVBilde {
	url: string;
	width: number;
	height: number;
	orientation: string;
}
export class PlaceholderUKMTVBilde {
	public url = '';
	public width = 100;
	public height = 50;
	public orientation = 'landscape';
}
export interface UKMTVFil {
	mobil: string;
	desktop: string;
}
export class PlaceholderUKMTVFil {
	public mobil = '';
	public desktop = '';
}

export interface UKMTV {
	id: number;
	bilde: UKMTVBilde;
	url: string;
	navn: string;
	samling: UKMTVData;
	kategori: UKMTVData;
	fil: UKMTVFil;
}
export class PlaceholderUKMTV extends BasicPlaceholder {
	public id = 0;
	public bilde = new PlaceholderUKMTVBilde();
	public url = '';
	public navn = '';
	public samling = new PlaceholderUKMTVData();
	public kategori = new PlaceholderUKMTVData();
	public fil = new PlaceholderUKMTVFil();
}
