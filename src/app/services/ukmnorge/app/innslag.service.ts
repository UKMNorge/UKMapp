import { Injectable } from '@angular/core';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { InnslagApi } from '../api/innslag.api';
import { NetworkService } from '../utils/network.service';

@Injectable({
	providedIn: 'root'
})
export class InnslagService {
	
	private innslagApi: InnslagApi;

	constructor( 
		private monstring_id: Number,
		private storageService: StorageService,
		private http: HttpClient,
		private _networkService: NetworkService
	) {
		this.innslagApi = new InnslagApi(
			monstring_id,
			this.storageService,
			this.http,
			_networkService
		);
	}
	

	public getMonstringInnslag() {
		return this.innslagApi.getMonstringInnslag();
	}

	public getHendelse( id ) {
		return this.innslagApi.getHendelse( id );
	}

	public getDetaljer( id ) {
		return this.innslagApi.getDetaljer( id );
	}
}