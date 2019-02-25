import { Component } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { Innslag } from 'src/app/services/ukmnorge/api/innslag.models';
import { UKMTV } from 'src/app/services/ukmnorge/api/filmer.models';
import { NavController } from '@ionic/angular';
import { Monstring } from 'src/app/services/ukmnorge/api/monstring.models';
import { WpPost } from 'src/app/services/ukmnorge/wordpress/post.models';

@Component({
  selector: 'app-page-hjem',
  templateUrl: 'hjem.page.html',
  styleUrls: ['hjem.page.scss']
})
export class HjemPage {

	private loadedMonstring = false;

	public monstring = null;
	public nyheter = null;
	public alle_innslag = null;
	public filmer = null;

	constructor(
		private streamingMedia: StreamingMedia,
		private monstringService: MonstringService,
		private navCtrl: NavController
	) {		
	}

	ngOnInit() {
		let self = this;
		
		// Last inn nyheter
		this.monstringService.getPosts().getFrontlist().subscribe(
			(nyheter: WpPost[]) => {
				self.nyheter = nyheter;

				if( !self.loadedMonstring && (!Array.isArray( nyheter ) || ( Array.isArray(nyheter) && nyheter.length == 0 ))) {
					self.loadedMonstring = true;
					self._loadMonstringData();
				}
			}
		);

		// Last inn innslag
		this.monstringService.getInnslag().getMonstringInnslag().subscribe(
			(alle_innslag: Innslag[]) => {
				self.alle_innslag = alle_innslag;
			}
		);

		// Last inn siste filmer
		this.monstringService.getFilmer().getMonstringSiste().subscribe(
			(filmer: UKMTV[]) => {
				self.filmer = filmer;
			}
		);
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

	visNyhet( id ) {
		console.log('VIS NYHET'+ id );
		this.navCtrl.navigateForward(
			'app/app/hjem/post/'+ id
		);
	}

	visInnslag( id ) {
		console.log('VIS INNSLAG'+ id );
		this.navCtrl.navigateForward(
			'app/app/hjem/innslag/'+ id
		);
	}
}
