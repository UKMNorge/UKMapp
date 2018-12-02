import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

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
		public programProvider: ProgramProvider,
		private browserTab: BrowserTab
	) {
		let id = this.navParams.get('id');

		this.programProvider.getProgram( id ).then( (data) => {
			console.log(data);
		});
	}
	
	visInnslag( id ) {

		//let url = 'https://ukm.no/'+ this.globals.get('fylke').link +'/pameldte/'+ id +'/';
		/*
		this.browserTab.isAvailable()
		.then(isAvailable => {
			if (isAvailable) {
				this.browserTab.openUrl( url );
			} else {
			// open URL with InAppBrowser instead or SafariViewController
			console.log('bah');
			alert('dooo something');
			}
		});
		*/
		alert('uh-oh');
	}

}




@Component({
  selector: 'page-program',
  templateUrl: 'program.html'
})
export class ProgramPage {

	constructor(
		public navCtrl: NavController,
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