import { Injectable } from '@angular/core';
import { HendelseApi } from '../api/hendelse.api';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { FilmerApi } from '../api/filmer.api';

@Injectable({
	providedIn: 'root'
})
export class FilmerService {
	
	private filmerApi: FilmerApi;

	constructor( 
		private monstring_id: Number,
		private storageService: StorageService,
		private http: HttpClient,
		private _networkService: NetworkService
	) {
		this.filmerApi = new FilmerApi(
			monstring_id,
			this.storageService,
			this.http,
			_networkService
		);
	}
	
	public getMonstringFilmer() {
		return this.filmerApi.getMonstringFilmer();
	}

	public getMonstringSiste() {
		return this.filmerApi.getMonstringSiste();
	}

}