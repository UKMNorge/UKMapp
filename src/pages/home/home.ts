import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapPage } from '../map/map';
import { StorageProvider } from '../../providers/storage';
import { MonstringProvider } from '../../providers/ukm/monstring';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
	public monstring = null;
	
	constructor(
		public navCtrl: NavController,
		private storageProvider: StorageProvider,
		private monstringProvider: MonstringProvider
	) {
		let self = this;
		this.storageProvider.unit('APP').get('monstring').then(
			( monstring_id ) => {
				self.setMonstringId( monstring_id );
			}
		)
	}

	public setMonstringId( monstring_id ) {
		let self = this;
		this.monstringProvider.subscribe('update', (_monstring) => {
			self.monstring=_monstring
		});
		this.monstringProvider.get( monstring_id ).then( 
			( monstring ) =>
			{
				self.monstring = monstring;
			}
		).catch( (error) => {
			console.error('WTF');
			console.error( error );
		} );
	}
	
	visKart() {
		this.navCtrl.push( MapPage );
	}
}