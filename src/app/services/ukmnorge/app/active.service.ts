import { Injectable } from '@angular/core';
import { StorageService } from '../utils/storage/storage.service';
import { NavController, AlertController } from '@ionic/angular';
import { MonstringService } from './monstring.service';
import { User } from '../api/user.model';

@Injectable({
	providedIn: 'root'
})
export class ActiveService {
	private active = 'select';
	private app_storage = null;

	private monstring_id: Number = null;
	private monstring_path: String = null;
	private user: User = null;

	constructor(
		private storageService: StorageService,
		private navCtrl: NavController,
		private monstringService: MonstringService,
		private alertController: AlertController
	) {
		this.app_storage = this.storageService.create('APP');
	}

	public setUser( user: User ) {
		this.user = user;
		this.app_storage.set('user', user);
	}
	public getUser(): User {
		return this.user;
	}

	public showApp(id, path) {
		this.monstring_id = id;
		this.monstring_path = path;
		// TODO: @mariusmandal Vis loader-ish page

		// Set data for mønstringService
		this.app_storage.set('monstring', {id: id, path: path});
		this.monstringService.setId(id, path);
		// Hent mønstringen og vis siden

		let self = this;
		this.monstringService.getData().subscribe(
			async (monstring) => {
				if (monstring == null || monstring == undefined) {
					const alert = await this.alertController.create( {
						header: 'Oh, trøbbel! 😢',
						message: 'Beklager, klarte ikke å hente mønstringens url.'
					});
					await alert.present();
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
		// TODO: @mariusmandal Vis loader-ish page (?)

		this.navCtrl.navigateRoot('/');
		this.monstringService.removeId();
		this.storageService.clear();
		this.active = 'select';
	}
}