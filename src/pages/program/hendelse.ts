import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';


import { StreamingMedia } from '@ionic-native/streaming-media';
import { HendelseProvider } from '../../providers/ukm/hendelse';
import { InnslagProvider } from '../../providers/ukm/innslag';
import { StorageProvider } from '../../providers/storage';
import { InnslagDataProvider } from '../../providers/ukm/innslagdata';
import { MonstringProgramProvider } from '../../providers/ukm/monstringprogram';
import { MonstringProvider } from '../../providers/ukm/monstring';
import { InnslagDataCollectionProvider } from '../../providers/ukm/innslagdata.collection';
import { SingleInfoPage } from '../info/single';

@Component({
    selector: 'page-hendelse',
    templateUrl: 'hendelse.html'
})
export class HendelsePage {

    public hendelse = null;

    constructor(
        private navParams: NavParams,
        public navCtrl: NavController,
        private hendelseProvider: HendelseProvider,
        public innslagProvider: InnslagProvider,
        private storageProvider: StorageProvider
    ) {
        let id = this.navParams.get('id');

        let self = this;
        this.hendelseProvider.load(id).then(
            (hendelse) => {
                self.hendelse = hendelse;
            }
        );
    }


    visInnslag(id) {
        this.storageProvider.unit('APP').get('monstring').then(e => {
            this.navCtrl.push(
                InnslagPage,
                {
                    id
                }
            )
        });
    }
}

@Component({
    selector: 'page-innslag',
    templateUrl: 'innslag.html'
})
export class InnslagPage {
    private innslag_id: Number;
    public innslag = null;

    constructor(
        private navParams: NavParams,
        private monstringProvider: MonstringProvider,
        private navCtrl: NavController,
		private sm: StreamingMedia,
    ) {
        this.innslag_id = this.navParams.get('id');
    }

    ngOnInit() {
        let self = this;

        this.monstringProvider.getInnslagDataCollectionProvider().then(
            (innslagDataCollectionProvider: InnslagDataCollectionProvider) => {
                innslagDataCollectionProvider.get(self.innslag_id).then(
                    (data) => {
                        console.log(data);

                        self.innslag = data;

                    }
                )
            }
        );
    }

    spillVideo(url) {
		this.sm.playVideo(url);
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

    visArtikkel(item) {
        this.navCtrl.push(
            SingleInfoPage,
            {
                item: item
            }
        )
    }
}