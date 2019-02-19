import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Calendar } from '@ionic-native/calendar';
import { StorageProvider } from '../../providers/storage';
import { MonstringProvider } from '../../providers/ukm/monstring';
import { WordpressProvider } from '../../providers/wordpress';
import { SingleInfoPage } from '../info/single';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { InnslagCollectionProvider } from '../../providers/ukm/innslag.collection';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})

export class HomePage {
	public monstring = null;
	public nyheter = null;
	public innslag = null;
	public singlenyhet = null;
	public film = {
		fil: {
			mobil: 'https://video.ukm.no/ukmno/videos/2019/5493/innslag/2019_5493_innslag_157165_cron_17643_mobile.mp4'
		},
		bilde: {
			url: 'https://video.ukm.no/ukmno/videos/2019/5493/innslag/2019_5493_innslag_157165_cron_17643.jpg'
		}
	}

	constructor(
		public navCtrl: NavController,
		private storageProvider: StorageProvider,
		private monstringProvider: MonstringProvider,
		public wordpressProvider: WordpressProvider,
		private calendar: Calendar,
		private sm: StreamingMedia,
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
		this.nyheter = this.wordpressProvider.getCategoryProvider('nyheter');

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

	addToCalendar() {
		this.calendar.createEventInteractively(this.monstring.navn, this.monstring.sted, "UKM://info", new Date(this.monstring.start), new Date(this.monstring.stop)).then(
			(msg) => { console.log(msg); },
			(err) => { console.log(err); },
		);
	}

	visNyhet(item) {
		this.navCtrl.push(
			SingleInfoPage,
			{
				item: item
			}
		)
	}

	spillVideo(url) {
		this.sm.playVideo(url);
	}



	ngOnInit() {
		let self = this;
		console.warn('HELOOOOOOOOO');
		this.monstringProvider.getInnslagCollectionProvider().then(
			(innslagCollectionProvider: InnslagCollectionProvider) => {
				console.warn('HELOOOOOOOOO TADA');
				self.innslag = innslagCollectionProvider;
				self.innslag.load();
				console.log( innslagCollectionProvider );
			}
		);
	}
}
