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

	private monstring_id: Number = null;
	private monstring_path: String = null;

	constructor(
		private storageService: StorageService,
		private navCtrl: NavController,
		private monstringService: MonstringService,
	) {
		this.app_storage = this.storageService.create('APP');
	}


	public showApp(id, path) {
		this.monstring_id = id;
		this.monstring_path = path;
		// TODO: @mariusmandal Sjekk med router om vi er her eller ikke, for dette funker ikke @ refresh
		if (this.active == 'app') {
			return true;
		}
		// TODO: @mariusmandal Vis loader-ish page

		// Set data for mønstringService
		this.app_storage.set('monstring', {id: id, path: path});
		this.monstringService.setId(id, path);
		// Hent mønstringen og vis siden

		let self = this;
		this.monstringService.getData().subscribe(
			(monstring) => {
				if (monstring == null || monstring == undefined) {
					throw new Error('Beklager, klarte ikke å hente mønstringens url');
					// TODO: @mariusmandal Håndter denne i GUI
				}
				self.navCtrl.navigateForward('app/app/hjem');
				self.active = 'app';
				// TODO: @mariusmandal UNSUBSCRIBE !!
			}
		);
	}

	public getPath() {
		return this.monstring_path;
	}
	public getId() {
		return this.monstring_id;
	}

	public showSelect() {
		console.log('showselect');
		if (this.active == 'select') {
			return true;
		}
		console.log('showing');

		// TODO: @mariusmandal Vis loader-ish page (?)

		this.navCtrl.navigateRoot('/');
		this.monstringService.removeId();
		this.app_storage.clear();
		this.active = 'select';
	}
}