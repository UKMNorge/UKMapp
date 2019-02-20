import { Component, Sanitizer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PostContent, WordpressProvider } from '../../providers/wordpress';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'page-single-info',
    templateUrl: 'single.html',
})
export class SingleInfoPage {

    public loading = true;
    public post = null;
    public title = null;
    public base_url = null;

    constructor(
        private navParams: NavParams,
        public navCtrl: NavController,
        public wordpressProvider: WordpressProvider,
        private iab: InAppBrowser,
        private san: DomSanitizer
    ) {
        let item = this.navParams.get('item');
        this.title = item.title;

        let self = this;

        self.wordpressProvider.getPostContentProvider().get(item.id).then(
            (content: PostContent) => {
                console.log('SINGLE.ts got postcontent');
                console.log(content);
                self.post = content;
                self.loading = false;
                self.base_url = san.bypassSecurityTrustResourceUrl(self.wordpressProvider.getMonstringUrl());
            }
        );
    }
    
    handleClick(event) {
        if (event.target.tagName == "A") {
            console.log(event.target.href);

            if (event.target.href.substring(0, 5) != 'https' || event.target.href.substring(0, 4) != 'http') {
                console.log("Fant uegnet url");

                this.iab.create(event.target.href, "_system");
                return false;
            } else {
                this.iab.create(event.target.href, "_system");
                return false;
            }
        }
    }
}