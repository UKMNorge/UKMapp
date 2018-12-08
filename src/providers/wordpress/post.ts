import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectMonstringAwareProvider } from '../object/object_monstringaware';

export interface Post {
  id: number;
  title: string;
  lead: string;
  url: string; 
  image: string;
  contentpath: string;
}

/**
 * PostProvider
 * Brukes for å hente ut enkeltposts fra API/storage/memory
 */
@Injectable()
export class PostProvider extends ObjectMonstringAwareProvider {
  
  constructor(
    monstring_id,
    monstring_url,
    http:HttpClient, 
    StorageProvider:StorageProvider,
    events: Events
  ) {
    let endpoint_url = monstring_url + 'wp-json/UKM/post/#id';

    super(
      'Post',
      endpoint_url,
      monstring_id,
      http,
      StorageProvider,
      events
    );
    
    this.setUrl( endpoint_url );
    console.log('How\'s it goin\'? I\'m PostProvider');
  }

  public validate( data:Post ) {
    return data;
  }
  public filterLoadData( data ) {
    return data;
  }
}