import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { PlaceholderMonstring, Monstring } from './monstring.models';
import { NetworkService } from '../utils/network.service';
import { ApiRequest } from './api.models';

@Injectable({
	providedIn: 'root'
})
export class MonstringApi extends ApiService {
	private title: String;
	public url = 'https://api.ukm.no/2.0/monstringer/#monstring_id';
	public urlInnslag = 'https://api.ukm.no/2.0/monstring-#monstring_id/innslag/'
	public urlMonstringer = 'https://api.ukm.no/2.0/monstringer/';

	constructor(
		private _storageService: StorageService,
		private _http: HttpClient,
		private _networkService: NetworkService
	) {
		super(
			'MonstringApi',
			_storageService,
			_http,
			_networkService
		);
		this.title = super.getId();
	}

	public getMonstringer() {
		return this.request(
			new ApiRequest(
				'collection',
				'Alle',
				this.urlMonstringer,
				this.title,
				new PlaceholderMonstring()
			)
		);
	}
	
	public getData(monstring_id) {
		return this.request(
			new ApiRequest(
				'object',
				monstring_id,
				this.getUrl( monstring_id ),
				this.title,
				new PlaceholderMonstring()
			)
		);
	}

	public validate( data: Monstring ) {
		data.start = new Date( data.start );
		data.stop = new Date( data.stop );
		return data;
	}
	public validateCollection( data: Monstring[] ) {
		return data;
	}
}
