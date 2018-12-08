import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectMonstringAwareProvider } from '../object/object_monstringaware';

export interface PostContent {
  id: number;
  content: string;
}

/**
 * PostProvider
 * Brukes for å hente ut enkeltposts fra API/storage/memory
 */
@Injectable()
export class PostContentProvider extends ObjectMonstringAwareProvider {
  
  constructor(
    monstring_id,
    monstring_url,
    http:HttpClient, 
    StorageProvider:StorageProvider,
    events: Events
  ) {
    let endpoint_url = monstring_url + 'wp-json/UKM/content/#id';

    super(
      'PostContent',
      endpoint_url,
      monstring_id,
      http,
      StorageProvider,
      events
    );
    
    this.setUrl( endpoint_url );
    console.log('How\'s it goin\'? I\'m PostContentProvider');
  }

  public validate( data:PostContent ) {
    return data;
  }
  public filterLoadData( data ) {
    return data;
  }
}
