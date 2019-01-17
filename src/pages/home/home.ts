import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapPage } from '../map/map';
import { StorageProvider } from '../../providers/storage';
import { MonstringProvider } from '../../providers/ukm/monstring';
import { KontaktCollectionProvider } from '../../providers/ukm/kontakt.collection';
import { WordpressProvider } from '../../providers/wordpress';
import { SingleInfoPage } from '../info/single';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
	public monstring = null;
	public nyheter = null;
	public singlenyhet = null;
	public kontaktpersoner = null;

	constructor(
		public navCtrl: NavController,
		private storageProvider: StorageProvider,
		private monstringProvider: MonstringProvider,
		public wordpressProvider: WordpressProvider
		) {
		let self = this;
		let storage = this.storageProvider.unit('APP');
		console.log( storage );
		if( storage != null ) {
			storage.get('monstring').then(
				( monstring_id ) => {
					self.setMonstringId( monstring_id );

					// 
					self.monstringProvider.getKontaktCollectionProvider().then(
						(kontaktCollectionProvider:KontaktCollectionProvider) => 
						{
							console.group('KONTAKTPERSONER');
							kontaktCollectionProvider.load();
							self.kontaktpersoner = kontaktCollectionProvider;	
							console.info("Logging self.kontaktpersoner: ", self);
							
						}
					);
				}
			)
		}

	 	this.nyheter = this.wordpressProvider.getCategoryProvider('nyheter');
	}

	public setMonstringId( monstring_id ) {
		let self = this;
		this.monstringProvider.subscribe('update', (_monstring) => {
			self.monstring=_monstring;
		});
		self.monstringProvider.get( monstring_id ).then( 
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

	visNyhet( item ) {
		this.navCtrl.push(
			SingleInfoPage,
			{
				item: item
			}
		)
	}
}
