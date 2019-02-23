import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-page-info',
	templateUrl: 'info.page.html',
	styleUrls: ['info.page.scss']
})
export class InfoPage {
	public kontaktpersoner = null;
	public info = null;

	constructor(
		private monstringService: MonstringService,
		private navCtrl: NavController
	) {

	}

	ngOnInit() {
		let self = this;

		this.monstringService.getKontakter().getMonstring().subscribe(
			kontaktpersoner => {
				self.kontaktpersoner = kontaktpersoner;
			}
		)

		this.monstringService.getPosts().getInfo().subscribe(
			pages => {
				self.info = pages;
			}
		)
	}

	visInfo(id) {
		this.navCtrl.navigateForward(
			'app/app/info/post/'+ id
		);
	}

	ringKontakt(nummer: string) {
		console.error('TODO: @mariusmandal IMPLEMENT THIS')
		/*
		this.callNumber.callNumber(nummer, true)
			.then(res => console.log('Launched dialer!', res))
			.catch(err => console.log('Error launching dialer', err));
		*/
	}
}
