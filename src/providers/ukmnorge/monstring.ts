import { Injectable } from '@angular/core';
import { ApiProvider } from './api';
import { Storage } from '@ionic/storage';

import { Monstring, MonstringInterface } from '../../providers/ukmnorge/models/monstring';

/*
  Generated class for the MonstringProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonstringProvider {
	data: Monstring;
	id: false;

	constructor(private api: ApiProvider, public storage: Storage ) {
	}

	getFylkeMonstring( fylke_id ) {
		return this.getMonstring( 'fylke-'+fylke_id );
	}
	
	getMonstring( id ) {
		if ( this.id == id && this.data ) {
			// already loaded data
			return Promise.resolve( this.data );
		}
		this.id = id;
		return new Promise(resolve => {
			this.api.getMonstring( id ).subscribe( (data: MonstringInterface) => {
				this.data = new Monstring( data );
				resolve( this.data );
			})
		});
	}
}