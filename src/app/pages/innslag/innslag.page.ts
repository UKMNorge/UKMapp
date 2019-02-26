import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Innslag, InnslagDetaljer } from 'src/app/services/ukmnorge/api/innslag.models';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { NavController } from '@ionic/angular';
import { NetworkService } from 'src/app/services/ukmnorge/utils/network.service';

@Component({
	selector: 'app-page-innslag',
	templateUrl: 'innslag.page.html',
	styleUrls: ['innslag.page.scss']
})
export class InnslagPage {

	private id = null;
	private hendelse = null;

	public innslag = null;
	public detaljer = null;

	constructor(
		private monstringService: MonstringService,
		private activatedRoute: ActivatedRoute,
		private streamingMedia: StreamingMedia,
		private navCtrl: NavController,
		private router: Router,
		private networkService: NetworkService
	) {
		let self = this;
		this.activatedRoute.paramMap.subscribe(
			(queryParams: ParamMap) => {
				self.hendelse = queryParams.get('hendelse');
				self.id = queryParams.get('innslag');
			}
		);
	}

	ngOnInit() {
		let self = this;
		this.monstringService.getInnslag().get( this.id ).subscribe(
			(innslag: Innslag) => {
				self.innslag = innslag;
			}
		);
		this.monstringService.getInnslag().getDetaljer( this.id ).subscribe(
			(innslagDetaljer: InnslagDetaljer) => {
				self.detaljer = innslagDetaljer;
			}
		);
	}

	spillVideo(url) {
		let options: StreamingVideoOptions = {
//			successCallback: () => { console.log('Video played') },
//			errorCallback: (e) => { console.log('Error streaming') },
			orientation: 'landscape',
//			shouldAutoClose: true,
//			controls: false
		  };
		this.streamingMedia.playVideo(url, options);
	}

    showRest() {
        let dots = document.getElementById('followingdots');
        let rest = document.getElementById('restofdescription');
        if (dots.className.indexOf('hidden') == -1) {
            dots.className = dots.className.replace('visible', '').replace('  ', '') + ' hidden'
            rest.className = rest.className.replace('hidden', '').replace('  ', '') + ' visible'
        } else if (dots.className.indexOf('visible') == -1) {
            dots.className = dots.className.replace('hidden', '').replace('  ', '') + ' visible'
            rest.className = rest.className.replace('visible', '').replace('  ', '') + ' hidden'
        }
    }

    visArtikkel(id) {
		this.navCtrl.navigateForward( this.router.url + '/post/'+ id);
    }
}