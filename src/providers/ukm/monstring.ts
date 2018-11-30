import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider } from './object';

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
  private url = 'https://api.ukm.no/2.0/monstringer/';

  constructor( _http:HttpClient, StorageProvider:StorageProvider ) {
    super( 'Monstring', _http, StorageProvider );
    console.log('Hello, I\'m MonstringProvider');
  }

  init() {}
  
  public validate( data:Monstring ) {
    return data;
  }

  public getUrl() {
    return this.url;
  }
}
