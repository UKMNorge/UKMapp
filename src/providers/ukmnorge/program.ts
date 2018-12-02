import { Injectable } from '@angular/core';

import { ApiProvider } from './api';
import { StorageProvider } from '../storage';

@Injectable()
export class ProgramProvider {
	private monstring_id:number = 0;
	private data = null;
	
	public innslag = null;
	
	constructor(
		private api: ApiProvider,
		private storageProvider: StorageProvider
	) {
	}

	get() {
		let monstring_id = this.storageProvider.unit('APP').get('monstring');
		if ( this.monstring_id == monstring_id && this.data ) {
			// already loaded data
			return Promise.resolve( this.data );
		}
		
		this.monstring_id = monstring_id;
		return new Promise(resolve => {
			this.api.getProgram( this.monstring_id ).subscribe( (data) => {
				this.data = data;
				resolve( this.data );
			})
		});
	}
	
	getProgram( hendelse_id ) {
		console.info('GetProgram');
		return new Promise(resolve => {
			this.api.getDetaljProgram( this.monstring_id, hendelse_id ).subscribe( (data) => {
				console.log('Got program');
				console.log( data );
				this.innslag = data;
				resolve( this.data );
			})
		});
	}
}