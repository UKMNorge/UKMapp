import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	constructor(
		public navCtrl: NavController,
		private storageProvider: StorageProvider
	) {
	}
	
	unsetFylke() {
		this.storageProvider.unit('APP').remove('monstring');
	}
}
