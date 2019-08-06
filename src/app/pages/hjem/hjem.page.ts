import { Component } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { NavController } from '@ionic/angular';
import { Monstring } from 'src/app/services/ukmnorge/api/monstring.models';
import { WpPost } from 'src/app/services/ukmnorge/wordpress/post.models';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';

@Component({
	selector: 'app-page-hjem',
	templateUrl: 'hjem.page.html',
	styleUrls: ['hjem.page.scss']
})
export class HjemPage {

	private loadedMonstring = false;

	public monstring = null;
	public nyheter = null;

	public view = 'pre';
	public nyhetsbrev;

	constructor(
		private streamingMedia: StreamingMedia,
		private monstringService: MonstringService,
		private navCtrl: NavController,
		private activeService: ActiveService
	) {
	}

	getUser() {
		return this.activeService.getUser();
	}
	ngOnInit() {
		let self = this;
		this._loadMonstringData();

		// Last inn nyheter
		this.monstringService.getPosts().getFrontlist().subscribe(
			(nyheter: WpPost[]) => {
				self.nyheter = nyheter;

			}
		);
	}

	public getDager() {
		return this.monstring.dager;
	}
	private _loadMonstringData() {
		this.monstringService.getInfo().subscribe(
			(monstring: Monstring) => {
				this.monstring = monstring;
			}
		);
	}

	spillVideo(url) {
		let options: StreamingVideoOptions = {
			orientation: 'landscape',
		};
		this.streamingMedia.playVideo(url, options);
	}

	visNyhet(id) {
		//console.log('VIS NYHET'+ id );
		this.navCtrl.navigateForward(
			'app/app/hjem/post/' + id
		);
	}

	visDag( dag ) {
		console.log( dag );
		this.view = dag;
		this.nyhetsbrev = dag;
	}

	visPre() {
		this.view = 'pre';
	}
}