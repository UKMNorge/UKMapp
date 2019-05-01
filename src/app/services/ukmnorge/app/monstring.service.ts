import { Injectable } from '@angular/core';
import { MonstringApi } from '../api/monstring.api';
import { Events } from '@ionic/angular';
import { InnslagService } from './innslag.service';
import { HendelserService } from './hendelser.service';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { KontaktService } from './kontakt.service';
import { WpPostService } from './post.service';
import { Hendelse } from '../api/hendelse.models';
import { FilmerService } from './filmer.service';


@Injectable({
	providedIn: 'root'
})
export class MonstringService extends Events {
	private id: Number;
	private path: String;
	private services = new Map();

	constructor(
		private monstringApi: MonstringApi,
		private storageService: StorageService,
		private http: HttpClient,
		private networkService: NetworkService
	) {
		super();
	}

	public setId(id: Number, path: String) {
		//console.log('MonstringService::setId(' + id + ')');
		//console.log('MonstringService::setPath(' + path + ')');
		this.id = id;
		this.path = path;
		this.services = new Map(); // Reloader alle services
	}

	public removeId() {
		//console.warn('MonstringService:: REMOVE ID (howto?)');
	}

	/**
	 * Henter data om mønstringen
	 * 
	 * @returns observable
	 */
	public getInfo() {
		return this.getData();
	}
	public getData() {
		return this.monstringApi.getData(this.id);
	}

	public getMonstringer() {
		return this.monstringApi.getMonstringer();
	}

	public getMonstringLand() {
		return this.monstringApi.getData( 'land-' + new Date().getFullYear() );
	}

	public getInnslagTyper() {
		return this.monstringApi.getInnslagTyper();
	}

	/**
	 * Hent en collection for mønstringen
	 * 
	 * F.eks hendelser-collection vil inneholde alle
	 * hendelser mønstringen har, og kan brukes til utlistinger
	 * 
	 * @param id 
	 */
	public getServ(id) {
		if (this.services.has(id)) {
			return this.services.get(id);
		}
		return this._initService(id);
	}

	public getHendelser(): HendelserService {
		return this.getServ('hendelser');
	}

	public getInnslag(): InnslagService {
		return this.getServ('innslag');
	}

	public getKontakter(): KontaktService {
		return this.getServ('kontakter');
	}

	public getPosts(): WpPostService {
		return this.getServ('posts');
	}

	public getFilmer(): FilmerService {
		return this.getServ('filmer');
	}

	/**
	 * Oppretter en service som ikke enda finnes. Black magic (👻) -ish. 
	 * 
	 * @param id 
	 */
	private _initService(id) {
		let service = null;
		switch (id) {
			case 'hendelser':
				service = new HendelserService(
					this.id,
					this.storageService,
					this.http,
					this.networkService
				);
				break;
			case 'innslag':
				service = new InnslagService(
					this.id,
					this.storageService,
					this.http,
					this.networkService
				);
				break;
			case 'kontakter':
				service = new KontaktService(
					this.id,
					this.storageService,
					this.http,
					this.networkService
				);
				break;
			case 'posts':
				service = new WpPostService(
					this.id,
					this.path,
					this.storageService,
					this.http,
					this.networkService
				);
				break;
			case 'filmer':
				service = new FilmerService(
					this.id,
					this.storageService,
					this.http,
					this.networkService
				);
				break;
			default:
				throw new Error('Could not find service ' + id);
		}
		this.services.set(id, service);
		return service;
	}
}
