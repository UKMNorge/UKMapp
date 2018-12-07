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
export class InnslagProvider extends ObjectProvider {
  private url = 'https://api.ukm.no/2.0/innslag/#id';

  constructor( 
    _http:HttpClient, 
    StorageProvider:StorageProvider, 
    Events: Events 
  ) {
    super( 'Innslag', _http, StorageProvider, Events );
    console.log('Morning! I\'m InnslagProvider');
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
