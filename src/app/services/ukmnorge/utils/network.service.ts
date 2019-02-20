import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export enum ConnectionStatus {
	Online,
	Offline
}
// REFERENCE
// https://devdactic.com/ionic-4-offline-mode/
@Injectable({
	providedIn: 'root'
})
export class NetworkService {

	private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Online);

	constructor() {	
	}

	public change(): Observable<ConnectionStatus> {
		return this.status.asObservable();
	}

	public goOnline() {
		this.status.next( ConnectionStatus.Online );
	}
	public goOffline() {
		this.status.next( ConnectionStatus.Offline );
	}
}
