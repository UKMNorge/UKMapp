import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/wordpress/categories';
import { PostProvider } from '../../providers/wordpress/post';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  public info = null;
  public post = null;

  constructor(
    public categoriesProvider: CategoriesProvider,
    public postProvider: PostProvider
  ) {
    this.info = this.categoriesProvider.getCategory('informasjon');
  }

  visInfo( info ) {
    this.post = this.postProvider.get(info.id);
    console.log(this.post);
    
	}

}
