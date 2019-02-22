import { Injectable } from '@angular/core';
import { HendelseApi } from '../api/hendelse.api';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';

@Injectable({
	providedIn: 'root'
})
export class HendelserService {
	
	private hendelseApi: HendelseApi;

	constructor( 
		private monstring_id: Number,
		private storageService: StorageService,
		private http: HttpClient,
		private _networkService: NetworkService
	) {
		this.hendelseApi = new HendelseApi(
			monstring_id,
			this.storageService,
			this.http,
			_networkService
		);
	}
	
	public getMonstringProgram() {
		return this.hendelseApi.getMonstringProgram();
	}

	public get( id ) {
		return this.hendelseApi.get( id );
	}
}