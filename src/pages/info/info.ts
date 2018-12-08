import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SingleInfoPage } from './single';
import { WordpressProvider } from '../../providers/wordpress';


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
    private wordpressProvider: WordpressProvider
  ) {
    this.info = this.wordpressProvider.getCategoryProvider('informasjon');
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