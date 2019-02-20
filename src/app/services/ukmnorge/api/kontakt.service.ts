import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { ApiRequest } from './api.models';
import { Kontakt } from './kontakt.models';

@Injectable({
	providedIn: 'root'
})
export class KontaktApi extends ApiService {
	private title: String;
	public urlCollection = 'https://api.ukm.no/2.0/monstring-#monstring_id/kontakter/';
	public urlObject = this.urlCollection +'#id'

	constructor(
		private monstring_id: Number,
		private _storageService: StorageService,
		private _http: HttpClient,
		private _networkService: NetworkService
	) {
		super(
			'KontaktApi',
			_storageService,
			_http,
			_networkService
		);
		this.title = super.getId();
	}

	
	public getMonstring() {
		return this.request(
			new ApiRequest(
				'collection',
				'Monstring',
				this.urlCollection.replace('#monstring_id', this.monstring_id.toString() ),
				this.title,
				[]
			)
		);
	}

	public validate( data:Kontakt ) {	
		return data;
	}
	public validateCollection( data ) {
		return data;
	}
}
