import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { ApiRequest } from './api.models';
import { Hendelse, PlaceholderHendelse } from './hendelse.models';

@Injectable({
	providedIn: 'root'
})
export class HendelseApi extends ApiService {
	private title: String;
	public urlCollection = 'https://api.ukm.no/2.0/monstring-#monstring_id/program/';
	public urlObject = this.urlCollection +'#id'

	constructor(
		private monstring_id: Number,
		private _storageService: StorageService,
		private _http: HttpClient,
		private _networkService: NetworkService
	) {
		super(
			'HendelseApi',
			_storageService,
			_http,
			_networkService
		);
		this.title = super.getId();
	}

	
	public getMonstringProgram() {
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

	public get( id ) {
		return this.request(
			new ApiRequest(
				'object',
				id,
				this.urlObject.replace('#monstring_id', this.monstring_id.toString() ).replace('#id', id),
				this.title,
				new PlaceholderHendelse()
			)
		);
	}

	public validate( data:Hendelse ) {
		return data;
		/*
		var now = new Date();
		data.navn = data.navn + ' @ '+ now.getHours() +':'+ now.getMinutes() +':'+ now.getSeconds();
		return data;
		*/
	}
	public validateCollection( data ) {
		return data;
	}
}
