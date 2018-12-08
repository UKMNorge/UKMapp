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
    category_id:string|number,
    monstring_id,
    monstring_url,
    postProvider: PostProvider, 
    _http:HttpClient, 
    StorageProvider:StorageProvider
  ) {
    let endpoint_url = monstring_url;
    
    // Hvis numerisk kategori, hent fra kategori-endpoint
    if( typeof(category_id) == 'number' ) {
      endpoint_url += ('wp-json/UKM/kategori/#id').replace('#id', category_id.toString() );
    } 
    // Hvis tekst-id, er dette custom-endpoint
    else {
      endpoint_url += ('wp-json/UKM/#id').replace('#id', category_id);
    }
    category_id.toString();

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
