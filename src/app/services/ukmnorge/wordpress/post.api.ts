import { Injectable } from '@angular/core';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { ApiService } from '../api/api.service';
import { ApiRequest } from '../api/api.models';
import { PlaceholderWpPostDetaljer, PlaceholderWpPost } from './post.models';

@Injectable({
	providedIn: 'root'
})
export class WpPostApi extends ApiService {
	private title: String;
	private endpoint: String;

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
		this.endpoint = this.monstring_path+ 'wp-json/UKM/';
	}

	public validate( data ) {
		return data;
	}

	public validateCollection( data ) {
		return data;
	}

	public get( id ) {
		return this._requestObject( id, 'post/'+id, new PlaceholderWpPost() );
	}

	public getDetaljer( id ) {
		return this._requestObject( 'Detaljer|'+id, 'content/'+id, new PlaceholderWpPostDetaljer() );
	}

	public getFrontlist() {
		return this._requestList( 'nyheter' );
	}

	public getInfo() {
		return this._requestList( 'informasjon' );
	}

	public getCategory( id ) {
		return this._requestWpList( id );
	}

	private _requestObject( id, endpoint, placeholder ) {
		return this.request(
			new ApiRequest(
				'object',
				id,
				this.endpoint + endpoint,
				this.title,
				placeholder
			)
		);
	}
	
	private _requestList( id ) {
		return this.request(
			new ApiRequest(
				'collection',
				id[0].toUpperCase() + id.substring(1),
				this.endpoint + id,
				this.title,
				[]
			)
		);
	}

	private _requestWpList( id ) {
		return this.request(
			new ApiRequest(
				'collection',
				'CategoryId|'+ id,
				this.endpoint + 'kategori/' + id,
				this.title,
				[]
			)
		);
	}
}