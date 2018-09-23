import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { BrowserTab } from '@ionic-native/browser-tab';
import { StreamingMedia } from '@ionic-native/streaming-media';

import { Globals } from '../../providers/app/globals';

import { ProgramProvider } from '../../providers/ukmnorge/program';
import { ApiProvider } from '../../providers/ukmnorge/api';

@Component({
	selector: 'page-hendelse',
	templateUrl: 'hendelse.html'
})
export class HendelsePage {
	constructor(
		private navParams: NavParams,
		public navCtrl: NavController,
		public globals: Globals,
		public programProvider: ProgramProvider
	) {
		let id = this.navParams.get('id');

		this.programProvider.getProgram( id ).then( (data) => {
			console.log(data);
		});
	}
	visInnslag( id ) {
		//let url = 'https://ukm.no/'+ this.globals.get('fylke').link +'/pameldte/'+ id +'/';
		//alert(id);
		this.navCtrl.push(
			InnslagPage,
			{
				innslagId: id,
			}
		)
	}
}

@Component({
  selector: 'page-innslag',
  templateUrl: 'innslag.html'
})
export class InnslagPage {
	constructor(
		private navParams: NavParams,
		public navCtrl: NavController,
		public globals: Globals,
		public browserTab: BrowserTab,
		private streamingMedia: StreamingMedia,
		public programProvider: ProgramProvider,
		public apiProvider: ApiProvider
	) {
		let innslagId = this.navParams.get('innslagId');
		this.programProvider.getInnslagDetalj( innslagId ).then( (data) => {
			console.log("Got innslag: " + data);
		});
	}
	spillFilm( url ) {
		console.log(this.apiProvider.TV_URL + url);
		this.streamingMedia.playVideo(this.apiProvider.TV_URL + url);

		// FOR USING BROWSERTAB -> Opens in app -> not in native web-browser.
		/*
		this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl(film_url);
      } else {
        // open URL with InAppBrowser instead or SafariViewController
      }
    });
		*/

		// FOR USING NATIVE WEB-BROWSER
		//const browser = this.iab.create(film_url, '_blank');

		//browser.on('loadstop').subscribe(event => {
		// 	browser.insertCSS({ code: "#UKMheader{display:none;}" });
		//});

		//browser.close();
		/*this.navCtrl.push(
			FilmPage,
			{
				film_url: film_url,
			}
		);*/
	}
}

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class FilmPage {
	constructor(
		private navParams: NavParams,
		public navCtrl: NavController,
		public globals: Globals,
		public programProvider: ProgramProvider
	) {
		let film_url = this.navParams.get('film_url');
		console.log(film_url);
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
