import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { BrowserTab } from '@ionic-native/browser-tab';
import { StorageProvider } from '../../providers/storage';
import { HendelseProvider } from '../../providers/ukm/hendelse';

@Component({
	selector: 'page-hendelse',
	templateUrl: 'hendelse.html',
	providers: [BrowserTab]
})
export class HendelsePage {
    public hendelse = false;

	constructor(
        private navParams: NavParams,
        public navCtrl: NavController,
        private storageProvider: StorageProvider,
        private hendelseProvider: HendelseProvider
	) {
        let id = this.navParams.get('id');
        
        let self = this;        
        this.hendelseProvider.load( id ).then(
            (hendelse) => 
            {
                self.hendelse = hendelse;
            }
        );
    }
	
    /*
    visInnslag( id ) {
        let self = this;
        this.storageProvider.unit('APP').get('monstring').then( 
            ( monstring_id ) =>
            {
                let url = 'https://ukm.no/'+ monstring_id +'/pameldte/'+ id +'/';
                self.browserTab.isAvailable()
                .then(isAvailable => {
                    if (isAvailable) {
                        self.browserTab.openUrl( url );
                    } else {
                    // open URL with InAppBrowser instead or SafariViewController
                    console.log('bah');
                    alert('dooo something');
                    }
                });
            }
        );
    }
    */

}