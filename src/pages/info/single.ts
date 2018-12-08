import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PostContent, WordpressProvider } from '../../providers/wordpress';

@Component({
	selector: 'page-single-info',
	templateUrl: 'single.html',
})
export class SingleInfoPage {

    public loading = true;
    public post = null;
    public title = null;

	constructor(
        private navParams: NavParams,
        public navCtrl: NavController,
        public wordpressProvider: WordpressProvider
	) {
        let item = this.navParams.get('item');
        this.title = item.title;
        
        let self = this;
        self.wordpressProvider.getPostContentProvider().get(item.id).then(
            (content:PostContent) => 
            {
                console.log('SINGLE.ts got postcontent');
                console.log( content );
                self.post = content;
                self.loading = false;
            }
        );
    }
}