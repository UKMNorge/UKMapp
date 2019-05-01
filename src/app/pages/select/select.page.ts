import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { NetworkService, ConnectionStatus } from 'src/app/services/ukmnorge/utils/network.service';
import { AlertController } from '@ionic/angular';
import { PlaceholderUser } from 'src/app/services/ukmnorge/api/user.model';

@Component({
	selector: 'app-page-select',
	templateUrl: 'select.page.html',
	styleUrls: ['select.page.scss']
})
export class SelectPage {

	public monstringer = null;
	public connected = false;
	public innslag_typer = null;

	public selectedFylke = null;
	public selectedType = null;
	public user = null;

	public monstring_land = null;


	constructor(
		private monstringService: MonstringService,
		private activeService: ActiveService,
		private networkService: NetworkService,
		private alertController: AlertController
	) {
		this.bindConnectionStatus();
	}

	public bindConnectionStatus() {
		let self = this;
		this.networkService.change().subscribe(
			connectionStatus => {
				//console.log('CONNECTED == '+ (connectionStatus == ConnectionStatus.Online ? 'true' : 'false'));
				self.connected = connectionStatus == ConnectionStatus.Online;
			}
		);
	}
	ngOnInit() {
		let self = this;
		// Hent alle mønstringer
		this.monstringService.getMonstringer().subscribe(
			data => {
				self.monstringer = data;
				//console.log('DATA WAS', data);
			}
		);
		// Hent typer innslag man kan velge
		this.monstringService.getInnslagTyper().subscribe(
			data => {
				self.innslag_typer = data;
			}
		);

		this.loadLandsmonstring();
	}

	loadLandsmonstring() {
		let self = this;

		let loader = this.monstringService.getMonstringLand();
		loader.subscribe(
			data => {
				self.monstring_land = data;
			}
		)
		return loader;
	}

	velgMonstring(monstring, user) {
		//console.log('SelectPage:velgMonstring', monstring);
		this.activeService.showApp(monstring.id, monstring.url);
		this.activeService.setUser(user);
	}

	velgFylke(id) {
		console.log('Velg fylke', id);
		for (let i = 0; i < this.monstringer.length; i++) {
			console.log(this.monstringer[i].fylke.id + ' == ' + id + ' = ' + (this.monstringer[i].fylke.id == id ? 'true' : 'false'));
			if (this.monstringer[i].fylke.id == id) {
				this.selectedFylke = this.monstringer[i];
				return true;
			}
		}
		return false;
	}
	velgType(id) {
		for (let i = 0; i < this.innslag_typer.length; i++) {
			console.log(this.innslag_typer[i].key + ' == ' + id + ' = ' + (this.innslag_typer[i].key == id ? 'true' : 'false'));
			if (this.innslag_typer[i].key == id) {
				this.selectedType = this.innslag_typer[i];
				return true;
			}
		}
		return false;
	}

	async thisIsMe() {
		// TODO: til neste år må denne velge mønstring ut fra valgt fylke,
		// ikke statisk til den nasjonale festivalen.
		console.log(this.selectedFylke, this.selectedType);
		if (this.selectedFylke == null || this.selectedType == null) {
			const alert = await this.alertController.create({
				header: 'Du må velge både fylke og type deltaker'
			});
			await alert.present();
			return false;
		}

		if (this.monstring_land == null) {
			const alert = await this.alertController.create({
				header: 'Oh, trøbbel! 😢',
				message: 'Appen klarte ikke å hente informasjon om festivalen. Koble til nett, og trykk på knappen igjen.'
			});
			await alert.present();


			// Reload mønstring
			let self = this;
			let loader = this.loadLandsmonstring();
			// Gå videre etter valgt mønstring
			loader.subscribe(
				data => {
					self.velgMonstring(this.monstring_land, this.user);
				}
			);
			return false;
		}

		let user = this.getUser();
		user.fylke = this.selectedFylke;
		user.type = this.selectedType;
		this.velgMonstring(this.monstring_land, this.user);
		return true;
	}

	public getUser() {
		if (this.user == null) {
			this.user = new PlaceholderUser();
		}
		return this.user;
	}
}
