import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export enum ConnectionStatus {
	Offline,
	Online
}
// REFERENCE
// https://devdactic.com/ionic-4-offline-mode/
@Injectable({
	providedIn: 'root'
})
export class NetworkService {

	private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Online);

	constructor() {	
		this.status.subscribe(
			status => {
				console.log('NETWORK MONITOR: Now '+ (this.getStatus() ? 'online' : 'offline'));
			}
		)
	}

	public change(): Observable<ConnectionStatus> {
		return this.status.asObservable();
	}

	public getStatus() {
		return this.status.value;
	}

	public isOnline() {
		return this.getStatus();
	}
	public isOffline() {
		return !this.getStatus();
	}

	public goOnline() {
		this.status.next( ConnectionStatus.Online );
	}
	public goOffline() {
		this.status.next( ConnectionStatus.Offline );
	}
}
