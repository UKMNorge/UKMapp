import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { Globals } from '../../providers/app/globals';

import { ProgramProvider } from '../../providers/ukmnorge/program';

import { BrowserTab } from '@ionic-native/browser-tab';

@Component({
	selector: 'page-hendelse',
	templateUrl: 'hendelse.html',
	providers: [BrowserTab]
})
export class HendelsePage {
	constructor(
		private navParams: NavParams,
		public navCtrl: NavController,
		public globals: Globals,
		public programProvider: ProgramProvider,
		private browserTab: BrowserTab
	) {
		let id = this.navParams.get('id');

		this.programProvider.getProgram( id ).then( (data) => {
			console.log(data);
		});
	}
	
	visInnslag( id ) {
		
		var url = 'https://ukm.no/nord-trondelag/pameldte/146404/';

		this.browserTab.isAvailable()
		.then(isAvailable => {
			if (isAvailable) {
				this.browserTab.openUrl('https://ionic.io');
			} else {
			// open URL with InAppBrowser instead or SafariViewController
			console.log('bah');
			alert('dooo something');
			}
		});
	}

}




@Component({
  selector: 'page-program',
  templateUrl: 'program.html'
})
export class ProgramPage {

	constructor(
		public navCtrl: NavController,
		public globals: Globals,
		public programProvider: ProgramProvider
	) {
		console.info('Program-load');
		this.programProvider.get().then( (data) => {
			console.log(data);
		});
	}

	visDetaljProgram( id ) {
		this.navCtrl.push(
			HendelsePage,
			{
				id: id,
			}
		);
	}
}