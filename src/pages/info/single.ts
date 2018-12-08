import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Post, PostContentProvider } from '../../providers/wordpress';


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
        public postContentProvider: PostContentProvider,
	) {
        let item = this.navParams.get('item');
        //console.error('Logging ITEM from navParams: ', item);
        this.title = item.title;
        this.postContentProvider.get(item.id).then(
            (content:Post) => 
            {
                this.post = content;
                this.loading = false;
            }
        );
    }
}