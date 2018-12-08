import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { PostProvider, Post } from '../wordpress/post';
import { ObjectMonstringAwareCollectionProvider } from '../object/collection_monstringaware';

/**
 * CategoryProvider
 * Henter ut en oversikt over kategorien (collection av Post)
 */
@Injectable()
export class CategoryProvider extends ObjectMonstringAwareCollectionProvider {
  
  constructor(
    category_id,
    monstring_id,
    monstring_url,
    postProvider: PostProvider, 
    _http:HttpClient, 
    StorageProvider:StorageProvider
  ) {
    let endpoint_url = monstring_url + ('wp-json/UKM/#id').replace('#id', category_id);

    super(
      'Category|'+category_id,
      endpoint_url,
      monstring_id,
      postProvider,
      _http,
      StorageProvider
    );
    
    this.setUrl( endpoint_url );
    console.log('Peek-a-boo!, I\'m CategoryProvider for '+ category_id);
  }

  public validate( data:Post ) {
    return data;
  }
}
