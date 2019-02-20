import { Injectable } from '@angular/core';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { StorageUnit } from '../utils/storage/unit';
import { Events } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NetworkService, ConnectionStatus } from '../utils/network.service';
import { ApiRequest } from './api.models';


@Injectable({
	providedIn: 'root'
})
export abstract class ApiService extends Events {
	private hasTheInternet = true;

	private queue = new Map();

	public url: string;
	private storageUnit: StorageUnit;

	abstract validate(data);
	abstract validateCollection(data);

	constructor(
		private id,
		private storageService: StorageService,
		private http: HttpClient,
		private networkService: NetworkService
	) {
		super();
		this.storageUnit = new StorageUnit(
			id,
			this.storageService.getStorage()
		);
		let self = this;
		this.networkService.change().subscribe(
			status => {
				self.setConnectionStatus( status == ConnectionStatus.Online );
			}
		)
	}

	private setConnectionStatus( status: boolean ) {
		this.hasTheInternet = status;
	}

	public hasNetworkConnection() {
		return this.hasTheInternet;
	}
	/**
	 * Initiate API request.
	 * 
	 * First query localstorage, then query API.
	 * If offline, the request is queued for later processing.
	 * 
	 * @param url 
	 * @return Observable
	 */
	public request(apiRequest) {
		let self = this;
		console.log('ApiService::request(' + apiRequest.getId() + ': ' + apiRequest.getUrl() + ')');
		return new Observable(observer => {
			self.requestStorage(apiRequest).then(
				(data) => {
					observer.next(data);

					self.requestApi(apiRequest).then(
						(data) => {
							observer.next(data);
						}
					);
				}
			)
		});
	}


	/**
	 * Request values from localstorage.
	 * 
	 * Will check localstorage for requested object ID.
	 * If not found, placeholder is returned.
	 * 
	 * API request will be queued if not online atm.
	 * 
	 * @param url 
	 * @return Promise
	 */
	public requestStorage(apiRequest) {
		console.log('ApiService::requestStorage(' + apiRequest.getId() + ')');

		let self = this;
		// DEVELOPMENT (fake offline, and fire requests after a couple of seconds)
		setTimeout(() => { self.next() }, 2500);

		return new Promise(
			(resolve) => {
				this.storageUnit.get(apiRequest.getId()).then(
					(data) => {
						if (null == data) {
							resolve(apiRequest.getPlaceholder());
						}
						if (apiRequest.getType() == 'collection' && Array.isArray(data)) {
							data = self.loadAllOfCollection(apiRequest, data);
						}
						resolve(data);
					}
				);
			}
		);
	}

	/**
	 * Fetch all child elements from localstorage
	 * 
	 * @param apiRequest 
	 * @param collection 
	 */
	async loadAllOfCollection(apiRequest, collection) {
		let list = [];
		let objectStorage = this.storageService.create(apiRequest.getApi());

		for (let i = 0; i < collection.length; i++) {
			await objectStorage.get(collection[i]).then(
				object_data => {
					list.push(object_data);
				}
			);
		}
		return list;
	}

	/**
	 * Request values from real API
	 * 
	 * Fires or queues request according to network status
	 * 
	 * @param url 
	 * @return Promise
	 */
	public requestApi(apiRequest) {
		let self = this;
		console.log('ApiService::requestApi(' + apiRequest.getId() + ': ' + apiRequest.getUrl() + ')');
		return new Promise(
			(resolve) => {
				apiRequest.setResolve(resolve);
				if (!this.hasNetworkConnection()) {
					self.queueApiRequest(apiRequest);
				} else {
					self.fireApiRequest(apiRequest);
				}
			}
		)
	}

	/**
	 * Actually fire an API request
	 * 
	 * @param String url 
	 * @param Function resolve 
	 */
	public fireApiRequest(apiRequest) {
		let self = this;
		this.http.get(apiRequest.getUrl()).subscribe((data) => {
			apiRequest.setData(data);
			self.handleApiResponse(self, apiRequest);
		});
	}

	/**
	 * Go through api response to fix storage of both collections and objects
	 * 
	 * @param self 
	 * @param apiResponse 
	 */
	public handleApiResponse(self, apiResponse) {
		let data = null;
		if( apiResponse.getType() == 'collection' ) {
			data = self.validateCollection(apiResponse.getData());
		} else {
			data = self.validate( apiResponse.getData() );
		}
		console.log('ApiService::requestApi(' + apiResponse.getUrl() + ') promised to return', data);
		console.log(apiResponse.getType());

		// If collection, build an ID list, and store both ID list and object data
		if (apiResponse.getType() == 'collection') {
			let list = [];
			let childClassStorageUnit = self.storageService.create(apiResponse.getApi());
			data.forEach(
				(objectData) => {
					objectData = self.validate( objectData );
					list.push(objectData.id);
					childClassStorageUnit.set(objectData.id, objectData);
				}
			)
			self.storageUnit.set(apiResponse.getId(), list);
		}
		// If object, store object data
		else {
			self.storageUnit.set(apiResponse.getId(), data);
		}

		// Always resolve all data
		// Lists containing children will then render nicely without double-loading
		apiResponse.getResolve()(data);
	}

	/**
	 * Queue an API request for later execution
	 * 
	 * @param url 
	 * @param resolve 
	 */
	public queueApiRequest(apiRequest) {
		this.queue.set(apiRequest.getId(), apiRequest);
	}

	/**
	 * Fire queued API requests.
	 * Should probably not fire all at once #happygolucky
	 * 
	 */
	public next() {
		let self = this;
		/*
		DEVELOP: bypass offline
		if( !this.hasNetworkConnection() ) {
			return;
		}
		*/
		self.queue.forEach(
			(requestData, id, map) => {
				let apiRequest = new ApiRequest(
					requestData.type,
					requestData.id,
					requestData.url,
					requestData.api,
					requestData.placeholder,
				);
				apiRequest.setResolve(requestData.resolve);

				console.log('ApiService::next(' + apiRequest.getUrl() + ')');
				self.fireApiRequest(apiRequest)
				map.delete(apiRequest.getId());
			}
		)
	}

	/**
	 * Default getUrl function
	 * 
	 * @param id 
	 */
	public getUrl(id) {
		return this.url.replace('#monstring_id', id);
	}

	public getId() {
		return this.id;
	}
}
