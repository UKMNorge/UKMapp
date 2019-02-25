import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { WpPostApi } from '../wordpress/post.api';


@Injectable({
	providedIn: 'root'
})
export class WpPostService extends Events {
	private postApi: WpPostApi;
	constructor( 
		private monstring_id: Number,
		private monstring_path: String,
		private storageService: StorageService,
		private http: HttpClient,
		private _networkService: NetworkService
	) {
		super();
		this.postApi = new WpPostApi(
			monstring_id,
			monstring_path,
			this.storageService,
			this.http,
			_networkService
		);
	}

	public get( id ) {
		return this.postApi.get( id );
	}

	public getDetaljer( id ) {
		return this.postApi.getDetaljer( id );
	}

	public getFrontlist() {
		return this.postApi.getFrontlist();
	}

	public getInfo() {
		return this.postApi.getInfo();
	}

	public getCategory( id ) {
		return this.postApi.getCategory( id );
	}
}