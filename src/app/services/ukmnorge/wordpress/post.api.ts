import { Injectable } from '@angular/core';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { ApiService } from '../api/api.service';
import { ApiRequest } from '../api/api.models';

@Injectable({
	providedIn: 'root'
})
export class WpPostApi extends ApiService {
	private title: String;
	private endpointUKM: String;

	constructor(
		private monstring_id: Number,
		private monstring_path: String,
		private _storageService: StorageService,
		private _http: HttpClient,
		private _networkService: NetworkService
	) {
		super(
			'PostApi',
			_storageService,
			_http,
			_networkService
		);
		this.title = super.getId();
		this.endpointUKM = this.monstring_path+ 'wp-json/UKM/';
	}

	public validate( data ) {
		return data;
	}

	public validateCollection( data ) {
		return data;
	}

	public get( id ) {
		return this._requestObject( id, id, 'post/'+ id );
	}

	public getDetaljer( id ) {
		return this._requestObject( id, 'Detaljer|'+id, 'content/'+ id );
	}

	public getFrontlist() {
		return this._requestList( 'nyheter' );
	}

	public getInfo() {
		return this._requestList( 'informasjon' );
	}

	private _requestObject( id, dbId, endpoint ) {
		return this.request(
			new ApiRequest(
				'object',
				id,
				this.endpointUKM + endpoint,
				this.title,
				[]
			)
		);
	}
	
	private _requestList( id ) {
		return this.request(
			new ApiRequest(
				'collection',
				id[0].toUpperCase() + id.substring(1),
				this.endpointUKM + id,
				this.title,
				[]
			)
		);
	}
}