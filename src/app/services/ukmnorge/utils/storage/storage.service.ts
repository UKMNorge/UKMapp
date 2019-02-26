import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { StorageUnit } from './unit';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private units = new Map();
	private status: BehaviorSubject<boolean> = new BehaviorSubject(false);

	/**
	 * Storage unit delegator(?)
	 * @param events 
	 */
	constructor(
		private storage: Storage
	) {
		this.storage.ready().then(() => {
			this.status.next(true);
		});
		console.log('Dobrý den, I\'m StorageService for your units');
	}

	/**
	 * Create a new storage unit
	 * Returned unit supposed to be used in var,
	 * but is also accessible later by calling unit( id )
	 *
	 * @param id string
	 */
	public create(id: string) {
		this.units.set(
			id,
			new StorageUnit(
				id,
				this.storage
			)
		);
		return this.units.get(id);
	}

	public getStatus(): Observable<boolean> {
		return this.status.asObservable();
	}

	/**
	 * Access storage unit by id
	 *
	 * @param id
	 */
	public unit(id: string) {
		return this.units.get(id);
	}

	/**
	 * Clear out all storage for app
	 */
	public clear() {
		this.units.forEach(
			(unit: StorageUnit) => {
				unit.clear();
			}
		)
	}

	public getStorage() {
		return this.storage;
	}
}
