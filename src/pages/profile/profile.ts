import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage';
import { MonstringProvider } from '../../providers/ukm/monstring';
import { WordpressProvider } from '../../providers/wordpress';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	public monstring = null;

	constructor(
		public navCtrl: NavController,
		private storageProvider: StorageProvider,
		private monstringProvider: MonstringProvider,
		public wordpressProvider: WordpressProvider,
	) {
		let self = this;
		let storage = this.storageProvider.unit('APP');
		console.log(storage);
		if (storage != null) {
			storage.get('monstring').then(
				(monstring_id) => {
					self.setMonstringId(monstring_id);
				}
			)
		}

	}

	public setMonstringId(monstring_id) {
		let self = this;
		this.monstringProvider.subscribe('update', (_monstring) => {
			self.monstring = _monstring;
		});
		self.monstringProvider.get(monstring_id).then(
			(monstring) => {
				self.monstring = monstring;
			}
		).catch((error) => {
			console.error('WTF');
			console.error(error);
		});
	}

	unsetFylke() {
		this.storageProvider.unit('APP').remove('monstring');
	}
}
