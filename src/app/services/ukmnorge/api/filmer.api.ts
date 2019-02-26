import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { ApiRequest } from './api.models';
import { UKMTV, PlaceholderUKMTV } from './filmer.models';

@Injectable({
	providedIn: 'root'
})
export class FilmerApi extends ApiService {
	private title: String;
	public url = 'https://api.ukm.no/2.0/filmer/';
	
	constructor(
		private monstring_id: Number,
		private _storageService: StorageService,
		private _http: HttpClient,
		private _networkService: NetworkService
	) {
		super(
			'FilmerApi',
			_storageService,
			_http,
			_networkService
		);
		this.title = super.getId();
	}

	public getMonstringFilmer() {
		return this.request(
			new ApiRequest(
				'collection',
				'Monstring',
				this.url,
				this.title,
				new PlaceholderUKMTV()
			)
		);
	}

	public getMonstringSiste() {
		return this.request(
			new ApiRequest(
				'collection',
				'MonstringSiste',
				this.url +'siste/',
				this.title,
				new PlaceholderUKMTV()
			)
		);
	}
	
	public validate( data: UKMTV ) {
		return data;
	}
	public validateCollection( data: UKMTV[] ) {
		return data;
	}
}
