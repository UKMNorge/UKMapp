import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { ObjectCollectionProvider } from '../object/collection';
import { PostProvider, Post } from '../wordpress/post';

@Injectable()
export class CategoryProvider extends ObjectCollectionProvider {
  private url = 'https://ukm.no/testfylke/wp-json/UKM/#id';

  constructor(
    category_id,
    postProvider: PostProvider, 
    _http:HttpClient, 
    StorageProvider:StorageProvider
  ) {
    super( 'Posts|'+category_id, postProvider, _http, StorageProvider );
    console.log('Peek-a-boo!, I\'m CategoryProvider for '+ category_id);
    this.url = this.url.replace('#id', category_id );
  }

  public validate( data:Post ) {
    return data;
  }

  public getUrl() {
    return this.url;
  }

  public set(id, data) {
  }

}
