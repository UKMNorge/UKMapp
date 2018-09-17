import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class Globals {
	public monstring_id:number = null;


	constructor( private storage: Storage, public events: Events ) {
	}
	
	
	set( key, value ) {
		this[ key ] = value;
		
		this.storage.set(key, value).then(
			(data) => {
				this.events.publish('globals:'+key, data );
			}
		);
	}

	get( key ) {
		if( this[ key ] == undefined ) {
			return null;
		}
		return this[ key ];
	}
	
	init() {
		this.load( 'fylke' );
		this.load( 'monstring_id' );
	}
	
	load( key ) {
		this.storage.get( key ).then(
			(data) => {
				this[key] = data;
				this.events.publish('globals:'+ key, data);
			}
		)
	}
	
	subscribe( key, callback ) {
		this.events.subscribe('globals:'+ key, callback);
	}
	
}