import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/wordpress/categories';
import { PostProvider } from '../../providers/wordpress/post';
import { PostContentProvider } from '../../providers/wordpress';
import { SingleInfoPage } from './single';


/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  public info = null;
  public post = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private categoriesProvider: CategoriesProvider,
    private postContentProvider: PostContentProvider,
  ) {
    this.info = this.categoriesProvider.getCategory('informasjon');
  }

  visInfo( info_id ) {
    this.post = this.postContentProvider.get(info_id).then(data => {
    console.log(data);

    this.navCtrl.push(
			SingleInfoPage,
			{
				post: data
			}
		)
    })
  }
}