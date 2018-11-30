import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider, ObjectCollectionProvider } from './object';
import { Monstring, MonstringProvider } from './monstring';

@Injectable()
export class MonstringerProvider extends ObjectCollectionProvider {
  private url = 'https://api.ukm.no/2.0/monstringer/';

  constructor( monstringProvider: MonstringProvider, _http:HttpClient, StorageProvider:StorageProvider ) {
    super( 'Monstringer', monstringProvider, _http, StorageProvider );
    console.log('Hello, I\'m MonstringerProvider');
  }

  init() {}

  public validate( data:Monstring ) {
    return data;
  }

  public getUrl() {
    return this.url;
  }

  public set(id, data) {
  }
  
}
