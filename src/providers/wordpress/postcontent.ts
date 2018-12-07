import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime, Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider } from '../object/object';
import { Post } from './post';

export interface PostContent {
  id: number;
  content: string;
}

@Injectable()
export class PostContentProvider extends ObjectProvider {
  private url = 'https://ukm.no/testfylke/wp-json/UKM/content/#id';

  constructor( 
    _http:HttpClient, 
    StorageProvider:StorageProvider, 
    Events: Events 
  ) {
    super( 'PostContent', _http, StorageProvider, Events );
    console.log('I\'m Batman! Sorry, no, I\'m PostContentProvider');
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
