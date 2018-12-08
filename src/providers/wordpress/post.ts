import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider } from '../object/object';

export interface Post {
  id: number;
  title: string;
  lead: string;
  url: string; 
  image: string;
  contentpath: string;
}

@Injectable()
export class PostProvider extends ObjectProvider {
  private url = 'https://ukm.no/testfylke/wp-json/UKM/post/#id';

  constructor( 
    _http:HttpClient, 
    StorageProvider:StorageProvider, 
    Events: Events 
  ) {
    super( 'Post', _http, StorageProvider, Events );
    console.log('How\'s it goin\'? I\'m PostProvider');
  }

  init() {}
  
  public validate( data:Post ) {
    return data;
  }

  public getUrl( id ) {
    return this.url.replace('#id', id);
  }

  public filterLoadData( data ) {
    return data;
  }
}
