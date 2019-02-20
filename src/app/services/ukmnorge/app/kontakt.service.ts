import { Injectable } from '@angular/core';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { KontaktApi } from '../api/kontakt.service';

@Injectable({
	providedIn: 'root'
})
export class KontaktService {
	
	private kontaktApi: KontaktApi;

	constructor( 
		private monstring_id: Number,
		private storageService: StorageService,
		private http: HttpClient,
		private _networkService: NetworkService
	) {
		this.kontaktApi = new KontaktApi(
			monstring_id,
			this.storageService,
			this.http,
			_networkService
		);
	}
	

	public getMonstring() {
		return this.kontaktApi.getMonstring();
	}
}