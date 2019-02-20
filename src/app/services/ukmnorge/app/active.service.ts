import { Injectable } from '@angular/core';
import { StorageService } from '../utils/storage/storage.service';
import { NavController } from '@ionic/angular';
import { MonstringService } from './monstring.service';

@Injectable({
	providedIn: 'root'
})
export class ActiveService {
	private active = 'select';
	private app_storage = null;

	constructor(
		private storageService: StorageService,
		private navCtrl: NavController,
		private monstringService: MonstringService,
	){
		this.app_storage = this.storageService.create('APP');
	}


	public showApp( id, path ) {
		if( this.active == 'app' ) {
			return true;
		}
		
		// TODO: @mariusmandal Vis loader-ish page
		
		// Set data for mønstringService
		this.monstringService.setId( id, path );
		// Hent mønstringen og vis siden
		this.monstringService.getData().subscribe(
			(monstring) => {
				if (monstring == null || monstring == undefined) {
					throw new Error('Beklager, klarte ikke å hente mønstringens url');
					// TODO: @mariusmandal Håndter denne i GUI
				}
				this.navCtrl.navigateForward('app/app/hjem');
				// TODO: @mariusmandal UNSUBSCRIBE !!
			}
		);
		this.active = 'app';
	}

	public showSelect() {
		if( this.active == 'select') {
			return true;
		}

		// TODO: @mariusmandal Vis loader-ish page (?)

		this.navCtrl.navigateRoot('');
		this.monstringService.removeId();
		this.app_storage.clear();
		this.active = 'select';
	}
}