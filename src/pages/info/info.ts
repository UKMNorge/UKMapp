import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/wordpress/categories';
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
    private categoriesProvider: CategoriesProvider
  ) {
    this.info = this.categoriesProvider.getCategory('informasjon');
  }

  visInfo( item ) {
    this.navCtrl.push(
			SingleInfoPage,
			{
        item: item
			}
		)
  }
}