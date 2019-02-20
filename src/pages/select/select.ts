import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { MonstringerProvider } from '../../providers/ukm/monstringer.collection';
import { StorageProvider } from "../../providers/storage/storage";

@Component({
  selector: 'page-select',
  templateUrl: 'select.html'
})
export class SelectPage {
	
	loading = false;

	constructor(
		public navCtrl: NavController, 
		public events: Events, 
		public alertCtrl: AlertController, 
		public monstringerProvider: MonstringerProvider,
		private storageProvider: StorageProvider
	) {
		this.monstringerProvider.load();
	}
	
	brukPosisjon() {
		console.log( this.monstringerProvider.data );
		//this.monstringProvider.load(4897, 'TEST ME');
		let alert = this.alertCtrl.create({
			title: 'Oh nooo!',
			subTitle: 'Denne funksjonen finnes ikke enda 🤫',
			buttons: ['OK']
		});
		alert.present();
	}

	velgMonstring( monstring ) {
		console.log('SelectPage:velgMonstring', monstring);
		this.loading = true;
		console.warn( this.storageProvider );
		console.log( this.storageProvider.unit('APP') );
		this.storageProvider.unit('APP').set('monstring', monstring.id);
		this.loading = false;
	}
}