import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PostContentProvider, PostProvider } from '../../providers/wordpress';


@Component({
	selector: 'page-single-info',
	templateUrl: 'single.html',
})
export class SingleInfoPage {


    public post = null;
    public title = null;

	constructor(
        private navParams: NavParams,
        public navCtrl: NavController,
        public postProvider: PostProvider,
	) {
        this.post = this.navParams.get('post');
        this.postProvider.get(this.post.id).then(data => {
            this.title = data.title;
        });
    }
}