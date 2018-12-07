import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime, Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider } from '../object/object';

export interface Monstring {
  id: number;
  navn: string;
  sted: string;
  start: DateTime; 
  stop: DateTime;
  type: string;
}

@Injectable()
export class MonstringProvider extends ObjectProvider {
  private url = 'https://api.ukm.no/2.0/monstringer/#id';

  constructor( 
    _http:HttpClient, 
    StorageProvider:StorageProvider, 
    Events: Events 
  ) {
    super( 'Monstring', _http, StorageProvider, Events );
    console.log('Hello, I\'m MonstringProvider');
  }

  init() {}
  
  public validate( data:Monstring ) {
    return data;
  }

  public getUrl( id ) {
    return this.url.replace('#id', id);
  }

  public filterLoadData( data ) {
    return data;
  }
}
