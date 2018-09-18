import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { Globals } from '../../providers/app/globals';

import { Fylker } from '../../providers/ukmnorge/fylker';

@Component({
  selector: 'page-select',
  templateUrl: 'select.html'
})
export class SelectPage {

	fylker: Fylker;
	loading = false;

	constructor(public navCtrl: NavController, public events: Events, public alertCtrl: AlertController, public globals: Globals ) {
		this.fylker = new Fylker();
	}

	brukPosisjon() {
		let alert = this.alertCtrl.create({
			title: 'Oh nooo!',
			subTitle: 'Denne funksjonen finnes ikke enda',
			buttons: ['OK']
		});
		alert.present();
	}

	valgtFylke( fylke ) {
		console.log('SelectPage:valgtFylke', fylke);
		this.loading = true;
		this.globals.set('fylke', fylke);
		this.loading = false;
	}
}
