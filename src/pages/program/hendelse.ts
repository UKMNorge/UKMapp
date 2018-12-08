import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';


import { StreamingMedia } from '@ionic-native/streaming-media';
import { HendelseProvider } from '../../providers/ukm/hendelse';
import { InnslagProvider } from '../../providers/ukm/innslag';
import { StorageProvider } from '../../providers/storage';


@Component({
	selector: 'page-hendelse',
	templateUrl: 'hendelse.html',
})
export class HendelsePage {

    public hendelse = null;

	constructor(
        private navParams: NavParams,
        public navCtrl: NavController,
        private hendelseProvider: HendelseProvider,
        public innslagProvider: InnslagProvider,
        private storageProvider: StorageProvider
        //private browserTab: BrowserTab
	) {
        let id = this.navParams.get('id');
        
        let self = this;        
        this.hendelseProvider.load( id ).then(
            (hendelse) => 
            {
                self.hendelse = hendelse;
                console.error(hendelse);
                
            }
        );
    }
	
    
    visInnslag( id ) {
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
export class InnslagPage {

    public innslag = null;
    
    constructor(
        private navParams: NavParams,
        private innslagProvider: InnslagProvider,
        private streamingMedia: StreamingMedia,
    ) {
        let innslag_id = this.navParams.get('id');
        console.error('Logging innslag_id', innslag_id);

        this.innslagProvider.get(innslag_id).then(data => {
            this.innslag = data;
            console.error('Logging data from innslagPage', data);
        })
    }
}